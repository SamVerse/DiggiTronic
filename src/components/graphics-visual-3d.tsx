"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ── Canvas texture helpers ──────────────────────────────────────── */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function createBrandCardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512; canvas.height = 320;
  const ctx = canvas.getContext("2d")!;

  /* Background */
  const grad = ctx.createLinearGradient(0, 0, 512, 320);
  grad.addColorStop(0, "rgba(6,24,42,0.97)");
  grad.addColorStop(1, "rgba(2,11,22,0.97)");
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, 512, 320, 16);
  ctx.fill();

  /* Outer border */
  ctx.strokeStyle = "rgba(235,115,0,0.45)";
  ctx.lineWidth = 1.5;
  roundRect(ctx, 3, 3, 506, 314, 14);
  ctx.stroke();

  /* Corner bracket accents */
  ctx.strokeStyle = "rgba(235,115,0,0.22)";
  ctx.lineWidth = 1;
  const bl = 22;
  ([
    [-1, -1, 20,  20],
    [ 1, -1, 492, 20],
    [-1,  1, 20,  300],
    [ 1,  1, 492, 300],
  ] as [number, number, number, number][]).forEach(([dx, dy, bx, by]) => {
    ctx.beginPath();
    ctx.moveTo(bx + dx * bl, by); ctx.lineTo(bx, by); ctx.lineTo(bx, by + dy * bl);
    ctx.stroke();
  });

  /* "Ag" headline */
  ctx.shadowColor = "rgba(235,115,0,0.45)";
  ctx.shadowBlur = 20;
  ctx.fillStyle = "#EB7300";
  ctx.font = "bold 106px Georgia, 'Times New Roman', serif";
  ctx.fillText("Ag", 34, 200);
  ctx.shadowBlur = 0;

  /* Separator line */
  ctx.strokeStyle = "rgba(235,115,0,0.38)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(34, 218); ctx.lineTo(200, 218);
  ctx.stroke();

  /* "BRAND IDENTITY" label */
  ctx.fillStyle = "rgba(255,255,255,0.50)";
  ctx.font = "500 12.5px 'Courier New', monospace";
  ctx.fillText("BRAND IDENTITY", 34, 244);

  /* Colour swatches */
  const swatches = ["#EB7300", "#FF9A00", "#1A3A5C", "rgba(255,255,255,0.82)"];
  swatches.forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(292 + i * 36, 166, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  /* Hex value label */
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.font = "10px 'Courier New', monospace";
  ctx.fillText("#EB7300", 292, 142);

  return new THREE.CanvasTexture(canvas);
}

function createTypCardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256; canvas.height = 160;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, 256, 160);
  grad.addColorStop(0, "rgba(5,16,28,0.95)");
  grad.addColorStop(1, "rgba(2,10,20,0.95)");
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, 256, 160, 12);
  ctx.fill();

  ctx.strokeStyle = "rgba(235,115,0,0.38)";
  ctx.lineWidth = 1.5;
  roundRect(ctx, 2, 2, 252, 156, 11);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "bold 60px Georgia, 'Times New Roman', serif";
  ctx.fillText("Aa", 26, 100);

  ctx.strokeStyle = "rgba(235,115,0,0.32)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(26, 115); ctx.lineTo(128, 115);
  ctx.stroke();

  ctx.fillStyle = "rgba(235,115,0,0.72)";
  ctx.font = "500 10.5px 'Courier New', monospace";
  ctx.fillText("TYPE SYSTEM", 26, 134);

  return new THREE.CanvasTexture(canvas);
}

function makeHexShape(r: number): THREE.Shape {
  const s = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const x = r * Math.cos(a), y = r * Math.sin(a);
    i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
  }
  s.closePath();
  return s;
}

function makeTriShape(side: number): THREE.Shape {
  const h = (side * Math.sqrt(3)) / 2;
  const s = new THREE.Shape();
  s.moveTo(0, h * 0.667);
  s.lineTo(side / 2, -h * 0.333);
  s.lineTo(-side / 2, -h * 0.333);
  s.closePath();
  return s;
}

