"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { UseCase } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

type CardSpan = { col: string; minH: number };
type LayoutConfig = { gridClass: string; spans: CardSpan[]; accent: string };

const LAYOUT_CONFIGS: Record<string, LayoutConfig> = {
  /* Cinematic horizontal — large+small alternation */
  "video-production": {
    gridClass: "grid-cols-5",
    spans: [
      { col: "col-span-5 md:col-span-3", minH: 300 },
      { col: "col-span-5 md:col-span-2", minH: 260 },
      { col: "col-span-5 md:col-span-2", minH: 260 },
      { col: "col-span-5 md:col-span-3", minH: 240 },
    ],
    accent: "#EB7300",
  },
  /* Story/vertical — tall hero + compact tiles + wide footer */
  "social-media": {
    gridClass: "grid-cols-4",
    spans: [
      { col: "col-span-4 md:col-span-2", minH: 320 },
      { col: "col-span-2 md:col-span-1", minH: 240 },
      { col: "col-span-2 md:col-span-1", minH: 240 },
      { col: "col-span-4",               minH: 200 },
    ],
    accent: "#a855f7",
  },
  /* Technical precision — symmetrical top row, asymmetric bottom */
  "development": {
    gridClass: "grid-cols-4",
    spans: [
      { col: "col-span-4 md:col-span-2", minH: 280 },
      { col: "col-span-4 md:col-span-2", minH: 280 },
      { col: "col-span-4 md:col-span-1", minH: 240 },
      { col: "col-span-4 md:col-span-3", minH: 240 },
    ],
    accent: "#60a5fa",
  },
  /* Campaign dashboard — full-width hero + three equal panels */
  "marketing": {
    gridClass: "grid-cols-3",
    spans: [
      { col: "col-span-3",               minH: 260 },
      { col: "col-span-3 md:col-span-1", minH: 240 },
      { col: "col-span-3 md:col-span-1", minH: 240 },
      { col: "col-span-3 md:col-span-1", minH: 240 },
    ],
    accent: "#10b981",
  },
  /* Organic ranking — mirrored chevron */
  "seo": {
    gridClass: "grid-cols-5",
    spans: [
      { col: "col-span-5 md:col-span-2", minH: 280 },
      { col: "col-span-5 md:col-span-3", minH: 240 },
      { col: "col-span-5 md:col-span-3", minH: 240 },
      { col: "col-span-5 md:col-span-2", minH: 280 },
    ],
    accent: "#22c55e",
  },
  /* Neural panel — three tall columns + full-width base */
  "ai-services": {
    gridClass: "grid-cols-4",
    spans: [
      { col: "col-span-4 md:col-span-1", minH: 280 },
      { col: "col-span-4 md:col-span-2", minH: 280 },
      { col: "col-span-4 md:col-span-1", minH: 280 },
      { col: "col-span-4",               minH: 200 },
    ],
    accent: "#818cf8",
  },
  /* Creative collage — opposing tall/wide rhythm */
  "graphics-animation": {
    gridClass: "grid-cols-5",
    spans: [
      { col: "col-span-5 md:col-span-2", minH: 320 },
      { col: "col-span-5 md:col-span-3", minH: 240 },
      { col: "col-span-5 md:col-span-3", minH: 240 },
      { col: "col-span-5 md:col-span-2", minH: 320 },
    ],
    accent: "#f59e0b",
  },
};

const DEFAULT_LAYOUT: LayoutConfig = {
  gridClass: "grid-cols-5",
  spans: [
    { col: "col-span-5 md:col-span-3", minH: 280 },
    { col: "col-span-5 md:col-span-2", minH: 240 },
    { col: "col-span-5 md:col-span-2", minH: 240 },
    { col: "col-span-5 md:col-span-3", minH: 240 },
  ],
  accent: "#EB7300",
};

