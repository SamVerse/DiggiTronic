"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

const LINE_ONE = ["LET'S", "BUILD", "SOMETHING"];
const LINE_TWO = ["EXTRAORDINARY."];

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 35, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 35, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const sectionFilter = useTransform(
    scrollYProgress,
    [0, 1],
    ["brightness(1)", "brightness(0.5)"]
  );

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { left, top, width, height } =
      sectionRef.current!.getBoundingClientRect();
    rawX.set(((e.clientX - left) / width - 0.5) * 60);
    rawY.set(((e.clientY - top) / height - 0.5) * 36);
  }
  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#0a0a0a", y: sectionY, filter: sectionFilter }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(235,115,0,0.07) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(235,115,0,0.05) 0%, transparent 70%)",
          bottom: "15%",
          right: "15%",
        }}
        animate={{ x: [0, -25, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ x: glowX, y: glowY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(235,115,0,0.10) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 72px)
          `,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl">
        <motion.p
          className="text-[9px] font-mono uppercase tracking-[0.6em] mb-8"
          style={{ color: "#EB7300" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Let's Talk
        </motion.p>

        <h1 className="flex flex-wrap justify-center gap-x-[0.3em]">
          {LINE_ONE.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block font-black uppercase text-white"
                style={{
                  fontSize: "clamp(2.2rem, 5.5vw, 6rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.2 + i * 0.07,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Line 2 — accent color */}
        <h1 className="flex flex-wrap justify-center gap-x-[0.3em] mt-1">
          {LINE_TWO.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block font-black uppercase"
                style={{
                  fontSize: "clamp(2.2rem, 5.5vw, 6rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  color: "#EB7300",
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.2 + (LINE_ONE.length + i) * 0.07,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 text-sm md:text-base leading-relaxed max-w-md"
          style={{ color: "rgba(255,255,255,0.45)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease: "easeOut" }}
        >
          Tell us about your vision — and we'll turn it into measurable growth.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <span
          className="text-[8px] font-mono uppercase tracking-[0.5em]"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Scroll
        </span>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, 5, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={16} strokeWidth={2} style={{ color: "#EB7300" }} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
