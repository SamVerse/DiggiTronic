"use client";

import { useEffect } from "react";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";

/**
 * GlobalEffects — rendered in root layout (server→client boundary).
 * Provides:
 *  • Thin right-edge scroll progress bar (orange)
 *  • Ambient cursor glow (orange radial halo, screen blend)
 */
export default function GlobalEffects() {
  const { scrollYProgress } = useScroll();

  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const springX = useSpring(cursorX, { stiffness: 100, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 100, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Scroll progress — right edge, 2px orange bar */}
      <motion.div
        className="fixed right-0 top-0 w-[2px] h-full z-[9999] origin-top pointer-events-none"
        style={{ scaleY: scrollYProgress, background: "#EB7300" }}
      />

    </>
  );
}
