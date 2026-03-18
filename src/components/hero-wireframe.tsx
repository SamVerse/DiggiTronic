"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroWireframe() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Use strictly fixed dimensions so the PerspectiveCamera aspect perfectly matches HeroCube
        const W = 1600;
        const H = 800;

        // ── Renderer ──────────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        // Don't scale CSS style of DOM element (keep it 1600x800 pixel exact)
        renderer.domElement.style.width = `${W}px`;
        renderer.domElement.style.height = `${H}px`;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        mount.appendChild(renderer.domElement);

        // ── Scene / Camera ────────────────────────────────────────────────────────
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, W / H, 0.1, 100);
        camera.position.set(11, 7, 14); // Zoomed out to decrease overall size
        camera.lookAt(0, 0, 0);

        const group = new THREE.Group();
        scene.add(group);

        // ── 1. Extended Wireframe Tunnel ──────────────────────────────────────────
        const wireMat = new THREE.LineBasicMaterial({
            color: 0x444444,
            transparent: true,
            opacity: 0.5,
        });

        // Wireframe dimensions perfectly match the center cube structure
        const wireSize = 2.8;
        const boxGeo = new THREE.BoxGeometry(wireSize, wireSize, wireSize);
        const edgesBox = new THREE.EdgesGeometry(boxGeo);
        const circleGeo = new THREE.EdgesGeometry(new THREE.CylinderGeometry(wireSize / 2, wireSize / 2, 0, 64));

        // Create a longer tunnel (from x = -3 to x = +3) to ensure it fills the width
        for (let i = -4; i <= 4; i++) {
            if (i !== 0) {
                // Skip rendering the box at 0 because the main cube occupies it visually
                const boxEdges = new THREE.LineSegments(edgesBox, wireMat);
                boxEdges.position.x = i * wireSize;
                group.add(boxEdges);
            } else {
                // Render just the bounding wireframe so it wraps around the main cube
                const boxEdges = new THREE.LineSegments(edgesBox, wireMat);
                boxEdges.position.x = i * wireSize;
                group.add(boxEdges);
            }

            // Add inscribed circles between boxes
            const circle = new THREE.LineSegments(circleGeo, wireMat);
            circle.position.x = i * wireSize - wireSize / 2;
            circle.rotation.z = Math.PI / 2;
            group.add(circle);
        }
        // Final circle on far right
        const lastCircle = new THREE.LineSegments(circleGeo, wireMat);
        lastCircle.position.x = 4.5 * wireSize;
        lastCircle.rotation.z = Math.PI / 2;
        group.add(lastCircle);


        // ── 2. Continuous Energy Beam ─────────────────────────────────────────────
        const beamGroup = new THREE.Group();
        group.add(beamGroup);

        // A long central beam passing through the boxes
        const beamGeo = new THREE.CylinderGeometry(0.5, 0.5, 12, 64);
        beamGeo.rotateZ(Math.PI / 2); // align along X axis

        // Glowing orange beam texture fading on edges
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext("2d")!;
        const grd = ctx.createLinearGradient(0, 0, 0, 128);
        grd.addColorStop(0, "rgba(255, 77, 0, 0)");
        grd.addColorStop(0.5, "rgba(255, 77, 0, 1)");
        grd.addColorStop(1, "rgba(255, 77, 0, 0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 128, 128);
        const beamTex = new THREE.CanvasTexture(canvas);

        const beamMat = new THREE.MeshBasicMaterial({
            color: 0xff8833,
            map: beamTex,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
        });

        const beam = new THREE.Mesh(beamGeo, beamMat);
        beamGroup.add(beam);

        // Add a core thin bright line
        const coreGeo = new THREE.CylinderGeometry(0.15, 0.15, 12, 16);
        coreGeo.rotateZ(Math.PI / 2);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
        const coreBeam = new THREE.Mesh(coreGeo, coreMat);
        beamGroup.add(coreBeam);

        // A light attached to the beam to illuminate surroundings
        const beamLight = new THREE.PointLight(0xff5500, 100, 20);
        beamGroup.add(beamLight);

        // ── 3. Subtle Ambient Background Particles ────────────────────────────────
        const starCount = 300; // More particles to fill the wide view
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i++) {
            starPos[i * 3 + 0] = (Math.random() - 0.5) * 30; // x spread
            starPos[i * 3 + 1] = (Math.random() - 0.5) * 15; // y spread
            starPos[i * 3 + 2] = (Math.random() - 0.5) * 15; // z spread
        }
        starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.04,
            transparent: true,
            opacity: 0.2,
        });
        const stars = new THREE.Points(starGeo, starMat);
        group.add(stars);


        // ── Interaction ───────────────────────────────────────────────────────────
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const onMouseMove = (e: MouseEvent) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMouseMove);


        // ── Animation Loop ────────────────────────────────────────────────────────
        let t = 0;
        let rafId = 0;

        const animate = () => {
            rafId = requestAnimationFrame(animate);
            // Synchronize time globally (or use simple counter)
            t += 0.005;

            // Animate the beam sliding through the tunnel
            const cycle = t * 2.0;
            const wrapX = ((cycle + 15) % 30) - 15; // wrap from -15 to +15
            beamGroup.position.x = wrapX;

            // Pulse the beam intensity
            beam.scale.y = 0.8 + Math.sin(t * 15) * 0.2;
            beam.scale.z = 0.8 + Math.sin(t * 15) * 0.2;

            // Rotate stars very slowly
            stars.rotation.y = t * 0.05;

            // Smooth mouse tilt (sync with main cube)
            currentX += (targetX - currentX) * 0.05;
            currentY += (targetY - currentY) * 0.05;

            group.rotation.x = currentY * 0.12;
            group.rotation.y = currentX * 0.12;

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

    return <div ref={mountRef} style={{ width: 1600, height: 800 }} className="pointer-events-none" />;
}
