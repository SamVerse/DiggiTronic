"use client";

import { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Search, Lightbulb, Zap, BarChart2, Rocket } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "We immerse ourselves in your brand, audience, and goals. Deep research and honest conversations that uncover what your project really needs to succeed.",
    icon: Search,
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Every decision flows from a clear strategy. We map out the approach, deliverables, timelines, and success metrics before a single pixel or line of code is created.",
    icon: Lightbulb,
  },
  {
    num: "03",
    title: "Execution",
    desc: "This is where ideas become reality. Our team works with precision and creativity, keeping you informed with regular updates and transparent communication throughout.",
    icon: Zap,
  },
  {
    num: "04",
    title: "Optimisation",
    desc: "We test, measure, and refine. Using real data and analytics, we continuously improve performance so your results compound over time.",
    icon: BarChart2,
  },
  {
    num: "05",
    title: "Scale",
    desc: "Once proven, we scale what works. Whether that's doubling ad spend, expanding content, or building new features — we grow your success systematically.",
    icon: Rocket,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function ServiceProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative w-full overflow-hidden rounded-t-[2rem]"
      style={{ background: "#050505", boxShadow: "0 -12px 40px rgba(0,0,0,0.3)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(235,115,0,0.2), transparent)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(235,115,0,0.04) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[9px] font-mono uppercase tracking-[0.55em] mb-4"
            style={{ color: "#EB7300" }}
          >
            Our Process
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-black text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95, letterSpacing: "-0.025em" }}
          >
            How we work
          </motion.h2>
        </motion.div>

        {/* Two-column: step selector left, detail right */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16">

          {/* Left — step list */}
          <div ref={containerRef} className="flex flex-col">
            <div className="relative flex flex-col">
              <div
                className="absolute left-4 top-4 bottom-4 w-px z-0"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
              <motion.div
                className="absolute left-4 top-4 w-px z-0"
                style={{ background: "linear-gradient(to bottom, #EB7300, rgba(235,115,0,0.1))", originY: 0 }}
                animate={{ height: `${((activeStep + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />

              {STEPS.map((step, i) => {
                const isActive = i === activeStep;
                const isDone = i < activeStep;
                const Icon = step.icon;

                return (
                  <motion.button
                    key={step.num}
                    onClick={() => setActiveStep(i)}
                    className="relative z-10 flex items-center gap-5 py-5 text-left group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  >
                    <div
                      className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: isActive
                          ? "#EB7300"
                          : isDone
                          ? "linear-gradient(rgba(235,115,0,0.25), rgba(235,115,0,0.25)), #050505"
                          : "linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05)), #050505",
                        border: `1px solid ${isActive ? "#EB7300" : isDone ? "rgba(235,115,0,0.4)" : "rgba(255,255,255,0.1)"}`,
                        boxShadow: isActive ? "0 0 16px rgba(235,115,0,0.35)" : "none",
                      }}
                    >
                      <Icon size={13} color={isActive ? "#fff" : isDone ? "#EB7300" : "rgba(255,255,255,0.35)"} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline gap-2.5">
                        <span
                          className="text-[8px] font-mono tracking-[0.5em] transition-colors duration-200"
                          style={{ color: isActive ? "#EB7300" : "rgba(255,255,255,0.2)" }}
                        >
                          {step.num}
                        </span>
                        <span
                          className="font-black transition-colors duration-200"
                          style={{
                            color: isActive ? "#ffffff" : "rgba(255,255,255,0.3)",
                            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                          }}
                        >
                          {step.title}
                        </span>
                      </div>
                    </div>

                    {/* Dot indicator removed as requested */}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right — step detail */}
          <div className="flex items-center">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-8 md:p-10 w-full"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="font-black leading-none mb-4 select-none"
                style={{
                  fontSize: "clamp(4rem, 8vw, 6rem)",
                  color: "rgba(235,115,0,0.08)",
                  letterSpacing: "-0.05em",
                }}
              >
                {STEPS[activeStep].num}
              </div>

              <p
                className="text-[9px] font-mono uppercase tracking-[0.5em] mb-4"
                style={{ color: "#EB7300" }}
              >
                Step {STEPS[activeStep].num}
              </p>

              <h3
                className="font-black text-white mb-5"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.025em" }}
              >
                {STEPS[activeStep].title}
              </h3>

              <div className="h-0.5 w-12 rounded-full mb-5" style={{ background: "#EB7300" }} />

              <p className="text-sm leading-[1.9]" style={{ color: "rgba(255,255,255,0.5)" }}>
                {STEPS[activeStep].desc}
              </p>

              {activeStep < STEPS.length - 1 && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] transition-opacity hover:opacity-70"
                  style={{ color: "rgba(235,115,0,0.6)" }}
                >
                  Next: {STEPS[activeStep + 1].title}
                  <span className="text-sm">→</span>
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
