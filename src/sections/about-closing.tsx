"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const LINES = [
  { text: "YOU THINK.", color: "white" },
  { text: "WE CREATE.", color: "#EB7300" },
  { text: "WE SCALE.", color: "white" },
];

export default function AboutClosing() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: inProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowOpacity = useTransform(inProgress, [0, 0.4, 0.7], [0, 0.14, 0.08]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-50 w-full overflow-hidden rounded-t-[2rem] flex flex-col items-center justify-center"
      style={{
        background: "#0a0a0a",
        boxShadow: "0 -16px 60px rgba(0,0,0,0.5)",
        minHeight: "80vh",
      }}
    >
      {/* Ambient glow — driven by scroll progress */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: glowOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(235,115,0,1) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 60px)
          `,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-28 md:py-36">

        <motion.p
          className="text-[9px] uppercase font-mono tracking-[0.55em] mb-12"
          style={{ color: "rgba(235,115,0,0.7)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Ready to grow together?
        </motion.p>

        {/* Big statement lines — no overflow-hidden clip, simple fade+slide */}
        <div className="flex flex-col items-center gap-1">
          {LINES.map((line, lineIdx) => (
            <motion.span
              key={lineIdx}
              className="block font-black uppercase leading-none tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 7rem)",
                color: line.color,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{
                delay: lineIdx * 0.12,
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line.text}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="mt-4 rounded-full"
          style={{ height: "3px", background: "#EB7300" }}
          initial={{ width: 0 }}
          whileInView={{ width: "clamp(14rem, 35vw, 38rem)" }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="mt-10 text-[10px] uppercase font-mono tracking-[0.5em]"
          style={{ color: "rgba(255,255,255,0.3)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          Diggitronic
        </motion.p>
      </div>
    </motion.section>
  );
}
