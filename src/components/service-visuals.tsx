"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import AiCircuit from "./ai-circuit";
import { VideoVisual3D } from "./video-visual-3d";
import { GraphicsVisual3D } from "./graphics-visual-3d";

const float = (delay = 0, range = 10) => ({
  animate: { y: [0, -range, 0] },
  transition: { duration: 4 + delay * 0.5, repeat: Infinity, ease: "easeInOut" as const, delay },
});

/* ══ 1. VIDEO PRODUCTION — Three.js Iris ═══════════════════════════ */
export function VideoVisual() {
  return (
    <div className="relative w-full" style={{ minHeight: 500 }}>
      <VideoVisual3D />

      {/* REC · Timecode HUD — top, floating just above camera */}
      <motion.div
        className="absolute rounded-lg"
        style={{ top: "14%", right: "10%", background: "rgba(4,8,18,0.92)", border: "1px solid rgba(235,115,0,0.2)", padding: "8px 12px", backdropFilter: "blur(16px)", pointerEvents: "none", boxShadow: "0 0 20px rgba(235,115,0,0.06)" }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ opacity: { delay: 1 }, y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" as const, delay: 1 } }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <motion.div
            animate={{ opacity: [1, 0.1, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff2e2e", boxShadow: "0 0 8px #ff2e2e" }}
          />
          <span style={{ fontSize: 8, color: "rgba(255,60,60,0.9)", fontFamily: "monospace", letterSpacing: "0.2em", fontWeight: 700 }}>REC</span>
          <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ fontSize: 8, color: "#EB7300", fontFamily: "monospace", letterSpacing: "0.12em" }}>4K · 60fps</span>
        </div>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "monospace", letterSpacing: "0.1em", display: "block" }}>TC 00:04:38:12</span>
      </motion.div>

      {/* Audience Retention curve — left of camera */}
      <motion.div
        className="absolute rounded-xl"
        style={{ top: "36%", left: "5%", background: "rgba(4,8,18,0.9)", border: "1px solid rgba(255,255,255,0.07)", padding: "10px 12px", backdropFilter: "blur(16px)", pointerEvents: "none" }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.3 }, x: { delay: 1.3, duration: 0.5 }, y: { duration: 4.1, repeat: Infinity, ease: "easeInOut" as const, delay: 1.3 } }}
      >
        <p style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "monospace", marginBottom: 2 }}>Avg Retention</p>
        <p style={{ fontSize: 16, fontWeight: 900, color: "white", lineHeight: 1, marginBottom: 7 }}>78%</p>
        <svg width="68" height="22" viewBox="0 0 68 22" style={{ display: "block" }}>
          <motion.path d="M0,18 C10,15 14,5 22,7 C30,9 36,8 44,9 C52,10 58,11 68,14"
            fill="none" stroke="rgba(235,115,0,0.65)" strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" as const }}
          />
          <motion.path d="M0,18 C10,15 14,5 22,7 C30,9 36,8 44,9 C52,10 58,11 68,14 L68,22 L0,22 Z"
            fill="rgba(235,115,0,0.07)"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.4 }}
          />
        </svg>
      </motion.div>

      {/* Play count — right of camera */}
      <motion.div
        className="absolute rounded-xl"
        style={{ bottom: "22%", right: "9%", background: "rgba(235,115,0,0.1)", border: "1px solid rgba(235,115,0,0.3)", padding: "10px 14px", backdropFilter: "blur(16px)", pointerEvents: "none" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" as const, delay: 1.6 } }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(235,115,0,0.18)", border: "1px solid rgba(235,115,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 9, color: "#EB7300", marginLeft: 1 }}>▶</span>
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 900, color: "white", lineHeight: 1 }}>1.2M</p>
            <p style={{ fontSize: 8, color: "rgba(235,115,0,0.65)", fontFamily: "monospace", marginTop: 2 }}>Total Views</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


