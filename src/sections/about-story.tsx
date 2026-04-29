"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const PILLS = [
  "3+ Years",
  "50+ Projects",
  "Multi-Industry",
  "Long-Term Partners",
];

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

export default function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Giant "01" watermark */}
      <motion.div
        aria-hidden
        style={{ y: watermarkY }}
        className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-black leading-none"
          style={{
            fontSize: "clamp(16rem, 35vw, 40rem)",
            color: "#EB7300",
            opacity: 0.10,
            lineHeight: 0.85,
            paddingLeft: "2rem",
          }}
        >
          01
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={staggerContainer}
          >
            {/* <motion.p
              variants={fadeLeft}
              className="text-[9px] uppercase font-mono tracking-[0.55em] mb-6"
              style={{ color: "#EB7300" }}
            >
              Our Story
            </motion.p> */}

            <motion.h2
              variants={fadeLeft}
              className="font-black leading-[1.0] tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)" }}
            >
              A studio born from
            </motion.h2>
            <motion.h2
              variants={fadeLeft}
              className="font-black leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)", color: "#EB7300" }}
            >
              bold ambition.
            </motion.h2>

            <motion.div
              variants={{
                hidden: { scaleX: 0, originX: 0 },
                visible: {
                  scaleX: 1,
                  transition: { duration: 0.7, delay: 0.2, ease: "easeOut" },
                },
              }}
              className="mt-5 mb-7"
              style={{ width: "4rem", height: "2px", background: "#EB7300" }}
            />

            <motion.p
              variants={fadeUp}
              className="text-sm md:text-base leading-relaxed mb-5"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              DiggiTronic was founded with a single conviction: that every brand —
              from scrappy startups to established enterprises — deserves a digital
              presence that truly reflects its ambition. We&apos;re a full-service
              digital studio combining graphic design, performance marketing, SEO,
              video production, social media, and AI solutions under one roof — so
              your brand grows with coherence, consistency, and momentum.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Built with the idea that good brands deserve better digital
              presence. DiggiTronic started with a simple belief that every
              business, whether it&apos;s just starting out or already growing,
              deserves branding and marketing that genuinely represents who they
              are. Over time, we built a team that brings design, marketing,
              content, SEO, video production, social media, and AI solutions
              together in one place. Not just to offer services, but to help
              brands grow in a way that feels clear, consistent, and actually
              connected across every platform. We focus on creating work that
              looks good, communicates better, and helps businesses build a
              stronger presence both online and offline.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={staggerContainer}
          >
            {PILLS.map((pill, i) => (
              <motion.div
                key={pill}
                variants={{
                  hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
                  visible: {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="flex items-center gap-4 rounded-2xl px-6 py-5"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="text-[9px] font-mono tracking-widest shrink-0"
                  style={{ color: "#EB7300" }}
                >
                  0{i + 1}
                </span>
                <div
                  className="w-px self-stretch"
                  style={{ background: "rgba(235,115,0,0.25)" }}
                />
                <span
                  className="font-black text-base uppercase tracking-wide"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {pill}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
