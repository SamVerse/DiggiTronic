"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCube() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Use container dimensions, fallback to 300
    const W = mount.clientWidth || 300;
    const H = mount.clientHeight || 300;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.domElement.style.width = `${W}px`;
    renderer.domElement.style.height = `${H}px`;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, W / H, 0.1, 100);
    // Positioned to give an isometric 3/4 view of the sequence
    camera.position.set(5.5, 4.0, 7.5);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    const cubeSize = 2.0;
    const splitGroup = new THREE.Group();
    group.add(splitGroup);

    // Create a smooth canvas gradient for the top block
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    if (context) {
      const gradient = context.createLinearGradient(0, 0, 0, 256);
      // Brand orange gradient — warm bright top fading to deeper burnt orange
      gradient.addColorStop(0, "#FF6B1A");
      gradient.addColorStop(1, "#CC3300");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 256);
    }
    const gradientTex = new THREE.CanvasTexture(canvas);
    gradientTex.colorSpace = THREE.SRGBColorSpace;

    const topHeight = 1.5;
    const topGeo = new THREE.BoxGeometry(cubeSize, topHeight, cubeSize);
    const topMat = new THREE.MeshPhysicalMaterial({
      map: gradientTex,
      color: 0xffffff, // White base so the texture shines fully
      metalness: 0.1,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const topMesh = new THREE.Mesh(topGeo, topMat);
    topMesh.position.y = (cubeSize / 2) - (topHeight / 2);
    splitGroup.add(topMesh);

    // BOTTOM STRIP (Silver / Light Grey)
    const botHeight = 0.5;
    const botGeo = new THREE.BoxGeometry(cubeSize, botHeight, cubeSize);
    const botMat = new THREE.MeshPhysicalMaterial({
      color: 0xe8e8ea,
      emissive: 0x999999,
      emissiveIntensity: 0.3,
      metalness: 0.4,
      roughness: 0.35,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
    });
    const botMesh = new THREE.Mesh(botGeo, botMat);
    botMesh.position.y = -(cubeSize / 2) + (botHeight / 2);
    splitGroup.add(botMesh);


    const passingLight = new THREE.PointLight(0xffffff, 0, 15);
    // It will move along X axis mimicking the orb to illuminate the cube
    group.add(passingLight);


    const topLight = new THREE.DirectionalLight(0xffffff, 3.0);
    topLight.position.set(0, 8, 2);
    group.add(topLight);

    const fillLight = new THREE.DirectionalLight(0xffeedd, 1.5);
    fillLight.position.set(-2, 0, 5);
    group.add(fillLight);

    // Bottom fill light — illuminates the silver strip properly
    const bottomLight = new THREE.DirectionalLight(0xffffff, 2.0);
    bottomLight.position.set(0, -4, 3);
    group.add(bottomLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));


    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);


    let t = 0;
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      // Synchronize time roughly with HeroWireframe
      t += 0.005;

      // `floatSpeed`: How fast it bobs up and down (e.g., 3 is slow, 6 is fast)
      const floatSpeed = 3.5;
      // `floatAmount`: How far it travels up and down (e.g., 0.1 is subtle, 0.4 is intense)
      const floatAmount = 0.3;

      splitGroup.position.y = Math.sin(t * floatSpeed) * floatAmount;

      // Smooth mouse tilt (how quickly it snaps to the mouse)
      // Change `0.1` to a higher number (e.g. 0.5) for snapper movement
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      // `rotationIntensity`: How fast it rotates relatively to the mouse distance 
      const rotationIntensity = 1.5;

      // `maxTilt`: Set a limit (in radians) to how far the cube can actually flip.
      // E.g., `0.5` restricts it to gentle wobbles. `Math.PI` lets it flip entirely around.
      const maxTilt = 1.5;

      let nextRotX = currentY * rotationIntensity;
      let nextRotY = currentX * rotationIntensity;

      // Clamp the rotation so it doesn't flip entirely upside down unless you want it to
      group.rotation.x = Math.max(-maxTilt, Math.min(maxTilt, nextRotX));
      group.rotation.y = Math.max(-maxTilt, Math.min(maxTilt, nextRotY));

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);

      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full pointer-events-none scale-125" />
    </div>
  );
}
