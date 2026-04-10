"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.2 / maxDim;
    scene.scale.setScalar(scale);
    scene.position.sub(center.multiplyScalar(scale));
  }, [scene]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.09;
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.09;

    groupRef.current.rotation.y = smooth.current.x * 0.14;
    groupRef.current.rotation.x = smooth.current.y * 0.14;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function GlbModel() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.5, 8], fov: 28 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} color="#1a1a1a" />
          <directionalLight position={[2, 5, 4]} intensity={2.0} color="#cc4400" />
          <directionalLight position={[-3, 1, 3]} intensity={1.5} color="#aa3300" />
          <directionalLight position={[0, -3, -2]} intensity={1.0} color="#882200" />
          <pointLight position={[0, 0, 4]} intensity={1.5} color="#993300" distance={10} />
          <Model url="/3d-models/base_basic_shaded.glb" />
        </Suspense>
      </Canvas>
    </div>
  );
}
