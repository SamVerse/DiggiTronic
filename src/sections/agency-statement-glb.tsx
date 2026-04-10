"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useInView, animate as framAnimate } from "framer-motion";
import { ArrowRight, Palette, Code, TrendingUp, Cpu } from "lucide-react";

const GlbModel = dynamic(() => import("@/components/glb-model"), { ssr: false });

const MARQUEE_ITEMS = [
  "Brand Design",
  "Web Development",
  "Digital Marketing",
  "AI Solutions",
  "SEO Strategy",
  "Video Production",
  "UI/UX Design",
  "Social Media",
];

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Years Active" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 40, suffix: "+", label: "Happy Clients" },
];

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

export default function AgencyStatementGLB() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: parallaxProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sectionY = useTransform(parallaxProgress, [0, 1], ["0%", "80%"]);

  const fadeLeft: any = {
    hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeRight: any = {
    hidden: { opacity: 0, x: 60, filter: "blur(4px)", scale: 0.9 },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeUp: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: any = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const popIn: any = {
    hidden: { opacity: 0, scale: 0.85, filter: "blur(10px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.section
      id="agency-statement-glb"
      data-navbar-theme="light"
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden rounded-t-[2rem]"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 -16px 60px rgba(0,0,0,0.3)",
        y: sectionY,
      }}
    >
      {/* ══════════════════════════════════════════════════════
          MOBILE LAYOUT  (< lg) — stacked column
          ══════════════════════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col w-full">

        <motion.div
          className="flex flex-col px-6 pt-8 pb-4 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeLeft}
            className="font-black leading-[0.9] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2.4rem, 10vw, 3.6rem)" }}
          >
            We build
          </motion.h2>
          <motion.h2
            variants={popIn}
            className="font-black leading-[0.9] tracking-tight origin-left"
            style={{ fontSize: "clamp(2.4rem, 10vw, 3.6rem)", color: "#ff4d00" }}
          >
            brands that
          </motion.h2>
          <motion.h2
            variants={fadeLeft}
            className="font-black leading-[0.9] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2.4rem, 10vw, 3.6rem)" }}
          >
            move markets.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-5 text-sm leading-relaxed max-w-sm text-gray-500">
            From bold identities to precision-crafted digital systems — we partner
            with ambitious brands to create work that lasts and scales.
          </motion.p>

          {/* service highlights — mobile */}
          <motion.div variants={fadeUp} className="mt-6 grid grid-cols-2 gap-2.5">
            {[
              { Icon: Palette, label: "Brand Design" },
              { Icon: Code, label: "Development" },
              { Icon: TrendingUp, label: "Marketing" },
              { Icon: Cpu, label: "AI Solutions" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ border: "1px solid rgba(255,77,0,0.12)", background: "rgba(255,77,0,0.03)" }}
              >
                <Icon size={14} color="#ff4d00" strokeWidth={2.2} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA — mobile */}
          <motion.div variants={fadeUp} className="mt-5">
            <a
              href="/services/graphic-design"
              className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff6a00] font-medium transition text-white active:scale-95 rounded-full px-6 h-10 text-sm shadow-[0_0_20px_rgba(255,77,0,0.25)]"
            >
              Explore Our Services
              <ArrowRight className="size-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative w-full flex items-center justify-center"
          style={{ height: "280px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={popIn}
        >
          <div className="w-[75%] h-full mx-auto">
            <GlbModel />
          </div>
        </motion.div>

        <motion.div
          className="px-6 pb-4 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } } }} className="h-px mb-5 origin-left bg-gray-100" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="group flex flex-col gap-0.5">
                <span className="text-2xl font-black text-gray-900 group-hover:text-[#ff4d00] transition-colors duration-300">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-gray-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>


      {/* ══════════════════════════════════════════════════════
          DESKTOP LAYOUT  (≥ lg) — side by side, full screen height
          ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative h-screen w-full">

        {/* ── Left half ─ */}
        <div className="absolute top-0 bottom-0 left-0 right-[52%] flex flex-col justify-between py-16 px-10 xl:px-20 z-10">

          <motion.div
            className="flex flex-col justify-center flex-1 min-h-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-150px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeLeft}
              className="font-black leading-[0.87] tracking-tight text-gray-900 block"
              style={{ fontSize: "clamp(2rem, 3.2vw, 5rem)" }}
            >
              We build
            </motion.h2>
            <motion.h2
              variants={popIn}
              className="font-black leading-[0.87] tracking-tight block origin-left"
              style={{ fontSize: "clamp(2rem, 3.2vw, 5rem)", color: "#ff4d00" }}
            >
              brands that
            </motion.h2>
            <motion.h2
              variants={fadeLeft}
              className="font-black leading-[0.87] tracking-tight text-gray-900 block"
              style={{ fontSize: "clamp(2rem, 3.2vw, 5rem)" }}
            >
              move markets.
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-6 max-w-sm text-sm xl:text-[15px] leading-relaxed text-gray-500">
              From bold identities to precision-crafted digital systems — we partner
              with ambitious brands to create work that lasts and scales.
            </motion.p>

            {/* service highlights */}
            <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 gap-3 max-w-sm">
              {[
                { Icon: Palette, label: "Brand Design" },
                { Icon: Code, label: "Development" },
                { Icon: TrendingUp, label: "Marketing" },
                { Icon: Cpu, label: "AI Solutions" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                  style={{ border: "1px solid rgba(255,77,0,0.12)", background: "rgba(255,77,0,0.03)" }}
                >
                  <Icon size={16} color="#ff4d00" strokeWidth={2.2} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="mt-8">
              <a
                href="/services/graphic-design"
                className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff6a00] font-medium transition text-white active:scale-95 rounded-full px-7 h-11 text-sm shadow-[0_0_20px_rgba(255,77,0,0.25)]"
              >
                Explore Our Services
                <ArrowRight className="size-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* BOTTOM: divider + stats */}
          <motion.div
            className="shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } } }} className="h-px mb-5 origin-left bg-gray-100" />
            <div className="flex gap-6 xl:gap-12 flex-wrap">
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="group flex flex-col gap-1">
                  <span className="text-xl xl:text-3xl font-black text-white transition-colors duration-300 group-hover:text-[#ff4d00]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.35em] text-gray-400">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right half: GLB model ─ */}
        <motion.div
          className="absolute top-0 bottom-0 right-0 w-[52%] flex items-center justify-center z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-150px" }}
          variants={fadeRight}
        >
          <div className="relative w-full" style={{ height: "80vh" }}>
            <GlbModel />
          </div>
        </motion.div>
      </div>

      {/* ── marquee ── */}
      <div className="relative w-full overflow-hidden border-t border-gray-100 z-10" style={{ backgroundColor: "#ffffff" }}>
        <motion.div
          className="flex whitespace-nowrap py-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
            (item, i) => (
              <span key={i} className="inline-flex items-center gap-5 px-6">
                <span className="text-[9px] uppercase tracking-[0.35em] font-mono text-gray-400">
                  {item}
                </span>
                <span className="w-1 h-1 rounded-full flex-shrink-0 bg-[#ff4d00]" />
              </span>
            )
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
