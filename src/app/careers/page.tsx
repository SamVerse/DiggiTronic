"use client";

import { useRef, useEffect } from "react";
import { motion, Variants, useScroll, useTransform, useMotionValue, useSpring, useInView, animate as framAnimate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { JOBS } from "@/data/jobs";

gsap.registerPlugin(ScrollTrigger);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const HERO_LINES = [
  { words: ["BUILD", "THE", "FUTURE"], orange: false },
  { words: ["OF", "DIGITAL"], orange: false },
  { words: ["WITH", "US."], orange: true },
];

const PILLARS = [
  { num: "01", label: "Creative Freedom", desc: "Your ideas shape outcomes. Always." },
  { num: "02", label: "Collaboration First", desc: "Small teams, big impact, loud voices." },
  { num: "03", label: "Growth Mindset", desc: "Learning budgets and room to evolve." },
  { num: "04", label: "Ship Fast, Ship Bold", desc: "We bias toward action, not perfection." },
];

const HIGHLIGHT_CARDS = [
  {
    id: "projects", stat: 150, suffix: "+", label: "Projects Delivered",
    desc: "Across branding, development, marketing, and AI — shipped for real clients with real outcomes.",
  },
  {
    id: "years", stat: 5, suffix: "+", label: "Years in the Industry",
    desc: "A proven track record of helping brands grow, stand out, and scale in competitive markets.",
  },
  {
    id: "clients", stat: 40, suffix: "+", label: "Happy Clients",
    desc: "From funded startups to established companies — brands that trust us to deliver.",
  },
  {
    id: "sat", stat: 98, suffix: "%", label: "Client Satisfaction",
    desc: "We don't just deliver work — we deliver outcomes our clients come back for.",
  },
  {
    id: "fullsvc", label: "Full-Service Agency",
    desc: "Design, development, digital marketing, and AI solutions — all under one roof, one team, one vision.",
  },
  {
    id: "speed", label: "Fast & Focused Execution",
    desc: "We move at startup speed without sacrificing quality. Strategy into execution, faster than you expect.",
  },
];

const WHY_JOIN = [
  {
    num: "01",
    title: "Ownership & Impact",
    desc: "You own your deliverables end-to-end, and see the real-world impact of everything you ship.",
  },
  {
    num: "02",
    title: "Impactful Projects",
    desc: "Every deliverable you produce powers real growth for real brands.",
  },
  {
    num: "03",
    title: "Growth Opportunities",
    desc: "Learning budgets, mentorship, and a clear path to level up.",
  },
  {
    num: "04",
    title: "Tight-Knit Teams",
    desc: "Small, talented squads where every voice is heard and valued.",
  },
  {
    num: "05",
    title: "Flexible Work Culture",
    desc: "Remote-first with the flexibility to do your best work, your way.",
  },
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

function JobCard({ slug, title, department, location, type, experience }: {
  slug: string; title: string; department: string;
  location: string; type: string; experience: string;
}) {
  return (
    <motion.div
      className="job-card flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6"
      whileHover={{ y: -6, borderColor: "rgba(235,115,0,0.3)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex flex-col gap-1">
        <p className="font-black text-white text-lg leading-tight">{title}</p>
        <p className="text-[9px] font-mono uppercase tracking-[0.45em]" style={{ color: "rgba(255,255,255,0.35)" }}>
          {department}
          <span className="inline-block mx-2" style={{ color: "#EB7300" }}>·</span>
          {location}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[type, experience].map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-mono uppercase tracking-[0.35em] rounded-full px-3 py-1 border"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <Link
          href={`/careers/${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] transition-opacity hover:opacity-70"
          style={{ color: "#EB7300" }}
        >
          View Role
          <span className="text-base leading-none">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function CareersPage() {
  const heroRef = useRef<HTMLElement>(null);
  const cultureSectionRef = useRef<HTMLElement>(null);
  const gridSectionRef = useRef<HTMLElement>(null);
  const whySectionRef = useRef<HTMLElement>(null);
  const jobsSectionRef = useRef<HTMLElement>(null);

  const cultureCardsRef = useRef<HTMLDivElement>(null);
  const gridCardsRef = useRef<HTMLDivElement>(null);
  const whyCardsRef = useRef<HTMLDivElement>(null);
  const jobCardsRef = useRef<HTMLDivElement>(null);

  /* ── Hero parallax ── */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0vh", "40vh"]);
  const heroFilter = useTransform(heroProgress, [0, 1], ["brightness(1)", "brightness(0.4)"]);

  /* ── Culture parallax ── */
  const { scrollYProgress: cultureProgress } = useScroll({
    target: cultureSectionRef,
    offset: ["end end", "end start"],
  });
  const cultureY = useTransform(cultureProgress, [0, 1], ["0vh", "40vh"]);
  const cultureFilter = useTransform(cultureProgress, [0, 1], ["brightness(1)", "brightness(0.4)"]);

  /* ── Highlight grid parallax ── */
  const { scrollYProgress: gridProgress } = useScroll({
    target: gridSectionRef,
    offset: ["end end", "end start"],
  });
  const gridY = useTransform(gridProgress, [0, 1], ["0vh", "40vh"]);

  /* ── Why Join parallax ── */
  const { scrollYProgress: whyProgress } = useScroll({
    target: whySectionRef,
    offset: ["end end", "end start"],
  });
  const whyY = useTransform(whyProgress, [0, 1], ["0vh", "40vh"]);

  /* ── Jobs parallax ── */
  const { scrollYProgress: jobsProgress } = useScroll({
    target: jobsSectionRef,
    offset: ["end end", "end start"],
  });
  const jobsY = useTransform(jobsProgress, [0, 1], ["0vh", "40vh"]);

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springGlowX = useSpring(glowX, { stiffness: 60, damping: 20 });
  const springGlowY = useSpring(glowY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      glowX.set(((e.clientX - cx) / cx) * 40);
      glowY.set(((e.clientY - cy) / cy) * 24);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [glowX, glowY]);

  useGSAP(() => {
    if (cultureCardsRef.current) {
      gsap.from(cultureCardsRef.current.querySelectorAll(".pillar-card"), {
        y: 50, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: cultureCardsRef.current, start: "top 80%", toggleActions: "play reverse play reverse" },
      });
    }
    if (gridCardsRef.current) {
      gsap.from(gridCardsRef.current.querySelectorAll(".highlight-card"), {
        y: 60, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: gridCardsRef.current, start: "top 85%", toggleActions: "play reverse play reverse" },
      });
    }
    if (whyCardsRef.current) {
      gsap.from(whyCardsRef.current.querySelectorAll(".why-card"), {
        y: 60, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: whyCardsRef.current, start: "top 80%", toggleActions: "play reverse play reverse" },
      });
    }
    if (jobCardsRef.current) {
      gsap.from(jobCardsRef.current.querySelectorAll(".job-card"), {
        y: 60, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: jobCardsRef.current, start: "top 80%", toggleActions: "play reverse play reverse" },
      });
    }
  }, []);

  return (
    <>
      <LenisScroll />
      <Navbar />
      <main className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>

        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <motion.section
          ref={heroRef}
          className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden z-0"
          style={{ paddingTop: "6rem", paddingBottom: "4rem", y: heroY, filter: heroFilter }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{
                x: springGlowX,
                y: springGlowY,
                background: "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(235,115,0,0.10) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 72px),
                  repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 72px)
                `,
              }}
            />
          </div>

          <div className="relative z-10 px-6 max-w-6xl mx-auto">
            <motion.p
              className="text-[9px] font-mono uppercase tracking-[0.6em] mb-8"
              style={{ color: "#EB7300" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Join the Team
            </motion.p>

            <div className="mb-8">
              {HERO_LINES.map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <div
                    className="font-black flex flex-wrap justify-center gap-x-[0.25em] leading-[0.9]"
                    style={{ fontSize: "clamp(2.2rem, 5.5vw, 6rem)", letterSpacing: "-0.03em" }}
                  >
                    {line.words.map((word, wi) => {
                      const isLast = li === HERO_LINES.length - 1 && wi === line.words.length - 1;
                      const wordIdx = HERO_LINES.slice(0, li).reduce((a, l) => a + l.words.length, 0) + wi;
                      return (
                        <div key={wi} className="overflow-hidden">
                          <motion.span
                            className="block"
                            style={{ color: isLast ? "#EB7300" : "#ffffff" }}
                            initial={{ y: "110%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            transition={{ delay: 0.2 + wordIdx * 0.06, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {word}
                          </motion.span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <motion.p
              className="text-sm md:text-base leading-relaxed max-w-lg mx-auto"
              style={{ color: "rgba(255,255,255,0.45)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.75, ease: "easeOut" }}
            >
              We're a team of creators, strategists, and engineers building the next generation of digital experiences. If you're ambitious and obsessive about craft — you belong here.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
            >
              <Link
                href="/careers/listings"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm text-white"
                style={{ background: "linear-gradient(135deg, #EB7300, #ff9a00)", boxShadow: "0 4px 24px rgba(235,115,0,0.3)" }}
              >
                View Open Roles
                <span className="text-base">→</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm border transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
              >
                Learn About Us
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <span
              className="text-[8px] font-mono uppercase tracking-[0.5em]"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Scroll
            </span>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2], y: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
              >
                <ChevronDown size={16} strokeWidth={2} style={{ color: "#EB7300" }} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ══ CULTURE SECTION ═══════════════════════════════════════ */}
        <motion.section
          ref={cultureSectionRef}
          className="relative w-full overflow-hidden z-10 rounded-t-[2rem]"
          style={{
            background: "#0a0a0a",
            boxShadow: "0 -8px 24px rgba(0,0,0,0.25)",
            y: cultureY,
            filter: cultureFilter,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(235,115,0,0.2), transparent)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-48 md:pt-32 md:pb-64">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
                variants={stagger}
              >
                <motion.p variants={fadeUp} className="text-[9px] font-mono uppercase tracking-[0.55em] mb-4" style={{ color: "#EB7300" }}>
                  Our Culture
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="font-black text-white mb-6"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 0.95, letterSpacing: "-0.025em" }}
                >
                  Where bold ideas meet relentless execution.
                </motion.h2>
                <motion.p variants={fadeUp} className="text-sm leading-[1.9] mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  At DiggiTronic, we don't believe in cookie-cutter work environments. We've built a culture where ambitious people thrive — one that blends structured process with genuine creative latitude.
                </motion.p>
                <motion.p variants={fadeUp} className="text-sm leading-[1.9]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Whether you're a designer, developer, or growth strategist, you'll collaborate with people who care deeply about quality, push each other to grow, and celebrate wins as a team.
                </motion.p>
              </motion.div>

              <div ref={cultureCardsRef} className="flex flex-col">
                {PILLARS.map((p) => (
                  <motion.div
                    key={p.label}
                    className="pillar-card px-4 group flex items-start gap-6 py-7 border-b cursor-default"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <span className="text-[9px] font-mono uppercase tracking-[0.5em] pt-1 shrink-0" style={{ color: "rgba(235,115,0,0.45)" }}>
                      {p.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-white text-base mb-1 transition-colors duration-200 group-hover:text-[#EB7300]">
                        {p.label}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{p.desc}</p>
                    </div>
                    <motion.span className="text-sm shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "#EB7300" }}>
                      <Check size={18} strokeWidth={3} />
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══ COMPANY HIGHLIGHT GRID ════════════════════════════════ */}
        <motion.section
          ref={gridSectionRef}
          className="relative w-full overflow-hidden z-15 rounded-t-[2rem]"
          style={{
            background: "#050505",
            boxShadow: "0 -8px 24px rgba(0,0,0,0.25)",
            y: gridY,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(235,115,0,0.18), transparent)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(235,115,0,0.05) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">

            <motion.div
              className="mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-[9px] font-mono uppercase tracking-[0.55em] mb-4" style={{ color: "#EB7300" }}>
                By the Numbers
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-black text-white"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 0.95, letterSpacing: "-0.025em" }}
              >
                Proven performance,
                <br />
                <span style={{ color: "#EB7300" }}>real results.</span>
              </motion.h2>
            </motion.div>

            <div ref={gridCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Card 1 — 150+ Projects (tall, row-span-2) */}
              <motion.div
                className="highlight-card group relative md:row-span-2 rounded-2xl border overflow-hidden flex flex-col justify-between p-7 cursor-default min-h-[260px]"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                whileHover={{ y: -4, borderColor: "rgba(235,115,0,0.22)" }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(235,115,0,0.08) 0%, transparent 70%)" }} />

                <p className="text-[9px] font-mono uppercase tracking-[0.5em] relative z-10" style={{ color: "rgba(235,115,0,0.6)" }}>
                  {HIGHLIGHT_CARDS[0].label}
                </p>

                <div className="relative z-10">
                  <div
                    className="font-black leading-none"
                    style={{ fontSize: "clamp(4rem, 8vw, 6.5rem)", color: "#EB7300", letterSpacing: "-0.04em" }}
                  >
                    <Counter value={HIGHLIGHT_CARDS[0].stat!} suffix={HIGHLIGHT_CARDS[0].suffix!} />
                  </div>
                  <p className="text-xs leading-relaxed mt-4" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {HIGHLIGHT_CARDS[0].desc}
                  </p>
                </div>
              </motion.div>

              {/* Card 2 — 5+ Years */}
              <motion.div
                className="highlight-card group relative rounded-2xl border overflow-hidden flex flex-col justify-between p-6 cursor-default min-h-[130px]"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                whileHover={{ y: -4, borderColor: "rgba(235,115,0,0.22)" }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(235,115,0,0.07) 0%, transparent 70%)" }} />

                <p className="text-[9px] font-mono uppercase tracking-[0.5em] relative z-10" style={{ color: "rgba(235,115,0,0.6)" }}>
                  {HIGHLIGHT_CARDS[1].label}
                </p>
                <div className="relative z-10 mt-auto pt-4">
                  <div className="font-black leading-none" style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)", color: "#EB7300", letterSpacing: "-0.03em" }}>
                    <Counter value={HIGHLIGHT_CARDS[1].stat!} suffix={HIGHLIGHT_CARDS[1].suffix!} />
                  </div>
                  <p className="text-[11px] leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {HIGHLIGHT_CARDS[1].desc}
                  </p>
                </div>
              </motion.div>

              {/* Card 3 — 40+ Clients */}
              <motion.div
                className="highlight-card group relative rounded-2xl border overflow-hidden flex flex-col justify-between p-6 cursor-default min-h-[130px]"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                whileHover={{ y: -4, borderColor: "rgba(235,115,0,0.22)" }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(235,115,0,0.07) 0%, transparent 70%)" }} />

                <p className="text-[9px] font-mono uppercase tracking-[0.5em] relative z-10" style={{ color: "rgba(235,115,0,0.6)" }}>
                  {HIGHLIGHT_CARDS[2].label}
                </p>
                <div className="relative z-10 mt-auto pt-4">
                  <div className="font-black leading-none" style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)", color: "#EB7300", letterSpacing: "-0.03em" }}>
                    <Counter value={HIGHLIGHT_CARDS[2].stat!} suffix={HIGHLIGHT_CARDS[2].suffix!} />
                  </div>
                  <p className="text-[11px] leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {HIGHLIGHT_CARDS[2].desc}
                  </p>
                </div>
              </motion.div>

              {/* Card 4 — 98% Satisfaction */}
              <motion.div
                className="highlight-card group relative rounded-2xl border overflow-hidden flex flex-col justify-between p-6 cursor-default min-h-[130px]"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                whileHover={{ y: -4, borderColor: "rgba(235,115,0,0.22)" }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(235,115,0,0.07) 0%, transparent 70%)" }} />

                <p className="text-[9px] font-mono uppercase tracking-[0.5em] relative z-10" style={{ color: "rgba(235,115,0,0.6)" }}>
                  {HIGHLIGHT_CARDS[3].label}
                </p>
                <div className="relative z-10 mt-auto pt-4">
                  <div className="font-black leading-none" style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)", color: "#EB7300", letterSpacing: "-0.03em" }}>
                    <Counter value={HIGHLIGHT_CARDS[3].stat!} suffix={HIGHLIGHT_CARDS[3].suffix!} />
                  </div>
                  <p className="text-[11px] leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {HIGHLIGHT_CARDS[3].desc}
                  </p>
                </div>
              </motion.div>

              {/* Card 5 — Full-Service Agency */}
              <motion.div
                className="highlight-card group relative rounded-2xl border overflow-hidden flex flex-col justify-between p-6 cursor-default min-h-[130px]"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                whileHover={{ y: -4, borderColor: "rgba(235,115,0,0.22)" }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(235,115,0,0.07) 0%, transparent 70%)" }} />

                <div className="w-7 h-0.5 rounded-full relative z-10 mb-5" style={{ background: "#EB7300" }} />
                <div className="relative z-10">
                  <p className="font-black text-white text-base leading-tight mb-3 group-hover:text-[#EB7300] transition-colors duration-200">
                    {HIGHLIGHT_CARDS[4].label}
                  </p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {HIGHLIGHT_CARDS[4].desc}
                  </p>
                </div>
              </motion.div>

              {/* Card 6 — Fast Execution (full width) */}
              <motion.div
                className="highlight-card group relative md:col-span-3 rounded-2xl border overflow-hidden p-7 cursor-default"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
                whileHover={{ y: -4, borderColor: "rgba(235,115,0,0.22)" }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 40% 60% at 15% 50%, rgba(235,115,0,0.06) 0%, transparent 60%)" }} />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <div className="w-7 h-0.5 rounded-full mb-4" style={{ background: "#EB7300" }} />
                    <p className="font-black text-white mb-2 group-hover:text-[#EB7300] transition-colors duration-200"
                      style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {HIGHLIGHT_CARDS[5].label}
                    </p>
                    <p className="text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {HIGHLIGHT_CARDS[5].desc}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    <span
                      className="text-[9px] font-mono uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: "#EB7300" }}
                    >
                      Since 2023
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ borderColor: "rgba(235,115,0,0.3)" }}
                    >
                      <span style={{ color: "#EB7300", fontSize: "14px" }}>→</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.section>

        {/* ══ WHY JOIN US ═══════════════════════════════════════════ */}
        <motion.section
          ref={whySectionRef}
          className="relative w-full overflow-hidden z-20 rounded-t-[2rem]"
          style={{
            background: "#0a0a0a",
            boxShadow: "0 -8px 24px rgba(0,0,0,0.25)",
            y: whyY,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(235,115,0,0.15), transparent)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(235,115,0,0.05) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-48 md:pt-32 md:pb-64">
            <motion.div
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-[9px] font-mono uppercase tracking-[0.55em] mb-4" style={{ color: "#EB7300" }}>
                Why DiggiTronic
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-black text-white"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 0.95, letterSpacing: "-0.025em" }}
              >
                Not just a workplace.
                <br />
                <span style={{ color: "#EB7300" }}>A launchpad.</span>
              </motion.h2>
            </motion.div>

            <div ref={whyCardsRef} className="flex flex-col border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              {WHY_JOIN.map((item) => (
                <motion.div
                  key={item.num}
                  className="why-card group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 px-4 border-b cursor-default"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  whileHover={{ backgroundColor: "rgba(235,115,0,0.025)" }}
                  transition={{ duration: 0.2 }}
                >
                  <span
                    className="font-black shrink-0 leading-none select-none transition-colors duration-300 group-hover:text-[#EB7300]"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "rgba(255,255,255,0.06)", letterSpacing: "-0.04em", minWidth: "5rem" }}
                  >
                    {item.num}
                  </span>
                  <p
                    className="font-black text-white shrink-0 transition-colors duration-200 group-hover:text-[#EB7300]"
                    style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.02em", minWidth: "16rem" }}
                  >
                    {item.title}
                  </p>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {item.desc}
                  </p>
                  <motion.span className="shrink-0 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "#EB7300" }}>
                    <Check size={24} strokeWidth={3} />
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══ FEATURED JOBS PREVIEW ═════════════════════════════════ */}
        <motion.section
          ref={jobsSectionRef}
          className="relative w-full z-30 rounded-t-[2rem]"
          style={{
            background: "#0a0a0a",
            boxShadow: "0 -8px 24px rgba(0,0,0,0.25)",
            y: jobsY,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(235,115,0,0.2), transparent)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-22 pb-40 md:pt-32 md:pb-52">
            <motion.div
              className="mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-[9px] font-mono uppercase tracking-[0.55em] mb-4" style={{ color: "#EB7300" }}>
                Open Roles
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-black text-white"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 0.95, letterSpacing: "-0.025em" }}
              >
                We're hiring across
                <br />
                departments.
              </motion.h2>
            </motion.div>

            <div ref={jobCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              {JOBS.map((job) => (
                <JobCard key={job.slug} {...job} />
              ))}
            </div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Link
                href="/careers/listings"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-sm border transition-all hover:border-[#EB7300]/50"
                style={{ borderColor: "rgba(235,115,0,0.3)", color: "#EB7300" }}
              >
                View All Open Positions
                <span className="text-base">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.section>

      </main>
      <Footer />
    </>
  );
}
