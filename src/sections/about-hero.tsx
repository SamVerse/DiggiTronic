"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

const LINE_ONE = ["All", "Your", "Digital", "Needs."];
const LINE_TWO = ["One", "Team", "That", "Actually", "Gets", "It."];

export default function AboutHero() {
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
    rawX.set(((e.clientX - left) / width - 0.5) * 40);
    rawY.set(((e.clientY - top) / height - 0.5) * 24);
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
      {/* Ambient glow — mouse-driven parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ x: glowX, y: glowY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 60%, rgba(235,115,0,0.13) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 60px)
          `,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.p
          className="text-[9px] uppercase font-mono tracking-[0.55em] mb-8"
          style={{ color: "#EB7300" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Digital Growth Partner
        </motion.p>

        <h1 
          className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-0 leading-[1.3]"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 6rem)" }}
        >
          {LINE_ONE.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block font-black text-white pt-4 pb-4"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 6rem)", lineHeight: 1.3 }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.25 + i * 0.06,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <h1 
          className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-0 -mt-[0.35em] leading-[1.3]"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 6rem)" }}
        >
          {LINE_TWO.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block font-black pt-4 pb-4"
                style={{
                  fontSize: "clamp(2.2rem, 5.5vw, 6rem)",
                  lineHeight: 1.3,
                  color: i === LINE_TWO.length - 1 ? "#EB7300" : "white",
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.25 + (LINE_ONE.length + i) * 0.06,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 text-sm md:text-base leading-relaxed max-w-lg"
          style={{ color: "rgba(255,255,255,0.5)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        >
          We work across design, marketing, tech, and automation, not as
          separate services, but as one connected system.
        </motion.p>
      </div>

    </motion.section>
  );
}
