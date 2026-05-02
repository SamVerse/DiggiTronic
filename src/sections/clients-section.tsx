"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const CLIENTS_ROW1 = [
  "NovaTech",
  "PrimeEdge",
  "Stellarify",
  "Nexcore",
  "Luminary",
  "Brandshift",
];

const CLIENTS_ROW2 = [
  "Quantum Labs",
  "Deepwave",
  "Strategos",
  "Ironclad",
  "Elevate",
  "Zenith",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function MarqueeRow({
  clients,
  direction = "left",
  duration = 36,
  delay = 0,
}: {
  clients: string[];
  direction?: "left" | "right";
  duration?: number;
  delay?: number;
}) {
  const doubled = [...clients, ...clients, ...clients, ...clients];
  const xFrom = direction === "left" ? "0%" : "-50%";
  const xTo = direction === "left" ? "-50%" : "0%";

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{ x: [xFrom, xTo] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {doubled.map((name, i) => (
          <motion.div
            key={`${name}-${i}`}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border cursor-default flex-shrink-0"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
            }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(255,77,0,0.45)",
              boxShadow: "0 0 20px rgba(255,77,0,0.12)",
              background: "rgba(255,77,0,0.05)",
            }}
            transition={{ duration: 0.2 }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#EB7300", opacity: 0.7 }}
            />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.65)", letterSpacing: "0.18em" }}
            >
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden"
      style={{
        background: "#050505",
        y: sectionY,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,77,0,0.04) 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 40px
          ), repeating-linear-gradient(
            90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 40px
          )`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-10">
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* <motion.p
            variants={fadeUp}
            className="text-[9px] uppercase font-mono mb-5"
            style={{ color: "rgba(255,255,255,0.65)", letterSpacing: "0.55em" }}
          >
            Our Clients
          </motion.p> */}

          <motion.h2
            variants={fadeUp}
            className="font-black leading-[1.1] tracking-tight text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
          >
            Trusted by
          </motion.h2>
          <motion.h2
            variants={fadeUp}
            className="font-black leading-[1.1] tracking-tight -mt-[0.15em]"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              color: "#EB7300",
            }}
          >
            forward-thinking brands.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            From early-stage startups to established enterprises — we've had
            the privilege of shaping brands that leave an impact.
          </motion.p>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col gap-4 pb-24">
        <MarqueeRow clients={CLIENTS_ROW1} direction="left" duration={36} delay={0.3} />
        <MarqueeRow clients={CLIENTS_ROW2} direction="right" duration={52} delay={0.5} />
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #050505)",
        }}
      />
    </motion.section>
  );
}
