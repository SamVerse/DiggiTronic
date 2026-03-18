"use client";

import { useRef, useEffect } from "react";
import { motion, Variants, useInView, animate as framAnimate } from "framer-motion";
import type { ServiceData } from "@/data/services";

/* ── Animated counter ───────────────────────────────────────────── */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!ref.current) return;
    if (inView) {
      const ctrl = framAnimate(0, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(v) {
          if (ref.current) ref.current.textContent = Math.round(v) + suffix;
        },
      });
      return () => ctrl.stop();
    } else {
      ref.current.textContent = `0${suffix}`;
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

export default function ServiceOverview({ service }: { service: ServiceData }) {
  const stats = [service.stat1, service.stat2, service.stat3];

  return (
    <section
      className="relative w-full overflow-hidden rounded-t-[2rem]"
      style={{
        background: "#050505",
        boxShadow: "0 -12px 40px rgba(0,0,0,0.3)",
      }}
    >
      {/* Top accent hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(235,115,0,0.25), transparent)" }}
      />

      {/* Giant watermark number */}
      <div
        aria-hidden
        className="absolute top-0 right-0 font-black leading-none pointer-events-none select-none"
        style={{
          fontSize: "clamp(8rem, 20vw, 18rem)",
          color: "rgba(255,255,255,0.025)",
          letterSpacing: "-0.05em",
          transform: "translate(15%, -20%)",
        }}
      >
        02
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">

          {/* Left — headline + body + highlight */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-[9px] font-mono uppercase tracking-[0.55em] mb-5"
              style={{ color: "#EB7300" }}
            >
              What We Do
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-black text-white mb-7"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              {service.overview.headline}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-sm leading-[1.95] mb-8"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {service.overview.body}
            </motion.p>

            {/* Highlight callout */}
            <motion.div
              variants={fadeUp}
              className="rounded-xl py-4 px-5"
              style={{
                borderLeft: "3px solid #EB7300",
                background: "rgba(235,115,0,0.04)",
                paddingLeft: "1.25rem",
              }}
            >
              <p className="text-sm leading-[1.85] font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                {service.overview.highlight}
              </p>
            </motion.div>
          </motion.div>

          {/* Right — animated stats */}
          <motion.div
            className="flex flex-col gap-6 lg:pt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
            variants={stagger}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col gap-1"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1.5rem" }}
              >
                <div
                  className="font-black leading-none"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    color: "#EB7300",
                    letterSpacing: "-0.04em",
                  }}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
