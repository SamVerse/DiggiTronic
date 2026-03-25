"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
// tiltX/tiltY removed — visual container is static
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { ServiceData } from "@/data/services";
import { SERVICE_VISUALS } from "@/components/service-visuals";

export default function ServiceHero({ service }: { service: ServiceData }) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const sectionBrightness = useTransform(scrollYProgress, [0, 1], ["brightness(1)", "brightness(0.4)"]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 40, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      rawX.set(((e.clientX / window.innerWidth) - 0.5) * 50);
      rawY.set(((e.clientY / window.innerHeight) - 0.5) * 30);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [rawX, rawY]);

  const words = service.title.split(" ");
  const Visual = SERVICE_VISUALS[service.visualKey];

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0a0a0a", y: sectionY, filter: sectionBrightness }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          background: "radial-gradient(ellipse 50% 40% at 20% 50%, rgba(235,115,0,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 72px)
          `,
        }}
      />

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0a0a0a)" }}
      />

      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center"
        style={{ paddingTop: "8rem", paddingBottom: "6rem" }}
      >
        <div className="flex flex-col">
          <motion.p
            className="text-[9px] font-mono uppercase tracking-[0.6em] mb-8"
            style={{ color: "#EB7300" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {service.title} — DiggiTronic
          </motion.p>

          {/* Headline — word-clip reveal */}
          <div className="mb-6 flex flex-wrap gap-x-[0.2em]">
            {words.map((word, wi) => (
              <div key={wi} className="overflow-hidden">
                <motion.span
                  className="block font-black text-white"
                  style={{
                    fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                    lineHeight: 0.92,
                    letterSpacing: "-0.035em",
                  }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: 0.15 + wi * 0.08,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.div
            className="h-0.5 rounded-full mb-7"
            style={{ background: "linear-gradient(90deg, #EB7300, transparent)", originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.p
            className="font-black text-white mb-4"
            style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", letterSpacing: "-0.01em", color: "rgba(255,255,255,0.75)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
          >
            {service.tagline}
          </motion.p>

          <motion.p
            className="text-sm leading-[1.85] mb-10 max-w-md"
            style={{ color: "rgba(255,255,255,0.42)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: "easeOut" }}
          >
            {service.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
          >
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #EB7300, #ff9a00)",
                  boxShadow: "0 4px 24px rgba(235,115,0,0.3)",
                }}
              >
                Start a Project
                <span className="text-base">→</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm border transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)" }}
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Visual component — no box, no tilt */}
          <div className="relative w-full" style={{ minHeight: 500 }}>
            {Visual && <Visual />}
          </div>
        </motion.div>
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
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
          >
            <ChevronDown size={16} strokeWidth={2} style={{ color: "#EB7300" }} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
