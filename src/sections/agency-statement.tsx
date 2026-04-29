"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, animate as framAnimate } from "framer-motion";
import AgencyCube from "../components/agency-cube";

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

export default function AgencyStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const decorLineY = useTransform(scrollYProgress, [0, 1], ["22%", "-22%"]);

  /* ── Parallax effect when section scrolls out under the next section ── */
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });

  // Moves down by 30% of its height, making it scroll much slower than the viewport.
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
      id="agency-statement"
      data-navbar-theme="light"
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden rounded-t-[2rem]"
      style={{
        backgroundColor: '#ffffff',
        boxShadow: "0 -16px 60px rgba(0,0,0,0.3)",
        y: sectionY,
      }}
    >
      {/* 
      <motion.div
        aria-hidden
        style={{ y: watermarkY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <img
          src="/logo col.png"
          alt="Digitronic Watermark"
          className="pointer-events-none"
          style={{
            height: "clamp(16rem, 30vw, 28rem)",
            opacity: 0.15,
            objectFit: "contain",
          }}
        />
      </motion.div>
      */}

      {/*
      <motion.div
        aria-hidden
        style={{ y: decorLineY }}
        className="absolute top-0 bottom-0 left-[48%] hidden xl:block w-px bg-gray-100 pointer-events-none"
      />
      */}

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
          {/* <motion.p variants={fadeLeft} className="text-[9px] uppercase tracking-[0.55em] text-gray-400 mb-5 font-mono">
            What we do
          </motion.p> */}

          <motion.h2
            variants={fadeLeft}
            className="font-black leading-[0.9] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2.4rem, 10vw, 3.6rem)" }}
          >
            We do more
          </motion.h2>
          <motion.h2
            variants={popIn}
            className="font-black leading-[0.9] tracking-tight origin-left"
            style={{ fontSize: "clamp(2.4rem, 10vw, 3.6rem)", color: "#EB7300" }}
          >
            than simply
          </motion.h2>
          <motion.h2
            variants={fadeLeft}
            className="font-black leading-[0.9] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2.4rem, 10vw, 3.6rem)" }}
          >
            create brands.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-5 text-gray-500 text-sm leading-relaxed max-w-sm">
            We fix what’s not working, build what’s missing, and scale what has potential.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative w-full flex items-center justify-center"
          style={{ height: "420px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={popIn}
        >
          {/* Scale down the orbital system on mobile so it fits */}
          <div className="scale-[0.62] origin-center">
            <AgencyCube />
          </div>
        </motion.div>

        <motion.div
          className="px-6 pb-4 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } } }} className="h-px bg-gray-100 mb-5 origin-left" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="group flex flex-col gap-0.5">
                <span className="text-2xl font-black text-gray-900 group-hover:text-[#EB7300] transition-colors duration-300">
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


        {/* ── Left half: single flex column — label → headline → body → stats ─ */}
        {/* Using justify-between so top content and bottom stats never collide   */}
        <div className="absolute top-0 bottom-0 left-0 right-[52%] flex flex-col justify-between py-16 px-10 xl:px-20 z-10">

          <motion.div
            className="flex flex-col justify-center flex-1 min-h-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-150px" }}
            variants={staggerContainer}
          >
            {/* <motion.p variants={fadeLeft} className="text-[9px] uppercase tracking-[0.55em] text-gray-400 mb-6 font-mono">
              What we do
            </motion.p> */}

            <motion.h2
              variants={fadeLeft}
              className="font-black leading-[0.87] tracking-tight text-gray-900 block"
              style={{ fontSize: "clamp(2rem, 3.2vw, 5rem)" }}
            >
              We do more
            </motion.h2>
            <motion.h2
              variants={popIn}
              className="font-black leading-[0.87] tracking-tight block origin-left"
              style={{ fontSize: "clamp(2rem, 3.2vw, 5rem)", color: "#EB7300" }}
            >
              than simply
            </motion.h2>
            <motion.h2
              variants={fadeLeft}
              className="font-black leading-[0.87] tracking-tight text-gray-900 block"
              style={{ fontSize: "clamp(2rem, 3.2vw, 5rem)" }}
            >
              create brands.
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-6 max-w-xs text-gray-500 text-sm xl:text-[15px] leading-relaxed">
              We fix what’s not working, build what’s missing, and scale what has potential.
            </motion.p>
          </motion.div>

          {/* BOTTOM: divider + stats — always pinned to the bottom of this column */}
          <motion.div
            className="shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } } }} className="h-px bg-gray-100 mb-5 origin-left" />
            <div className="flex gap-6 xl:gap-12 flex-wrap">
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="group flex flex-col gap-1">
                  <span className="text-xl xl:text-3xl font-black text-gray-900 transition-colors duration-300 group-hover:text-[#EB7300]">
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

        <motion.div
          className="absolute top-0 bottom-0 right-0 w-[52%] flex items-center justify-center z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-150px" }}
          variants={fadeRight}
        >
          <AgencyCube />
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden border-t border-gray-100 z-10" style={{ backgroundColor: '#ffffff' }}>
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
                <span className="text-[9px] uppercase tracking-[0.35em] text-gray-400 font-mono">
                  {item}
                </span>
                <span className="w-1 h-1 rounded-full flex-shrink-0 bg-[#EB7300]" />
              </span>
            )
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
