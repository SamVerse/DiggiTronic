"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { JOBS } from "@/data/jobs";

gsap.registerPlugin(ScrollTrigger);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const NUMS = ["01", "02", "03"];

export default function ListingsPage() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardsRef.current) return;
    gsap.from(cardsRef.current.querySelectorAll(".listing-card"), {
      y: 60, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.15,
      scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play reverse play reverse" },
    });
  }, []);

  return (
    <>
      <LenisScroll />
      <Navbar />
      <main className="relative overflow-x-hidden" style={{ background: "#0a0a0a" }}>

        <section
          className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden"
          style={{ minHeight: "42vh", paddingTop: "8rem", paddingBottom: "5rem" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(235,115,0,0.08) 0%, transparent 70%)" }}
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
              Current Openings
            </motion.p>

            <div className="overflow-hidden mb-4">
              <motion.h1
                className="font-black text-white"
                style={{ fontSize: "clamp(2.8rem, 9vw, 7.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Open Positions
              </motion.h1>
            </div>

            <motion.p
              className="text-sm leading-relaxed max-w-md mx-auto"
              style={{ color: "rgba(255,255,255,0.4)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              We're growing fast and looking for exceptional people across departments. Find your role below.
            </motion.p>
          </div>
        </section>

        <section className="relative w-full">
          <div className="max-w-4xl mx-auto px-6 pb-28">

            <motion.div
              className="flex items-center justify-between mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-[9px] font-mono uppercase tracking-[0.5em]"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {JOBS.length} positions available
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="h-px flex-1 mx-6"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
              <motion.p
                variants={fadeUp}
                className="text-[9px] font-mono uppercase tracking-[0.5em]"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                All Remote
              </motion.p>
            </motion.div>

            <div ref={cardsRef} className="flex flex-col gap-6">
              {JOBS.map((job, i) => (
                <Link key={job.slug} href={`/careers/${job.slug}`} className="block group">
                  <motion.div
                    className="listing-card relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 md:p-8 overflow-hidden cursor-pointer"
                    whileHover={{ y: -5, borderColor: "rgba(235,115,0,0.25)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(235,115,0,0.04) 0%, transparent 70%)" }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start gap-6 mb-5">
                        <span
                          className="text-[9px] font-mono uppercase tracking-[0.5em] pt-1 shrink-0"
                          style={{ color: "#EB7300" }}
                        >
                          {NUMS[i]}
                        </span>
                        <div className="flex-1">
                          <h2
                            className="font-black text-white mb-2"
                            style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                          >
                            {job.title}
                          </h2>
                          <motion.div
                            className="h-[2px] rounded-full mb-4"
                            style={{ background: "rgba(235,115,0,0.5)", width: "0%" }}
                            whileInView={{ width: "3rem" }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5 pl-12">
                        {[
                          { label: "Dept", value: job.department },
                          { label: "Location", value: job.location },
                          { label: "Type", value: job.type },
                          { label: "Exp", value: job.experience },
                        ].map((m) => (
                          <div key={m.label} className="flex flex-col gap-0.5">
                            <span className="text-[8px] font-mono uppercase tracking-[0.45em]" style={{ color: "rgba(255,255,255,0.25)" }}>
                              {m.label}
                            </span>
                            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <p
                        className="text-sm leading-[1.8] mb-6 pl-12 line-clamp-2"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {job.overview}
                      </p>

                      <div className="pl-12 flex items-center gap-6">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em]"
                          style={{ color: "#EB7300" }}
                        >
                          View Full Role
                          <motion.span
                            className="text-base leading-none"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            →
                          </motion.span>
                        </span>
                        <Link
                          href={`/careers/${job.slug}/apply`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black border transition-colors hover:border-[#EB7300]/50 hover:text-[#EB7300]"
                          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
