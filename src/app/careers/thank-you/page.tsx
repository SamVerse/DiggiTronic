"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function HeadlineLine({
  words,
  color,
  startIdx,
}: {
  words: string[];
  color: string;
  startIdx: number;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-x-[0.22em]">
      {words.map((word, wi) => (
        <div key={wi} className="overflow-hidden">
          <motion.span
            className="block font-black"
            style={{
              color,
              fontSize: "clamp(2.2rem, 7vw, 6rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
            }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: 0.3 + (startIdx + wi) * 0.1,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
      <motion.div
        className="absolute rounded-full"
        style={{ background: "rgba(235,115,0,0.15)", width: 120, height: 120 }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ background: "rgba(235,115,0,0.1)", width: 90, height: 90 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
      />
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{ width: 72, height: 72, background: "linear-gradient(135deg, #EB7300, #ff9a00)", boxShadow: "0 0 40px rgba(235,115,0,0.4)" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          <motion.polyline
            points="20 6 9 17 4 12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("for");

  const { scrollYProgress } = useScroll();
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [0, 0.12, 0.06]);

  return (
    <main className="relative overflow-x-hidden" style={{ background: "#0a0a0a" }}>

      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(235,115,0,1) 0%, transparent 70%)",
          opacity: glowOpacity,
        }}
      />

      <section
        className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: "7rem", paddingBottom: "6rem" }}
      >
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

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <CheckCircle />
        </motion.div>

        {jobTitle && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.4em] rounded-full px-4 py-2 border"
              style={{ borderColor: "rgba(235,115,0,0.3)", color: "rgba(255,255,255,0.5)" }}
            >
              You applied for:
              <span style={{ color: "#EB7300" }}>{jobTitle}</span>
            </span>
          </motion.div>
        )}

        {/* Headline — 3 lines, word-clip reveal */}
        <div className="flex flex-col items-center gap-1 mb-8">
          <HeadlineLine words={["YOUR", "JOURNEY", "WITH"]} color="#ffffff" startIdx={0} />
          <HeadlineLine words={["DIGGITRONIC"]} color="#EB7300" startIdx={3} />
          <HeadlineLine words={["STARTS", "HERE."]} color="#ffffff" startIdx={4} />
        </div>

        <motion.p
          className="text-sm leading-[1.9] max-w-md mb-12"
          style={{ color: "rgba(255,255,255,0.4)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          Thank you for applying. Our team will review your application and contact you within 3–5 business days.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-sm border transition-colors hover:border-[#EB7300]/50 hover:text-[#EB7300]"
              style={{ borderColor: "rgba(235,115,0,0.3)", color: "rgba(255,255,255,0.6)" }}
            >
              Explore Our Work
              <span className="text-base">→</span>
            </Link>
          </motion.div>
        </motion.div>

      </section>

    </main>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function ThankYouPage() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <Suspense fallback={
        <main className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }} />
      }>
        <ThankYouContent />
      </Suspense>
      <Footer />
    </>
  );
}
