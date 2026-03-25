"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { Job } from "@/data/jobs";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: "easeOut" } },
};

const HERO_WORD_LINES = (title: string) => title.split(" ").map((w) => [w]);

export default function JobDetailClient({ job }: { job: Job }) {
  const words = job.title.split(" ");

  return (
    <>
      <LenisScroll />
      <Navbar />
      <main className="relative overflow-x-hidden" style={{ background: "#0a0a0a" }}>

        <section
          className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden"
          style={{ minHeight: "55vh", paddingTop: "8rem", paddingBottom: "5rem" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 65% 55% at 50% 65%, rgba(235,115,0,0.09) 0%, transparent 70%)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 72px),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 72px)
              `,
            }}
          />

          <div className="relative z-10 px-6">
            <motion.p
              className="text-[9px] font-mono uppercase tracking-[0.6em] mb-6"
              style={{ color: "#EB7300" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {job.department}
            </motion.p>

            {/* Title — word-clip reveal */}
            <div className="mb-7 flex flex-wrap justify-center gap-x-[0.22em]">
              {words.map((word, wi) => (
                <div key={wi} className="overflow-hidden">
                  <motion.span
                    className="block font-black text-white"
                    style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ delay: 0.15 + wi * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
            >
              {[job.location, job.type, job.experience].map((chip) => (
                <span
                  key={chip}
                  className="text-[9px] font-mono uppercase tracking-[0.4em] rounded-full px-4 py-1.5 border"
                  style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
                >
                  {chip}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative w-full">
          <div className="max-w-3xl mx-auto px-6 pb-28">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <Link
                href="/careers/listings"
                className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] transition-opacity hover:opacity-60"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                ← All Positions
              </Link>
            </motion.div>

            <motion.div
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              variants={fadeUp}
            >
              <span className="block text-[9px] font-mono uppercase tracking-[0.5em] mb-3" style={{ color: "#EB7300" }}>
                Overview
              </span>
              <p className="text-sm leading-[1.9]" style={{ color: "rgba(255,255,255,0.5)" }}>
                {job.overview}
              </p>
            </motion.div>

            <div className="h-px mb-12" style={{ background: "rgba(255,255,255,0.05)" }} />

            <motion.div
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              variants={fadeUp}
            >
              <span className="block text-[9px] font-mono uppercase tracking-[0.5em] mb-4" style={{ color: "#EB7300" }}>
                Responsibilities
              </span>
              <ul className="flex flex-col gap-3">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-[1.8]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <span className="shrink-0 mt-0.5 font-black" style={{ color: "#EB7300" }}>→</span>
                    {r}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="h-px mb-12" style={{ background: "rgba(255,255,255,0.05)" }} />

            <motion.div
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              variants={fadeUp}
            >
              <span className="block text-[9px] font-mono uppercase tracking-[0.5em] mb-4" style={{ color: "#EB7300" }}>
                Requirements
              </span>
              <ul className="flex flex-col gap-3">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-[1.8]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <span className="shrink-0 mt-0.5 font-black" style={{ color: "#EB7300" }}>✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="h-px mb-12" style={{ background: "rgba(255,255,255,0.05)" }} />

            {/* What You'll Work On */}
            <motion.div
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              variants={fadeUp}
            >
              <span className="block text-[9px] font-mono uppercase tracking-[0.5em] mb-4" style={{ color: "#EB7300" }}>
                What You'll Work On
              </span>
              <div
                className="rounded-xl py-4 px-5"
                style={{
                  borderLeft: "3px solid #EB7300",
                  background: "rgba(235,115,0,0.04)",
                  paddingLeft: "1.25rem",
                }}
              >
                <p className="text-sm leading-[1.9]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {job.whatYoullWorkOn}
                </p>
              </div>
            </motion.div>

            <div className="h-px mb-12" style={{ background: "rgba(255,255,255,0.05)" }} />

            <motion.div
              className="mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              variants={fadeUp}
            >
              <span className="block text-[9px] font-mono uppercase tracking-[0.5em] mb-5" style={{ color: "#EB7300" }}>
                Benefits
              </span>
              <div className="grid grid-cols-2 gap-4">
                {job.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#EB7300" }} />
                    <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              variants={fadeUp}
            >
              <motion.div
                whileHover={{ y: -3, boxShadow: "0 12px 36px rgba(235,115,0,0.35)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Link
                  href={`/careers/${job.slug}/apply`}
                  className="flex items-center justify-center gap-3 w-full rounded-2xl py-5 font-black text-base text-white"
                  style={{ background: "linear-gradient(135deg, #EB7300, #ff9a00)", boxShadow: "0 4px 24px rgba(235,115,0,0.25)" }}
                >
                  Apply for this Position
                  <span className="text-xl">→</span>
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