function UseCaseCard({
  useCase,
  index,
  isHovered,
  accentColor,
  spanConfig,
  onHover,
  onLeave,
}: {
  useCase: UseCase;
  index: number;
  isHovered: boolean | null;
  accentColor: string;
  spanConfig: CardSpan;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [on, setOn] = useState(false);

  return (
    <motion.div
      className={`use-case-card relative rounded-2xl overflow-hidden col-span-full ${spanConfig.col}`}
      style={{
        minHeight: spanConfig.minH,
        background: useCase.gradient,
        border: "1px solid rgba(255,255,255,0.07)",
        opacity: isHovered === false ? 0.35 : 1,
        transition: "opacity 0.4s ease",
        cursor: "default",
      }}
      onMouseEnter={() => { setOn(true); onHover(); }}
      onMouseLeave={() => { setOn(false); onLeave(); }}
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)" }}
        animate={{ opacity: on ? 0.55 : 1 }}
        transition={{ duration: 0.35 }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 90% 55% at 50% 90%, ${accentColor}1c 0%, transparent 65%)` }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.45 }}
      />

      {/* Scan-line — fast on hover, slow loop at rest */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 h-full"
          style={{ width: "45%", background: `linear-gradient(90deg, transparent, ${accentColor}cc, transparent)` }}
          animate={on
            ? { x: ["−100%", "350%"] }
            : { x: ["−100%", "350%"] }
          }
          transition={on
            ? { duration: 0.65, ease: "easeInOut" }
            : { duration: 2.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 3.5 + index * 0.9 }
          }
        />
      </div>

      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)` }}
        animate={{ opacity: on ? 1 : 0, scaleY: on ? 1 : 0.2 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="absolute top-6 left-7 flex items-center gap-3 z-10">
        <motion.span
          className="font-black font-mono"
          style={{ fontSize: "0.65rem", letterSpacing: "0.12em" }}
          animate={{ color: on ? accentColor : "#EB7300" }}
          transition={{ duration: 0.3 }}
        >
          0{index + 1}
        </motion.span>
        <div className="w-px h-3" style={{ background: "rgba(255,255,255,0.15)" }} />
        <span className="font-mono uppercase" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em" }}>
          Application
        </span>
      </div>

      <motion.div
        className="absolute top-3 right-5 font-black select-none pointer-events-none"
        style={{ fontSize: "clamp(4rem, 8vw, 7rem)", lineHeight: 1, letterSpacing: "-0.05em" }}
        animate={{ color: on ? `${accentColor}22` : "rgba(255,255,255,0.035)" }}
        transition={{ duration: 0.4 }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* ── REST STATE — title + hint ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-7"
        animate={{ y: on ? -12 : 0, opacity: on ? 0 : 1 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      >
        <h3
          className="font-black text-white"
          style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          {useCase.title}
        </h3>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: accentColor, opacity: 0.85 }}>
          Hover to explore →
        </p>
      </motion.div>

      {/* ── HOVER PANEL — slides up from bottom ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 h-full flex flex-col justify-end"
        style={{
          background: "rgba(0,5,15,0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: `1px solid ${accentColor}28`,
        }}
        initial={{ y: "100%" }}
        animate={{ y: on ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 520, damping: 44 }}
      >
        <div className="p-7">
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full"
            style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
            animate={{ opacity: on ? 1 : 0, x: on ? 0 : -10 }}
            transition={{ delay: 0.08, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: accentColor }}>
              0{index + 1} — Use Case
            </span>
          </motion.div>

          <motion.h3
            className="font-black text-white mb-3"
            style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", letterSpacing: "-0.025em", lineHeight: 1.05 }}
            animate={{ opacity: on ? 1 : 0, y: on ? 0 : 12 }}
            transition={{ delay: 0.06, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            {useCase.title}
          </motion.h3>

          <motion.p
            className="text-xs leading-[1.9] max-w-sm"
            style={{ color: "rgba(255,255,255,0.52)" }}
            animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }}
            transition={{ delay: 0.14, duration: 0.38, ease: "easeOut" }}
          >
            {useCase.desc}
          </motion.p>

          <motion.div
            className="mt-5 h-px rounded-full"
            style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)`, originX: 0 }}
            animate={{ scaleX: on ? 1 : 0 }}
            transition={{ delay: 0.22, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServiceUseCases({ useCases, slug }: { useCases: UseCase[]; slug: string }) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const layout = LAYOUT_CONFIGS[slug] ?? DEFAULT_LAYOUT;

  useGSAP(() => {
    if (!cardsRef.current) return;
    gsap.from(cardsRef.current.querySelectorAll(".use-case-card"), {
      y: 50,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: cardsRef.current,
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p
            className="text-[9px] font-mono uppercase tracking-[0.55em] mb-4"
            style={{ color: layout.accent }}
          >
            Applications
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              className="font-black text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95, letterSpacing: "-0.025em" }}
            >
              Where we apply it
            </h2>
            <p className="text-[12px] font-mono uppercase tracking-[0.3em]" style={{ color: layout.accent, opacity: 0.85 }}>
              Hover to explore
            </p>
          </div>
        </motion.div>

        <div ref={cardsRef} className={`grid gap-4 ${layout.gridClass}`}>
          {useCases.map((uc, i) => (
            <UseCaseCard
              key={uc.title}
              useCase={uc}
              index={i}
              isHovered={hoveredIndex === null ? null : hoveredIndex === i ? true : false}
              accentColor={layout.accent}
              spanConfig={layout.spans[i] ?? layout.spans[0]}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
