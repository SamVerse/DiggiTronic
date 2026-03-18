"use client";

import type { MouseEvent } from "react";
import { useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { useMotionValue, useSpring, motion, useTransform } from "framer-motion";

const viewportHeight =
  typeof window !== "undefined" ? window.innerHeight : 900;


const springValues = {
  damping: 60,
  stiffness: 40,
  mass: 2,
};

interface TiltedImageProps {
  rotateAmplitude?: number;
  scrollYProgress: MotionValue<number>;
}

export default function TiltedImage({
  rotateAmplitude = 1.6,
  scrollYProgress,
}: TiltedImageProps) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);
  const maxTilt = Math.min(Math.max(rotateAmplitude, 0), 2);

  // --- SCROLL PARALLAX (DELAYED START) ---

  // Image stays mostly static until ~60% scroll
  const scrollY = useTransform(scrollYProgress, [0, 0.6, 1], [180, 40, -180]);

  // Rotation ONLY starts after 60%
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0, 14]);

  const scrollRotateZ = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0, -4]);

  // Image moves UP aggressively to overlap content
  // Scale lift based on screen height
  const maxLift = Math.min(viewportHeight * 0.28, 240);

  const scrollLift = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [0, 0, -maxLift],
  );


  // Slight scale-up to enhance presence
  const scrollScale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 1.08]);

  // Extra depth after rotation starts
  const scrollZ = useTransform(scrollYProgress, [0, 0.6, 1], [40, 40, 120]);

  function handleMouse(e: MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -maxTilt;
    const rotationY = (offsetX / (rect.width / 2)) * maxTilt;

    rotateX.set(Math.max(-maxTilt, Math.min(maxTilt, rotationX)));
    rotateY.set(Math.max(-maxTilt, Math.min(maxTilt, rotationY)));

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <motion.figure
      ref={ref}
      className="relative w-full [perspective:1200px] mt-16 mb-8 max-w-5xl mx-auto flex justify-center"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ y: scrollY }}
    >
      <motion.div
        className="relative [transform-style:preserve-3d] w-full max-w-5xl"
        style={{
          rotateX,
          rotateY,
          rotateZ: scrollRotateZ,
          translateZ: scrollZ,
          y: scrollLift,
          scale: scrollScale,
        }}
      >
        <motion.img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-2.png"
          alt="hero section showcase"
          className="w-full rounded-[18px] will-change-transform"
          style={{
            rotateX: scrollRotateX,
          }}
        />
      </motion.div>
    </motion.figure>
  );
}