function makeCornerLines(): THREE.LineSegments {
  const pts: number[] = [];
  const arm = 0.38, z = 0.07;
  /* Card corners are ±1.1 on X, ±0.725 on Y */
  ([
    [-1.1,  0.725,  1,  1],
    [ 1.1,  0.725, -1,  1],
    [-1.1, -0.725,  1, -1],
    [ 1.1, -0.725, -1, -1],
  ] as [number, number, number, number][]).forEach(([cx, cy, ix, iy]) => {
    pts.push(cx + ix * arm, cy, z,  cx, cy, z);
    pts.push(cx, cy, z,  cx, cy + iy * arm, z);
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return new THREE.LineSegments(
    geo,
    new THREE.LineBasicMaterial({ color: 0xEB7300, transparent: true, opacity: 0.2 })
  );
}

/* ══ Component ══════════════════════════════════════════════════════ */
export function GraphicsVisual3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let rafId = 0;

    /* ── Renderer ──────────────────────────────────────────────── */
    const W = container.clientWidth || 560;
    const H = container.clientHeight || 620;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.display = "block";

    /* ── Scene + Camera ────────────────────────────────────────── */
    const scene = new THREE.Scene();
    // Wider FOV gives more breathing room, especially on narrow/mobile screens
    const camera = new THREE.PerspectiveCamera(62, W / H, 0.01, 100);
    camera.position.set(0, 0, 5);

    /* ── Lights ────────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const key = new THREE.DirectionalLight(0xfff4e0, 2.0);
    key.position.set(-2, 4, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xd0e8ff, 0.6);
    fill.position.set(5, 1, 3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffb060, 0.45);
    rim.position.set(0, -3, -3);
    scene.add(rim);

    const accentLight = new THREE.PointLight(0xEB7300, 1.2, 12);
    scene.add(accentLight);

    /* ── Groups ────────────────────────────────────────────────── */
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);
    const floatGroup = new THREE.Group();
    sceneGroup.add(floatGroup);

    /* ── Responsive scale — shrink on narrow screens ───────────── */
    sceneGroup.scale.setScalar(Math.min(1.0, W / 480));

    /* ── Mouse parallax ─────────────────────────────────────────── */
    const mouse = { x: 0, y: 0 };
    const targetRot = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ══ OBJECTS ════════════════════════════════════════════════ */

    /* 1 — Brand Identity Card */
    const cardTex = createBrandCardTexture();
    const darkSide = (c: number) =>
      new THREE.MeshStandardMaterial({ color: c, roughness: 0.35, metalness: 0.06, transparent: true, opacity: 0.88 });
    const cardMats = [
      darkSide(0x061c2e), darkSide(0x061c2e),
      darkSide(0x040e1a), darkSide(0x040e1a),
      new THREE.MeshStandardMaterial({ map: cardTex, roughness: 0.12, metalness: 0.04 }), // front (+Z)
      darkSide(0x030c18),
    ];
    const brandCard = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.45, 0.06), cardMats);
    brandCard.position.set(0.1, 0, 0);
    brandCard.rotation.set(0.06, -0.12, 0);
    floatGroup.add(brandCard);

    /* Corner construction lines — move with brand card */
    const cLines = makeCornerLines();
    cLines.position.copy(brandCard.position);
    cLines.rotation.copy(brandCard.rotation);
    floatGroup.add(cLines);

    /* 2 — Gradient Sphere (orbiting) */
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 48, 48),
      new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: /* glsl */`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }`,
        fragmentShader: /* glsl */`
          varying vec3 vNormal;
          void main() {
            float f = pow(1.0 - abs(dot(vNormal, vec3(0.0,0.0,1.0))), 1.8);
            vec3 core = vec3(0.92, 0.45, 0.0);
            vec3 edge = vec3(0.08, 0.04, 0.38);
            vec3 col  = mix(core, edge, f);
            float glow = pow(f, 3.0) * 0.55;
            gl_FragColor = vec4(col + glow, 0.92);
          }`,
        transparent: true,
      })
    );
    floatGroup.add(sphere);

    /* 3 — Extruded Hexagon (orbiting, opposite phase) */
    const hexGeo = new THREE.ExtrudeGeometry(makeHexShape(0.3), {
      depth: 0.08, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2,
    });
    hexGeo.center();
    const hexMesh = new THREE.Mesh(
      hexGeo,
      new THREE.MeshStandardMaterial({ color: 0xEB7300, metalness: 0.55, roughness: 0.28 })
    );
    floatGroup.add(hexMesh);

    /* 4 — Wireframe Cube (tilted orbit) */
    const cubeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.38, 0.38),
      new THREE.MeshStandardMaterial({ color: 0x7090ff, wireframe: true })
    );
    floatGroup.add(cubeMesh);

    /* 5 — Typography Card (upper-right) */
    const typTex = createTypCardTexture();
    const typCard = new THREE.Mesh(
      new THREE.PlaneGeometry(0.88, 0.55),
      new THREE.MeshStandardMaterial({ map: typTex, roughness: 0.15, metalness: 0.04, transparent: true, opacity: 0.95 })
    );
    typCard.position.set(1.8, 1.2, -0.4);
    typCard.rotation.set(0, -0.28, 0.06);
    floatGroup.add(typCard);

    /* 6 — Colour Palette (upper-left) */
    const paletteGroup = new THREE.Group();
    const swatchCols = [0xEB7300, 0xFF9A00, 0x1A3A5C, 0x0A2540, 0xe8e8ff];
    const swatchAlpha = [1, 1, 1, 1, 0.6];
    swatchCols.forEach((col, i) => {
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(0.13, 32),
        new THREE.MeshStandardMaterial({ color: col, metalness: 0.22, roughness: 0.55, transparent: true, opacity: swatchAlpha[i] })
      );
      disc.position.x = i * 0.34;
      paletteGroup.add(disc);
    });
    paletteGroup.position.set(-2.2, 1.55, 0.2);
    paletteGroup.rotation.set(0.22, 0.1, -0.1);
    floatGroup.add(paletteGroup);

    /* 7 — Bezier Tube (lower-left) */
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.55, -0.35,  0.00),
      new THREE.Vector3(-0.15,  0.30,  0.15),
      new THREE.Vector3( 0.25, -0.15, -0.10),
      new THREE.Vector3( 0.60,  0.22,  0.00),
    ]);
    const bezierGroup = new THREE.Group();
    bezierGroup.add(new THREE.Mesh(
      new THREE.TubeGeometry(curve, 40, 0.018, 6, false),
      new THREE.MeshStandardMaterial({ color: 0xEB7300, metalness: 0.65, roughness: 0.2 })
    ));
    const dotMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.2, roughness: 0.5 });
    curve.points.forEach((pt) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), dotMat);
      dot.position.copy(pt);
      bezierGroup.add(dot);
    });
    bezierGroup.position.set(-1.8, -1.35, 0.25);
    bezierGroup.rotation.z = 0.22;
    floatGroup.add(bezierGroup);

    /* 8 — Triangle (lower-right) */
    const triGeo = new THREE.ExtrudeGeometry(makeTriShape(0.24), { depth: 0.05, bevelEnabled: false });
    triGeo.center();
    const triMesh = new THREE.Mesh(
      triGeo,
      new THREE.MeshStandardMaterial({ color: 0xFF9A00, metalness: 0.3, roughness: 0.55 })
    );
    triMesh.position.set(2.05, -1.45, 0.3);
    triMesh.rotation.x = 0.2;
    floatGroup.add(triMesh);

    /* 9 — Torus Ring (mid-left) */
    const ringMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.024, 8, 44),
      new THREE.MeshStandardMaterial({ color: 0xaabbff, metalness: 0.4, roughness: 0.4, transparent: true, opacity: 0.75 })
    );
    ringMesh.position.set(-0.9, -2.0, 0.5);
    floatGroup.add(ringMesh);

    /* ── Animation loop ──────────────────────────────────────────── */
    const clock = new THREE.Clock();
    let elapsed = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      elapsed += delta;

      /* Float group bob + slow rock */
      floatGroup.position.y = Math.sin(elapsed * 0.65) * 0.06;
      floatGroup.rotation.z = Math.sin(elapsed * 0.42) * 0.007;

      /* Brand card sway */
      brandCard.rotation.y = -0.12 + Math.sin(elapsed * 0.38) * 0.08;
      brandCard.rotation.x = 0.06 + Math.sin(elapsed * 0.25) * 0.02;
      cLines.rotation.y = brandCard.rotation.y;
      cLines.rotation.x = brandCard.rotation.x;

      /* Sphere XZ orbit */
      sphere.position.x = 2.1 * Math.cos(elapsed * 0.22);
      sphere.position.z = 2.1 * Math.sin(elapsed * 0.22) - 0.3;
      sphere.rotation.y += 0.005;
      sphere.rotation.z += 0.003;

      /* Hexagon XZ orbit — opposite phase */
      hexMesh.position.x = 1.9 * Math.cos(elapsed * 0.18 + Math.PI);
      hexMesh.position.z = 1.9 * Math.sin(elapsed * 0.18 + Math.PI);
      hexMesh.rotation.x += 0.006;
      hexMesh.rotation.y += 0.004;

      /* Cube tilted-plane orbit */
      const ca = elapsed * 0.28 + Math.PI / 3;
      const tilt = Math.sin(0.6);
      cubeMesh.position.x = 1.7 * Math.cos(ca);
      cubeMesh.position.y = 1.7 * Math.sin(ca) * tilt;
      cubeMesh.position.z = 1.7 * Math.sin(ca);
      cubeMesh.rotation.x += 0.007;
      cubeMesh.rotation.y += 0.007;
      cubeMesh.rotation.z += 0.004;

      /* Independent element bobs */
      typCard.position.y    = 1.20 + Math.sin(elapsed * 0.55 + 1.2) * 0.08;
      typCard.position.x    = 1.80 + Math.sin(elapsed * 0.32 + 0.5) * 0.04;
      paletteGroup.position.y = 1.55 + Math.sin(elapsed * 0.48 + 0.6) * 0.07;
      bezierGroup.rotation.z  = 0.22 + Math.sin(elapsed * 0.35) * 0.04;
      triMesh.position.y    = -1.45 + Math.sin(elapsed * 0.60 + 2.0) * 0.07;
      ringMesh.rotation.x  += 0.009;
      ringMesh.rotation.y  += 0.006;

      /* Accent point light orbit */
      accentLight.position.x = 3.0 * Math.cos(elapsed * 0.18);
      accentLight.position.z = 3.0 * Math.sin(elapsed * 0.18);
      accentLight.position.y = 1.5;

      /* Mouse parallax */
      targetRot.y += (mouse.x * 0.15 - targetRot.y) * 0.04;
      targetRot.x += (mouse.y * 0.08 - targetRot.x) * 0.04;
      sceneGroup.rotation.y = targetRot.y;
      sceneGroup.rotation.x = targetRot.x;

      renderer.render(scene, camera);
    }
    animate();

    /* ── Resize ─────────────────────────────────────────────────── */
    const ro = new ResizeObserver(() => {
      const nW = container.clientWidth || 560;
      const nH = container.clientHeight || 620;
      renderer.setSize(nW, nH);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      sceneGroup.scale.setScalar(Math.min(1.0, nW / 480));
    });
    ro.observe(container);

    /* ── Cleanup ──────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      cardTex.dispose();
      typTex.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", minHeight: 620, position: "relative" }}
    />
  );
}
