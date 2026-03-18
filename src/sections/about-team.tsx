"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const TEAM = [
  {
    name: "Raj Verma",
    role: "Founder & Creative Director",
    initial: "R",
    color: "from-[#EB7300] to-[#FF9A3D]",
  },
  {
    name: "Aria Khan",
    role: "Head of Strategy",
    initial: "A",
    color: "from-[#EB7300] to-[#FF6A00]",
  },
  {
    name: "Jordan Lee",
    role: "Lead Developer",
    initial: "J",
    color: "from-[#EB7300] to-[#FFB347]",
  },
  {
    name: "Priya Nair",
    role: "Marketing Director",
    initial: "P",
    color: "from-[#EB7300] to-[#FF8C00]",
  },
];

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
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function AboutTeam() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax scroll-out */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const sectionFilter = useTransform(
    scrollYProgress,
    [0, 1],
    ["brightness(1)", "brightness(0.8)"]
  );

  return (
    <motion.section
      ref={sectionRef}
      data-navbar-theme="light"
      className="relative z-10 w-full bg-white overflow-hidden rounded-t-[2rem]"
      style={{
        boxShadow: "0 -16px 60px rgba(0,0,0,0.3)",
        y: sectionY,
        filter: sectionFilter,
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">

        {/* Header */}
        <motion.div
          className="mb-16 flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="text-[9px] uppercase font-mono tracking-[0.55em] text-gray-400 mb-4"
          >
            The People Behind It
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-black leading-[0.92] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
          >
            Meet the Team
          </motion.h2>
        </motion.div>

        {/* Team grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={staggerContainer}
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              className="flex flex-col items-center text-center group"
            >
              {/* Avatar */}
              <motion.div
                className={`relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center overflow-hidden cursor-default`}
                style={{ filter: "grayscale(0.85)" }}
                whileHover={{
                  filter: "grayscale(0)",
                  scale: 1.05,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <span
                  className="font-black text-white select-none"
                  style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: 1 }}
                >
                  {member.initial}
                </span>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.2), transparent 65%)",
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Name */}
              <p className="mt-5 font-black text-gray-900 text-sm">{member.name}</p>

              {/* Role */}
              <p
                className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mt-1"
              >
                {member.role}
              </p>

              {/* Orange underline — grows on hover */}
              <motion.div
                className="mt-3 h-0.5 rounded-full"
                style={{ background: "#EB7300" }}
                initial={{ width: "0rem" }}
                whileInView={{ width: "1.5rem" }}
                whileHover={{ width: "3rem" }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
