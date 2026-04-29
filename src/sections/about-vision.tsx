"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const underline: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutVision() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <motion.section
      ref={sectionRef}
      data-navbar-theme="light"
      className="relative z-10 w-full overflow-hidden rounded-t-[2rem]"
      style={{
        backgroundColor: '#ffffff',
        boxShadow: "0 -16px 60px rgba(0,0,0,0.3)",
        y: sectionY,
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">

        {/* <motion.p
          className="text-[9px] uppercase font-mono tracking-[0.55em] text-gray-400 mb-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Our Direction
        </motion.p> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">

          {/* Vertical divider (desktop only) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px pointer-events-none"
            style={{ background: "rgba(0,0,0,0.07)" }}
          />

          {/* ── VISION ── */}
          <motion.div
            className="lg:pr-20 pb-16 lg:pb-0 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={fadeLeft}
          >
            <span
              aria-hidden
              className="absolute z-[-1] -top-4 left-0 font-black text-gray-100 pointer-events-none select-none hidden lg:block"
              style={{ fontSize: "8rem", lineHeight: 1, userSelect: "none" }}
            >
              01
            </span>

            <p
              className="text-[9px] uppercase font-mono tracking-[0.55em] mb-5"
              style={{ color: "#EB7300" }}
            >
              Vision
            </p>

            <h2
              className="font-black leading-[0.95] tracking-tight text-gray-900"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              To help brands grow with clarity, creativity, and a strong digital presence.
            </h2>

            <motion.div
              variants={underline}
              className="mt-5 mb-6 origin-left"
              style={{ width: "4rem", height: "3px", background: "#EB7300" }}
            />

            <p className="text-sm md:text-base leading-relaxed text-gray-500 max-w-md">
              We want to create work that not only looks good, but also helps
              businesses connect with the right audience, build trust, and grow
              steadily in a competitive market.
            </p>
          </motion.div>

          {/* ── MISSION ── */}
          <motion.div
            className="lg:pl-20 pt-16 lg:pt-0 border-t lg:border-t-0 border-gray-100 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={fadeRight}
          >
            <span
              aria-hidden
              className="absolute z-[-1] -top-4 right-0 font-black text-gray-100 pointer-events-none select-none hidden lg:block"
              style={{ fontSize: "8rem", lineHeight: 1, userSelect: "none" }}
            >
              02
            </span>

            <p
              className="text-[9px] uppercase font-mono tracking-[0.55em] mb-5"
              style={{ color: "#EB7300" }}
            >
              Mission
            </p>

            <h2
              className="font-black leading-[0.95] tracking-tight text-gray-900"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              Building stronger brands through thoughtful digital work
            </h2>

            <motion.div
              variants={underline}
              className="mt-5 mb-6 origin-left"
              style={{ width: "4rem", height: "3px", background: "#EB7300" }}
            />

            <p className="text-sm md:text-base leading-relaxed text-gray-500 max-w-md">
              We believe good marketing is not just about visibility. It’s about
              building a strong foundation that helps brands connect better, grow
              consistently, and create long term value.
            </p>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
