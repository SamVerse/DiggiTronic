"use client";

import { useRef, useEffect } from "react";
import { motion, Variants, useInView, animate as framAnimate } from "framer-motion";
import { Quote } from "lucide-react";
import type { Stat } from "@/data/services";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!ref.current) return;
    if (inView) {
      const ctrl = framAnimate(0, value, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(v) {
          if (ref.current) {
            const formatted = Number.isInteger(value)
              ? Math.round(v).toString()
              : v.toFixed(1);
            ref.current.textContent = formatted + suffix;
          }
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
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const TESTIMONIALS = [
  {
    quote:
      "DiggiTronic doesn't just deliver work — they deliver outcomes. Every project has exceeded our expectations in quality and results.",
    author: "Marcus Webb",
    role: "CEO, Growth Ventures",
    initial: "M",
  },
  {
    quote:
      "The level of craft and attention to detail is extraordinary. Our brand has never looked better, and our numbers have never been stronger.",
    author: "Aisha Al-Rashid",
    role: "Founder, Luxe Brand Co.",
    initial: "A",
  },
];

export default function ServiceSocialProof({
  stat1,
  stat2,
  stat3,
}: {
  stat1: Stat;
  stat2: Stat;
  stat3: Stat;
}) {
  const stats = [stat1, stat2, stat3];

  return (
    <section className="relative w-full" style={{ background: "#0a0a0a" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(235,115,0,0.18), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20 place-items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={stagger}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col gap-2 text-center"
            >
              <div
                className="font-black leading-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "#EB7300", letterSpacing: "-0.04em" }}
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p
                className="text-xs font-mono uppercase tracking-[0.4em]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="h-px mb-20" style={{ background: "rgba(255,255,255,0.06)" }} />

        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[9px] font-mono uppercase tracking-[0.55em] mb-4"
            style={{ color: "#EB7300" }}
          >
            Client Voices
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-black text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95, letterSpacing: "-0.025em" }}
          >
            What clients say
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              className="relative rounded-3xl p-8 flex flex-col gap-6"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.75, ease: "easeOut" }}
              whileHover={{ borderColor: "rgba(235,115,0,0.2)", y: -4 }}
            >
              <Quote size={24} style={{ color: "rgba(235,115,0,0.35)" }} />

              <p
                className="text-sm leading-[1.9] flex-1 font-medium italic"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                "{t.quote}"
              </p>

              <div className="h-px" style={{ background: "linear-gradient(90deg, rgba(235,115,0,0.4), transparent)" }} />

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0"
                  style={{ background: "rgba(235,115,0,0.2)", border: "1px solid rgba(235,115,0,0.3)" }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="font-black text-white text-sm">{t.author}</p>
                  <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