/* ══ 2. SOCIAL MEDIA — Phone Mockup with Feed ═══════════════════════ */
export function SocialVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Mouse tracking ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 85, damping: 20 });
  const smoothY = useSpring(rawY, { stiffness: 85, damping: 20 });

  const rotY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const rotX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  /* Screen spotlight (pixel offsets inside 185×345 phone) */
  const spotL = useTransform(smoothX, [-0.5, 0.5], [25, 160]);
  const spotT = useTransform(smoothY, [-0.5, 0.5], [50, 295]);

  /* Per-badge parallax — each at a different depth */
  const p1x = useTransform(smoothX, [-0.5, 0.5], [14, -14]);   // followers — far
  const p2x = useTransform(smoothX, [-0.5, 0.5], [-11, 11]);   // trending
  const p3x = useTransform(smoothX, [-0.5, 0.5], [8, -8]);     // likes — close
  const p4x = useTransform(smoothX, [-0.5, 0.5], [-13, 13]);   // reach — far
  const p5x = useTransform(smoothX, [-0.5, 0.5], [10, -10]);   // eng rate

  const curX = useMotionValue(-9999);
  const curY = useMotionValue(-9999);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
    curX.set(e.clientX - r.left);
    curY.set(e.clientY - r.top);
  };
  const onLeave = () => {
    rawX.set(0); rawY.set(0);
    curX.set(-9999); curY.set(-9999);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ minHeight: 380, cursor: "none" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(100,80,200,0.07) 0%, transparent 70%)" }}
      />

      {/* Custom cursor — glowing ring */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 26, height: 26, left: 0, top: 0, zIndex: 30,
          x: curX, y: curY, translateX: "-50%", translateY: "-50%",
          border: "1.5px solid rgba(160,130,255,0.55)",
          boxShadow: "0 0 12px rgba(160,130,255,0.25), inset 0 0 6px rgba(160,130,255,0.08)",
        }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 4, height: 4, left: 0, top: 0, zIndex: 31,
          x: curX, y: curY, translateX: "-50%", translateY: "-50%",
          background: "rgba(235,115,0,0.9)",
          boxShadow: "0 0 6px rgba(235,115,0,0.6)",
        }}
      />

      {/* ── Badges — each has positional wrapper (parallax) + inner float ── */}

      {/* +284 Followers — top right */}
      <motion.div style={{ position: "absolute", top: "8%", right: "4%", x: p1x, zIndex: 2 }}>
        <motion.div
          style={{ background: "rgba(235,115,0,0.14)", border: "1px solid rgba(235,115,0,0.3)", borderRadius: 12, padding: "7px 12px", backdropFilter: "blur(8px)" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
          transition={{ opacity: { delay: 1 }, scale: { delay: 1, duration: 0.4 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" as const, delay: 1.5 } }}
        >
          <p style={{ fontSize: 9, color: "rgba(235,115,0,0.85)", fontFamily: "monospace", whiteSpace: "nowrap" }}>🔔 +284 Followers</p>
        </motion.div>
      </motion.div>

      {/* 🔥 Trending — bottom left */}
      <motion.div style={{ position: "absolute", bottom: "14%", left: "3%", x: p2x, zIndex: 2 }}>
        <motion.div
          style={{ background: "rgba(100,80,200,0.14)", border: "1px solid rgba(100,80,200,0.3)", borderRadius: 20, padding: "6px 10px", backdropFilter: "blur(8px)" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 1.5 }, scale: { delay: 1.5, duration: 0.4 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay: 2 } }}
        >
          <p style={{ fontSize: 9, color: "rgba(160,130,255,0.85)", fontFamily: "monospace", whiteSpace: "nowrap" }}>🔥 Trending</p>
        </motion.div>
      </motion.div>

      {/* ★ 12.4k likes — left middle */}
      <motion.div style={{ position: "absolute", top: "42%", left: "2%", x: p3x, zIndex: 2 }}>
        <motion.div
          style={{ background: "rgba(0,180,100,0.12)", border: "1px solid rgba(0,180,100,0.25)", borderRadius: 10, padding: "5px 9px", backdropFilter: "blur(8px)" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
          transition={{ opacity: { delay: 2 }, scale: { delay: 2, duration: 0.4 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const, delay: 2.5 } }}
        >
          <p style={{ fontSize: 9, color: "rgba(0,200,120,0.8)", fontFamily: "monospace", whiteSpace: "nowrap" }}>★ 12.4k likes</p>
        </motion.div>
      </motion.div>

      {/* Reach — top left */}
      <motion.div style={{ position: "absolute", top: "8%", left: "3%", x: p4x, zIndex: 2 }}>
        <motion.div
          style={{ background: "rgba(6,12,22,0.9)", border: "1px solid rgba(130,100,255,0.28)", borderRadius: 12, padding: "7px 11px", backdropFilter: "blur(10px)" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{ opacity: { delay: 0.7 }, scale: { delay: 0.7, duration: 0.4 }, y: { duration: 3.4, repeat: Infinity, ease: "easeInOut" as const, delay: 0.7 } }}
        >
          <p style={{ fontSize: 9, color: "rgba(160,130,255,0.7)", fontFamily: "monospace", marginBottom: 1 }}>Reach</p>
          <p style={{ fontSize: 13, fontWeight: 900, color: "white" }}>890K</p>
        </motion.div>
      </motion.div>

      {/* Engagement Rate — bottom right */}
      <motion.div style={{ position: "absolute", bottom: "10%", right: "3%", x: p5x, zIndex: 2 }}>
        <motion.div
          style={{ background: "rgba(235,115,0,0.1)", border: "1px solid rgba(235,115,0,0.25)", borderRadius: 12, padding: "7px 11px", backdropFilter: "blur(10px)", minWidth: 90 }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, y: [0, 7, 0] }}
          transition={{ opacity: { delay: 2.3 }, scale: { delay: 2.3, duration: 0.4 }, y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" as const, delay: 2.3 } }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
            <p style={{ fontSize: 9, color: "rgba(235,115,0,0.7)", fontFamily: "monospace" }}>Eng. Rate</p>
            <p style={{ fontSize: 10, fontWeight: 900, color: "white" }}>8.4%</p>
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
            <motion.div
              style={{ height: "100%", background: "linear-gradient(90deg, #EB7300, #ff9a00)", borderRadius: 2 }}
              initial={{ width: 0 }} animate={{ width: "84%" }}
              transition={{ delay: 2.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Phone — 3D tilt ── */}
      <motion.div
        style={{
          width: 185, height: 345, borderRadius: "42px",
          border: "2px solid rgba(255,255,255,0.11)", background: "#050d18",
          position: "relative", overflow: "hidden", flexShrink: 0,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.55)",
          rotateY: rotY, rotateX: rotX, transformPerspective: 900,
        }}
        animate={{ y: [0, -9, 0], rotateZ: [-0.4, 0.4, -0.4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <motion.div
          style={{
            position: "absolute", width: 120, height: 120, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(160,130,255,0.14) 0%, transparent 70%)",
            left: spotL, top: spotT, x: "-50%", y: "-50%",
            pointerEvents: "none", zIndex: 8,
          }}
        />

        <div style={{ position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)", width: 58, height: 14, borderRadius: 20, background: "#050d18", zIndex: 10, border: "1px solid rgba(255,255,255,0.06)" }} />

        <div style={{ display: "flex", gap: 5, padding: "30px 10px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)", alignItems: "center" }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div key={i}
              style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${i === 0 ? "#EB7300" : "rgba(255,255,255,0.12)"}`, background: `rgba(235,115,0,${0.1 + i * 0.02})`, flexShrink: 0 }}
              animate={i === 0 ? { borderColor: ["#EB7300", "rgba(235,115,0,0.25)", "#EB7300"] } : {}}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" as const }}
            />
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        </div>

        <div style={{ padding: "8px 10px" }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, rgba(235,115,0,0.5), rgba(235,115,0,0.2))", border: "1px solid rgba(235,115,0,0.3)" }} />
            <div>
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.65)", fontFamily: "monospace", display: "block" }}>@diggitronic</span>
              <span style={{ fontSize: 7, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>2m ago</span>
            </div>
          </div>
          <div style={{ height: 88, borderRadius: 8, background: "linear-gradient(135deg, rgba(235,115,0,0.28), rgba(100,80,200,0.22))", marginBottom: 6, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 38% 38%, rgba(235,115,0,0.18), transparent)" }} />
            <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 8, color: "rgba(235,115,0,0.8)", fontFamily: "monospace" }}>♥ 2.4k</span>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>💬 184</span>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>↗ Share</span>
          </div>
        </div>

        {/* Post 2 — partial */}
        <div style={{ padding: "7px 10px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, rgba(100,80,200,0.5), rgba(100,80,200,0.2))", border: "1px solid rgba(100,80,200,0.3)" }} />
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>@client_brand</span>
          </div>
          <div style={{ height: 52, borderRadius: 8, background: "linear-gradient(135deg, rgba(100,80,200,0.22), rgba(0,180,100,0.12))" }} />
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 44, background: "rgba(5,13,24,0.95)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px" }}>
          {["⌂", "◎", "＋", "♡", "👤"].map((icon, i) => (
            <span key={i} style={{ fontSize: i === 2 ? 14 : 10, color: i === 0 ? "rgba(235,115,0,0.8)" : "rgba(255,255,255,0.2)" }}>{icon}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ══ 3. DEVELOPMENT ═════════════════════════════════════════════════ */
export function DevVisual() {
  const LINES = [
    { text: "import { motion } from 'framer-motion'", color: "rgba(150,120,255,0.8)", indent: 0 },
    { text: "const Page = () => {", color: "rgba(255,255,255,0.6)", indent: 0 },
    { text: "  return (", color: "rgba(255,255,255,0.4)", indent: 1 },
    { text: "    <section className='hero'>", color: "rgba(100,200,100,0.7)", indent: 2 },
    { text: "      <motion.h1", color: "rgba(235,115,0,0.8)", indent: 3 },
    { text: "        animate={{ y: 0 }}", color: "rgba(100,180,255,0.7)", indent: 4 },
    { text: "      />", color: "rgba(235,115,0,0.8)", indent: 3 },
    { text: "    </section>", color: "rgba(100,200,100,0.7)", indent: 2 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 380 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(100,120,255,0.08) 0%, transparent 70%)" }} />

      <motion.div
        className="relative w-full rounded-xl overflow-hidden"
        style={{
          maxWidth: 340,
          background: "rgba(8,12,20,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          transform: "perspective(900px) rotateX(4deg) rotateY(-6deg)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        {...float(0, 10)}
      >
        <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
          <span className="ml-2 text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>page.tsx</span>
        </div>
        <div className="p-4 font-mono text-[10px] leading-[1.8]">
          {LINES.map((l, i) => (
            <motion.div
              key={i}
              className="flex gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: "easeOut" }}
            >
              <span className="shrink-0 w-4 text-right" style={{ color: "rgba(255,255,255,0.15)" }}>{i + 1}</span>
              <span style={{ color: l.color }}>{l.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {[
        { label: "Button", top: "15%", right: "2%", delay: 0.4 },
        { label: "<Card />", bottom: "20%", right: "0%", delay: 0.8 },
        { label: "useScroll()", top: "60%", left: "0%", delay: 1.2 },
      ].map((chip) => (
        <motion.div
          key={chip.label}
          className="absolute rounded-lg px-2.5 py-1.5"
          style={{
            ...chip,
            background: "rgba(235,115,0,0.1)",
            border: "1px solid rgba(235,115,0,0.25)",
            color: "rgba(235,115,0,0.85)",
            fontSize: 9,
            fontFamily: "monospace",
          }}
          {...float(chip.delay, 8)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: chip.delay },
            scale: { delay: chip.delay },
            y: { duration: 3.5 + chip.delay * 0.4, repeat: Infinity, ease: "easeInOut", delay: chip.delay },
          }}
        >
          {chip.label}
        </motion.div>
      ))}

      {/* Build passing — top left */}
      <motion.div
        className="absolute rounded-xl"
        style={{ top: "7%", left: "2%", background: "rgba(6,12,22,0.9)", border: "1px solid rgba(40,200,80,0.3)", padding: "7px 11px", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0, y: [0, -7, 0] }}
        transition={{ opacity: { delay: 0.5 }, x: { delay: 0.5, duration: 0.5 }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 } }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#28c840" /><path d="M3 5l1.5 1.5L7 3.5" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" /></svg>
          <span style={{ fontSize: 9, color: "rgba(40,200,80,0.9)", fontFamily: "monospace", letterSpacing: "0.1em" }}>build passing</span>
        </div>
      </motion.div>

      {/* Lighthouse — bottom left */}
      <motion.div
        className="absolute rounded-xl"
        style={{ bottom: "8%", left: "2%", background: "rgba(6,12,22,0.9)", border: "1px solid rgba(100,120,255,0.25)", padding: "8px 11px", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 4.0, repeat: Infinity, ease: "easeInOut" as const, delay: 1.5 } }}
      >
        <p style={{ fontSize: 9, color: "rgba(100,140,255,0.7)", fontFamily: "monospace", marginBottom: 4 }}>Lighthouse</p>
        <div style={{ display: "flex", gap: 6 }}>
          {[{ v: 99, c: "#28c840" }, { v: 97, c: "#28c840" }, { v: 100, c: "#28c840" }].map(({ v, c }, i) => (
            <motion.div key={i} style={{ textAlign: "center" }}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + i * 0.1 }}
            >
              <p style={{ fontSize: 12, fontWeight: 900, color: c, lineHeight: 1 }}>{v}</p>
              <p style={{ fontSize: 7, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{["Perf","Acc","SEO"][i]}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ══ 4. MARKETING ═══════════════════════════════════════════════════ */
export function MarketingVisual() {
  const bars = [
    { h: 45, delay: 0 },
    { h: 65, delay: 0.1 },
    { h: 55, delay: 0.2 },
    { h: 80, delay: 0.3 },
    { h: 70, delay: 0.4 },
    { h: 95, delay: 0.5 },
    { h: 88, delay: 0.6 },
  ];
  const spark = [30, 48, 38, 62, 55, 78, 95];

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 420 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(235,115,0,0.07) 0%, transparent 70%)" }} />

      {/* ── Dashboard card ── */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          width: 280,
          background: "rgba(8,16,26,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
        {...float(0, 10)}
      >
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Campaign Performance</span>
          <span className="text-[10px] font-black" style={{ color: "#EB7300" }}>↑ 4.2x ROAS</span>
        </div>
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-end gap-2" style={{ height: 100 }}>
            {bars.map((b, i) => (
              <motion.div key={i} className="flex-1 rounded-t-sm"
                style={{ height: `${b.h}%`, background: i === bars.length - 1 ? "linear-gradient(to top, #EB7300, #ff9a00)" : `rgba(235,115,0,${0.18 + i * 0.05})`, originY: 1 }}
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                transition={{ delay: 0.3 + b.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
          <div className="h-px mt-1" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
        <div className="grid grid-cols-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          {[{ label: "CTR", value: "3.8%" }, { label: "Leads", value: "284" }, { label: "Cost/Lead", value: "$12" }].map((m, i) => (
            <div key={m.label} className="px-3 py-3 text-center" style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <p className="font-black text-white text-sm">{m.value}</p>
              <p className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>{m.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── LIVE Campaign badge — top left ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ top: "5%", left: "3%", background: "rgba(6,12,22,0.92)", border: "1px solid rgba(255,65,65,0.25)", padding: "7px 11px", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{ opacity: { delay: 0.5 }, x: { delay: 0.5, duration: 0.5 }, y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <motion.div
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.3, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff4444", boxShadow: "0 0 6px #ff4444" }}
          />
          <span style={{ fontSize: 8, color: "rgba(255,100,100,0.8)", fontFamily: "monospace", letterSpacing: "0.15em" }}>LIVE</span>
        </div>
        <p style={{ fontSize: 11, fontWeight: 900, color: "white", lineHeight: 1.2 }}>3 Active Ads</p>
      </motion.div>

      {/* ── Conversions — top right ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ top: "5%", right: "3%", background: "rgba(235,115,0,0.12)", border: "1px solid rgba(235,115,0,0.32)", padding: "8px 12px", backdropFilter: "blur(10px)" }}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{ opacity: { delay: 0.8 }, x: { delay: 0.8, duration: 0.5 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }}
      >
        <p style={{ fontSize: 9, color: "rgba(235,115,0,0.75)", fontFamily: "monospace" }}>Conversions</p>
        <p style={{ fontSize: 14, fontWeight: 900, color: "white" }}>↑ 184%</p>
      </motion.div>

      {/* ── Impressions + sparkline — mid left ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ top: "40%", left: "2%", background: "rgba(60,100,200,0.1)", border: "1px solid rgba(80,120,255,0.22)", padding: "8px 11px", backdropFilter: "blur(10px)" }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0, y: [0, 7, 0] }}
        transition={{ opacity: { delay: 1.1 }, x: { delay: 1.1, duration: 0.5 }, y: { duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 1.1 } }}
      >
        <p style={{ fontSize: 9, color: "rgba(100,150,255,0.75)", fontFamily: "monospace", marginBottom: 4 }}>Impressions</p>
        <p style={{ fontSize: 13, fontWeight: 900, color: "white", marginBottom: 5 }}>2.4M</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14 }}>
          {spark.map((h, i) => (
            <motion.div key={i} style={{ width: 3, borderRadius: 1, background: i === spark.length - 1 ? "#6090ff" : "rgba(80,120,255,0.4)" }}
              initial={{ height: 0 }} animate={{ height: `${h}%` }}
              transition={{ delay: 1.3 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Revenue — bottom right, green ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ bottom: "14%", right: "3%", background: "rgba(0,180,100,0.1)", border: "1px solid rgba(0,200,120,0.25)", padding: "8px 12px", backdropFilter: "blur(10px)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -9, 0] }}
        transition={{ opacity: { delay: 1.3 }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.3 } }}
      >
        <p style={{ fontSize: 9, color: "rgba(0,200,120,0.75)", fontFamily: "monospace" }}>Revenue Growth</p>
        <p style={{ fontSize: 13, fontWeight: 900, color: "white" }}>+$42K ↗</p>
      </motion.div>

      {/* ── Email CTR progress — bottom left ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ bottom: "8%", left: "3%", background: "rgba(120,60,200,0.1)", border: "1px solid rgba(150,80,255,0.22)", padding: "8px 11px", backdropFilter: "blur(10px)", minWidth: 98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
      >
        <div className="flex items-center justify-between mb-2">
          <p style={{ fontSize: 9, color: "rgba(170,110,255,0.75)", fontFamily: "monospace" }}>Email CTR</p>
          <p style={{ fontSize: 10, fontWeight: 900, color: "white" }}>24.6%</p>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
          <motion.div
            style={{ height: "100%", background: "linear-gradient(90deg, #7840ff, #b06aff)", borderRadius: 2 }}
            initial={{ width: 0 }}
            animate={{ width: "62%" }}
            transition={{ delay: 1.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ══ 5. SEO ════════════════════════════════════════════════════════ */
export function SeoVisual() {
  const positions = ["#5", "#4", "#3", "#2", "#1"];

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 380 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,180,100,0.07) 0%, transparent 70%)" }} />

      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          width: 280,
          background: "rgba(8,16,26,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
        {...float(0, 8)}
      >
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Search Rankings</span>
          <span className="text-[10px] font-mono" style={{ color: "rgba(0,200,120,0.8)" }}>↑ Climbing</span>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-end justify-center gap-2 mb-4">
            {positions.map((pos, i) => {
              const isTop = i === 4;
              const height = 24 + i * 14;
              return (
                <motion.div
                  key={pos}
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="rounded-t-sm w-8 flex items-end justify-center pb-1"
                    style={{
                      height,
                      background: isTop
                        ? "linear-gradient(to top, #EB7300, #ff9a00)"
                        : `rgba(235,115,0,${0.1 + i * 0.06})`,
                    }}
                  >
                    {isTop && (
                      <span className="text-[8px] font-black text-white">★</span>
                    )}
                  </div>
                  <span
                    className="text-[9px] font-mono"
                    style={{ color: isTop ? "#EB7300" : "rgba(255,255,255,0.3)" }}
                  >
                    {pos}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {[
            { width: "90%", label: "your-brand.com  ★ Position 1" },
            { width: "80%", label: "competitor.com    Position 2" },
          ].map((r, i) => (
            <div key={i} className="mb-2 px-3 py-2 rounded-lg" style={{
              background: i === 0 ? "rgba(235,115,0,0.07)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${i === 0 ? "rgba(235,115,0,0.2)" : "rgba(255,255,255,0.04)"}`,
            }}>
              <div className="h-1.5 rounded-full mb-1" style={{ background: i === 0 ? "rgba(235,115,0,0.5)" : "rgba(255,255,255,0.12)", width: r.width }} />
              <span className="text-[9px] font-mono" style={{ color: i === 0 ? "rgba(235,115,0,0.7)" : "rgba(255,255,255,0.2)" }}>{r.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Keyword Traffic — top left ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ top: "5%", left: "2%", background: "rgba(0,180,100,0.1)", border: "1px solid rgba(0,180,100,0.25)", padding: "8px 12px", backdropFilter: "blur(10px)" }}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{ opacity: { delay: 0.6 }, x: { delay: 0.6, duration: 0.5 }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 } }}
      >
        <p style={{ fontSize: 9, color: "rgba(0,200,120,0.75)", fontFamily: "monospace" }}>Keyword Traffic</p>
        <p style={{ fontSize: 14, fontWeight: 900, color: "white" }}>+300%</p>
      </motion.div>

      {/* ── Domain Authority — top right ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ top: "5%", right: "2%", background: "rgba(90,120,255,0.1)", border: "1px solid rgba(100,130,255,0.28)", padding: "8px 12px", backdropFilter: "blur(10px)" }}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0, y: [0, -9, 0] }}
        transition={{ opacity: { delay: 0.9 }, x: { delay: 0.9, duration: 0.5 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 } }}
      >
        <p style={{ fontSize: 9, color: "rgba(120,150,255,0.75)", fontFamily: "monospace", marginBottom: 4 }}>Domain Authority</p>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(100,130,255,0.15)" strokeWidth="2.5" />
            <motion.circle cx="14" cy="14" r="11" fill="none" stroke="#7a9cff" strokeWidth="2.5"
              strokeLinecap="round" strokeDasharray="69.1"
              initial={{ strokeDashoffset: 69.1 }}
              animate={{ strokeDashoffset: 18.5 }}
              transition={{ delay: 1.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "14px 14px", transform: "rotate(-90deg)" }}
            />
          </svg>
          <p style={{ fontSize: 15, fontWeight: 900, color: "white", lineHeight: 1 }}>73<span style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", fontWeight: 400, marginLeft: 2 }}>/100</span></p>
        </div>
      </motion.div>

      {/* ── Backlinks — mid left ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ top: "42%", left: "1%", background: "rgba(235,115,0,0.09)", border: "1px solid rgba(235,115,0,0.22)", padding: "8px 11px", backdropFilter: "blur(10px)" }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0, y: [0, 7, 0] }}
        transition={{ opacity: { delay: 1.1 }, x: { delay: 1.1, duration: 0.5 }, y: { duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 1.1 } }}
      >
        <p style={{ fontSize: 9, color: "rgba(235,115,0,0.75)", fontFamily: "monospace", marginBottom: 2 }}>Backlinks</p>
        <p style={{ fontSize: 13, fontWeight: 900, color: "white", marginBottom: 5 }}>12.8K</p>
        <div style={{ display: "flex", gap: 3 }}>
          {[1,1,1,1,1,0.4,0.2,0.1].map((op, i) => (
            <motion.div key={i}
              style={{ width: 5, height: 5, borderRadius: "50%", background: `rgba(235,115,0,${op})` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3 + i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Core Web Vitals — mid right ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ top: "42%", right: "1%", background: "rgba(6,12,22,0.9)", border: "1px solid rgba(0,200,120,0.22)", padding: "8px 11px", backdropFilter: "blur(12px)", minWidth: 96 }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{ opacity: { delay: 1.3 }, x: { delay: 1.3, duration: 0.5 }, y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.3 } }}
      >
        <p style={{ fontSize: 9, color: "rgba(0,200,120,0.7)", fontFamily: "monospace", marginBottom: 5, letterSpacing: "0.1em" }}>Core Web Vitals</p>
        {[{ label: "LCP", score: "Good", color: "#00c878" }, { label: "FID", score: "Good", color: "#00c878" }, { label: "CLS", score: "Pass", color: "#4ade80" }].map((v) => (
          <div key={v.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 3 }}>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>{v.label}</span>
            <motion.span
              style={{ fontSize: 8, color: v.color, fontFamily: "monospace", fontWeight: 700 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >{v.score}</motion.span>
          </div>
        ))}
      </motion.div>

      {/* ── Organic Sessions — bottom left ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ bottom: "8%", left: "2%", background: "rgba(0,160,200,0.1)", border: "1px solid rgba(0,180,220,0.22)", padding: "8px 12px", backdropFilter: "blur(10px)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
      >
        <p style={{ fontSize: 9, color: "rgba(0,200,230,0.7)", fontFamily: "monospace" }}>Organic Sessions</p>
        <p style={{ fontSize: 13, fontWeight: 900, color: "white" }}>48.2K <span style={{ fontSize: 9, color: "#00c8e2", fontWeight: 700 }}>↑</span></p>
      </motion.div>

      {/* ── Page Speed — bottom right ── */}
      <motion.div
        className="absolute rounded-xl"
        style={{ bottom: "8%", right: "2%", background: "rgba(120,60,200,0.09)", border: "1px solid rgba(150,80,255,0.22)", padding: "8px 11px", backdropFilter: "blur(10px)", minWidth: 90 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -9, 0] }}
        transition={{ opacity: { delay: 1.7 }, y: { duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 1.7 } }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
          <p style={{ fontSize: 9, color: "rgba(170,110,255,0.75)", fontFamily: "monospace" }}>Page Speed</p>
          <p style={{ fontSize: 11, fontWeight: 900, color: "white" }}>96</p>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
          <motion.div
            style={{ height: "100%", background: "linear-gradient(90deg, #7840ff, #c060ff)", borderRadius: 2 }}
            initial={{ width: 0 }}
            animate={{ width: "96%" }}
            transition={{ delay: 1.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ══ 6. AI SERVICES ════════════════════════════════════════════════ */
export function AiVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 500 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 45% at 50% 40%, rgba(100,100,255,0.09) 0%, transparent 70%)" }} />
      <div style={{ width: "100%", height: 500 }}>
        <AiCircuit />
      </div>
    </div>
  );
}

/* ══ 7. GRAPHICS & ANIMATION ════════════════════════════════════════ */
export function GraphicsVisual() {
  return <GraphicsVisual3D />;
}


export const SERVICE_VISUALS: Record<string, React.ComponentType> = {
  video: VideoVisual,
  social: SocialVisual,
  dev: DevVisual,
  marketing: MarketingVisual,
  seo: SeoVisual,
  ai: AiVisual,
  graphics: GraphicsVisual,
};
