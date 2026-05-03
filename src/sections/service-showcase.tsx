"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import type { ServiceData } from "@/data/services";

const SHOWCASE_ITEMS = [
  {
    label: "Brand Identity Rollout",
    cat: "Branding",
    metric: "+340%",
    metricLabel: "Brand Recognition",
    weeks: "6 weeks",
    result: "Exceptional",
    color: "rgba(160,50,220,0.45)",
    barWidth: 0.78,
  },
  {
    label: "Performance Campaign",
    cat: "Marketing",
    metric: "4.8x",
    metricLabel: "Return on Ad Spend",
    weeks: "3 months",
    result: "Outstanding",
    color: "rgba(0,160,180,0.45)",
    barWidth: 0.92,
  },
  {
    label: "Social Growth Engine",
    cat: "Social",
    metric: "2.4M",
    metricLabel: "Total Impressions",
    weeks: "90 days",
    result: "Viral",
    color: "rgba(50,110,255,0.45)",
    barWidth: 0.65,
  },
  {
    label: "SEO Authority Build",
    cat: "SEO",
    metric: "#1",
    metricLabel: "Search Position",
    weeks: "6 months",
    result: "Dominant",
    color: "rgba(50,220,100,0.45)",
    barWidth: 0.88,
  },
  {
    label: "Full Stack Product",
    cat: "Dev",
    metric: "99/100",
    metricLabel: "Performance Score",
    weeks: "12 weeks",
    result: "Perfect",
    color: "rgba(220,50,120,0.45)",
    barWidth: 0.99,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const MOCKUP_ROWS = [
  { w: "85%", opacity: 0.18 },
  { w: "70%", opacity: 0.12 },
  { w: "55%", opacity: 0.09 },
];

function ShowcaseCard({
  item,
  index,
}: {
  item: (typeof SHOWCASE_ITEMS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 20);
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 20);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: "900px",
        minWidth: 290,
        flexShrink: 0,
      }}
      className="group rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
      whileHover={{ borderColor: "rgba(235,115,0,0.35)" }}
    >
      <div
        style={{
          height: 360,
          background: `linear-gradient(155deg, ${item.color}, rgba(15,20,30,0.5))`,
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.5rem",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px)
            `,
            pointerEvents: "none",
          }}
        />

        {/* ── TOP AREA (55%) ── */}
        <div style={{ flex: "0 0 55%", padding: "1.5rem 1.5rem 1rem", position: "relative" }}>
          <div
            style={{
              height: 3,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 2,
              marginBottom: "1.2rem",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #EB7300, #EB7300)",
                borderRadius: 2,
                originX: 0,
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: item.barWidth }}
              viewport={{ once: false }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: "1.2rem" }}>
            {MOCKUP_ROWS.map((row, ri) => (
              <div
                key={ri}
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: `rgba(255,255,255,${row.opacity})`,
                  width: row.w,
                }}
              />
            ))}
          </div>

          <div>
            <span
              style={{
                display: "block",
                fontWeight: 900,
                color: "#EB7300",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.2,
                marginBottom: 4,
              }}
            >
              {item.metric}
            </span>
            <span
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {item.metricLabel}
            </span>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 1.5rem" }} />

        {/* ── BOTTOM PANEL (45%) ── */}
        <div
          style={{
            flex: "1",
            padding: "1rem 1.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <span
              style={{
                fontSize: 8,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#EB7300",
                background: "rgba(235,115,0,0.1)",
                border: "1px solid rgba(235,115,0,0.25)",
                padding: "3px 8px",
                borderRadius: 20,
              }}
            >
              {item.cat}
            </span>
          </div>

          <p
            style={{
              fontWeight: 900,
              color: "#ffffff",
              fontSize: "1rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            {item.label}
          </p>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
            {[item.weeks, item.result].map((pill, pi) => (
              <span
                key={pi}
                style={{
                  fontSize: 8,
                  fontFamily: "monospace",
                  color: "rgba(255,255,255,0.4)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "3px 8px",
                  borderRadius: 20,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
            <span
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.3em",
              }}
            >
              {String(index + 1).padStart(2, "0")} /
            </span>
            <motion.div
              style={{
                height: 2,
                background: "#EB7300",
                borderRadius: 1,
                flex: 1,
                originX: 0,
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + index * 0.05 }}
            />
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(235,115,0,0.07) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ServiceShowcase({ service }: { service: ServiceData }) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <motion.div
          className="mb-14"
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
            Our Work
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-4">
            <h2
              className="font-black text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95, letterSpacing: "-0.025em" }}
            >
              Featured showcase
            </h2>
            <p
              className="text-[10px] font-mono uppercase tracking-[0.4em]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              ← drag to explore →
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Drag carousel — outside container for full bleed */}
      <div className="pb-24 md:pb-32 overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex w-max gap-5 pl-6 md:pl-20"
          drag="x"
          dragConstraints={containerRef}
          style={{ x, cursor: isDragging ? "grabbing" : "grab" }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileTap={{ cursor: "grabbing" }}
        >
          {SHOWCASE_ITEMS.map((item, i) => (
            <ShowcaseCard key={i} item={item} index={i} />
          ))}
          <div style={{ minWidth: 48, flexShrink: 0 }} />
        </motion.div>
      </div>

      {/* Left/Right fade edges */}
      <div
        className="absolute top-0 left-0 bottom-0 w-12 pointer-events-none"
        style={{ background: "linear-gradient(to right, #050505, transparent)" }}
      />
      <div
        className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none"
        style={{ background: "linear-gradient(to left, #050505, transparent)" }}
      />
    </section>
  );
}
