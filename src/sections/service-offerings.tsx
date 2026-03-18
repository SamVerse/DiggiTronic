"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Film, Box, Sparkles, Play,
  Share2, TrendingUp,
  Globe, Layers, Smartphone, Gamepad2,
  Target, Users, Link, Mail,
  BarChart2, Hash, Search,
  Video, Languages, Mic, Cpu,
  Palette, Image, Monitor, PenTool, BarChart,
  LucideIcon,
} from "lucide-react";
import type { ServiceOffering } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

/* ── Icon map ────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Film, Box, Sparkles, Play,
  Share2, TrendingUp,
  Globe, Layers, Smartphone, Gamepad2,
  Target, Users, Link, Mail,
  BarChart2, Hash, Search,
  Video, Languages, Mic, Cpu,
  Palette, Image, Monitor, PenTool, BarChart,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function OfferingRow({ offering, index }: { offering: ServiceOffering; index: number }) {
  const Icon = ICON_MAP[offering.icon] ?? Sparkles;

  return (
    <motion.div
      className="offering-row group relative flex items-center gap-6 md:gap-10 py-7 md:py-9 border-b overflow-hidden cursor-default"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Sweep line — runs along bottom border on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, #EB7300, rgba(235,115,0,0.3))" }}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Number */}
      <span
        className="shrink-0 font-mono font-black tabular-nums"
        style={{
          fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
          color: "#EB7300",
          letterSpacing: "0.08em",
          minWidth: "2.2rem",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title + desc */}
      <div className="flex-1 min-w-0">
        <p
          className="font-black text-white transition-colors duration-300 group-hover:text-[#EB7300] leading-tight mb-2"
          style={{ fontSize: "clamp(1.2rem, 2.4vw, 2rem)", letterSpacing: "-0.025em" }}
        >
          {offering.title}
        </p>
        <p
          className="text-xs leading-[1.8] max-w-xl"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          {offering.desc}
        </p>
      </div>

      {/* Icon box */}
      <motion.div
        className="shrink-0 rounded-xl flex items-center justify-center"
        style={{
          width: 48,
          height: 48,
          background: "rgba(235,115,0,0.07)",
          border: "1px solid rgba(235,115,0,0.15)",
        }}
        whileHover={{ rotate: 8, scale: 1.08, borderColor: "rgba(235,115,0,0.4)", background: "rgba(235,115,0,0.12)" }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <Icon size={18} color="#EB7300" />
      </motion.div>

      {/* Arrow — appears on hover */}
      <span
        className="shrink-0 hidden md:block font-black opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ fontSize: "1.2rem", color: "#EB7300" }}
      >
        →
      </span>
    </motion.div>
  );
}

export default function ServiceOfferings({ offerings }: { offerings: ServiceOffering[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!listRef.current) return;
    gsap.from(listRef.current.querySelectorAll(".offering-row"), {
      x: -30,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: listRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <section className="relative w-full" style={{ background: "#0a0a0a" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(235,115,0,0.18), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Header */}
        <motion.div
          className="mb-4"
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
            Services Included
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-4">
            <h2
              className="font-black text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95, letterSpacing: "-0.025em" }}
            >
              What We Offer
            </h2>
            <p
              className="text-[10px] font-mono uppercase tracking-[0.35em]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {offerings.length} services
            </p>
          </motion.div>
        </motion.div>

        {/* Editorial row list */}
        <div
          ref={listRef}
          className="flex flex-col border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {offerings.map((o, i) => (
            <OfferingRow key={o.title} offering={o} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
