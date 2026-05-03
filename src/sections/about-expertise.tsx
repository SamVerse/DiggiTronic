"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, animate as framAnimate, Variants } from "framer-motion";
import { Palette, Search, Share2, Video, Cpu, Globe } from "lucide-react";

const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Years Active" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const SERVICES = [
  {
    icon: Palette,
    name: "Graphic Design",
    desc: "Brand identity, visual systems, print & motion graphics.",
  },
  {
    icon: Search,
    name: "SEO & Optimization",
    desc: "Rankings, technical audits, content strategy, and growth.",
  },
  {
    icon: Share2,
    name: "Social Media Marketing",
    desc: "Campaigns, content calendars, and paid social execution.",
  },
  {
    icon: Video,
    name: "Content & Video Production",
    desc: "Scripts, shoots, reels, explainers, and branded films.",
  },
  {
    icon: Cpu,
    name: "AI Solutions",
    desc: "Automation, AI workflows, smart integrations, and tools.",
  },
  {
    icon: Globe,
    name: "Web Development",
    desc: "Custom sites, web apps, landing pages, and e-commerce.",
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
  visible: { transition: { staggerChildren: 0.1 } },
};

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

export default function AboutExpertise() {
  return (
    <section
      className="relative z-30 w-full overflow-hidden rounded-t-[2rem]"
      style={{
        background: "#0a0a0a",
        boxShadow: "0 -16px 60px rgba(0,0,0,0.5)",
      }}
    >

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">

        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="text-[9px] uppercase font-mono tracking-[0.55em] mb-5"
            style={{ color: "#EB7300" }}
          >
            What We Do
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-black leading-[1.3] tracking-tight text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
          >
            Expertise That
          </motion.h2>
          <motion.h2
            variants={fadeUp}
            className="font-black leading-[1.3] tracking-tight -mt-[0.15em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", color: "#EB7300" }}
          >
            Drives Growth.
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 mb-20 pb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={staggerContainer}
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="flex flex-col gap-1">
              <span
                className="font-black"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  color: "#EB7300",
                  lineHeight: 1,
                }}
              >
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span
                className="text-[9px] uppercase font-mono tracking-[0.3em]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={staggerContainer}
        >
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.name}
                variants={fadeUp}
                className="group rounded-2xl p-6 cursor-default transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                }}
                whileHover={{
                  borderColor: "rgba(235,115,0,0.3)",
                  background: "rgba(235,115,0,0.05)",
                  y: -4,
                  transition: { duration: 0.25 },
                }}
              >
                <motion.div
                  className="mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon
                    size={26}
                    style={{ color: "#EB7300" }}
                    className="group-hover:drop-shadow-[0_0_8px_rgba(235,115,0,0.6)] transition-all duration-300"
                  />
                </motion.div>
                <h3 className="font-black text-white text-sm mb-2">{svc.name}</h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {svc.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
