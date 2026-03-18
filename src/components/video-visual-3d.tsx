"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function VideoVisual3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;

    /* ── Renderer ──────────────────────────────────────────────────── */
    const W = container.clientWidth || 560;
    const H = container.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);
    // Force canvas to fill container width so no background gaps show
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.display = "block";

    /* ── Scene + Camera ────────────────────────────────────────────── */
    const scene = new THREE.Scene();
    const FOV = 50;
    const camera = new THREE.PerspectiveCamera(FOV, W / H, 0.01, 200);
    // camera position set dynamically after model loads

    /* ── Lighting ──────────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const key = new THREE.DirectionalLight(0xffeedd, 2.2);
    key.position.set(-3, 4, 6);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xd8eaff, 0.7);
    fill.position.set(5, 2, 4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffb060, 0.5);
    rim.position.set(0, -4, -3);
    scene.add(rim);

    const top = new THREE.DirectionalLight(0xfff5e0, 0.5);
    top.position.set(0, 6, 5);
    scene.add(top);

    /* ── Scene group — receives mouse parallax ──────────────────────── */
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    /* ── Mouse parallax state ───────────────────────────────────────── */
    const mouse = { x: 0, y: 0 };
    const targetRot = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── Hover point light ─────────────────────────────────────────── */
    let isHovered = false;
    const pointLight = new THREE.PointLight(0xff8030, 1.5, 20);
    sceneGroup.add(pointLight);

    const onMouseEnter = () => { isHovered = true; };
    const onMouseLeave = () => { isHovered = false; };
    renderer.domElement.addEventListener("mouseenter", onMouseEnter);
    renderer.domElement.addEventListener("mouseleave", onMouseLeave);

    /* ── Load GLB Camera Model ─────────────────────────────────────── */
    const loader = new GLTFLoader();
    loader.load(
      "/3d-models/dae_-_bilora_bella_46_camera_-_game_ready_asset.glb",
      (gltf) => {
        const model = gltf.scene;

        // Add to scene first so world matrices are computed
        sceneGroup.add(model);
        model.updateMatrixWorld(true);

        // Get the real bounding box from scene
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        // Log real dims so we can tune offsets
        console.log("[GLB] size:", size, "maxDim:", maxDim, "center:", center);

        // Center model at world origin
        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;

        // Scale to target largest dimension = 4.5 world units
        const targetSize = 1;
        model.scale.setScalar(targetSize / maxDim);

        // Auto-fit camera: place it so model fills ~75% of screen height
        // visible_height = 2 * dist * tan(fov/2)  →  dist = (targetSize/2) / tan(fov/2) * padding
        const fovRad = (FOV * Math.PI) / 180;
        const padding = 1.35; // 35% breathing room
        const dist = (targetSize / 2) / Math.tan(fovRad / 2) * padding;
        camera.position.set(0, 0, dist);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();

        // Point light next to camera
        pointLight.position.set(1.5, 1.5, dist * 0.8);

        // Fine-tune offsets proportional to targetSize so they scale correctly
        model.position.y += targetSize * 0.08;  // slight upward nudge to center in frame
      },
      undefined,
      (err) => console.error("GLTFLoader error:", err)
    );

    /* ── Film grain ────────────────────────────────────────────────── */
    const baseVS = /* glsl */`
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
    `;
    const grainFS = /* glsl */`
      varying vec2 vUv; uniform float time;
      float rand(vec2 co){ return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453); }
      void main(){
        float g = rand(vUv*2000.0 + fract(time*0.08)*123.0);
        gl_FragColor = vec4(g,g,g,g*0.03);
      }
    `;
    const grainMat = new THREE.ShaderMaterial({
      vertexShader: baseVS, fragmentShader: grainFS,
      uniforms: { time: { value: 0 } },
      transparent: true, depthWrite: false,
    });
    const grainMesh = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), grainMat);
    grainMesh.position.z = -5;
    scene.add(grainMesh);

    /* ── Animation loop ────────────────────────────────────────────── */
    const clock = new THREE.Clock();
    let elapsed = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      elapsed += delta;
      grainMat.uniforms.time.value = elapsed;

      // Continuous floating
      sceneGroup.position.y = Math.sin(elapsed * 0.7) * 0.05;
      sceneGroup.rotation.z = Math.sin(elapsed * 0.45) * 0.008;

      // Gentle mouse parallax — subtle tilt, not orbit
      targetRot.y += (mouse.x * 0.18 - targetRot.y) * 0.04;
      targetRot.x += (mouse.y * 0.10 - targetRot.x) * 0.04;
      sceneGroup.rotation.y = targetRot.y;
      sceneGroup.rotation.x = targetRot.x;

      const targetIntensity = isHovered ? 5 : 1.5;
      pointLight.intensity += (targetIntensity - pointLight.intensity) * 0.08;
      renderer.render(scene, camera);
    }
    animate();

    /* ── Resize ────────────────────────────────────────────────────── */
    const resizeObserver = new ResizeObserver(() => {
      const nW = container.clientWidth || 560;
      const nH = container.clientHeight || 500;
      renderer.setSize(nW, nH);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);

    /* ── Cleanup ───────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseenter", onMouseEnter);
      renderer.domElement.removeEventListener("mouseleave", onMouseLeave);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", minHeight: 500, position: "relative" }}
    />
  );
}
