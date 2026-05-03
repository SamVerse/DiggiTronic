"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import type { ServiceData } from "@/data/services";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: "easeOut" } },
};

export default function ServiceCta({ service }: { service: ServiceData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.14, 0.06]);

  const words = ["Ready", "to", "elevate", "your", `${service.title}?`];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden rounded-t-[2rem]"
      style={{ background: "#050505", boxShadow: "0 -12px 40px rgba(0,0,0,0.3)" }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(235,115,0,1) 0%, transparent 65%)",
          opacity: glowOpacity,
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 72px)
          `,
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(235,115,0,0.35), transparent)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-28 md:py-40 text-center flex flex-col items-center">

        <motion.p
          className="text-[9px] font-mono uppercase tracking-[0.6em] mb-4"
          style={{ color: "#EB7300" }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Let's Work Together
        </motion.p>

        {/* Headline — reveal */}
        <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-4 lg:gap-x-5 mb-6">
          <div className="flex flex-nowrap gap-x-3 md:gap-x-4 lg:gap-x-5">
            {["Ready", "To", "Elevate"].map((word, wi) => (
              <motion.span
                key={wi}
                className="font-black inline-block pt-2 pb-2"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.8rem, 6vw, 5.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.035em",
                }}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{
                  delay: 0.1 + wi * 0.08,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.span
            className="font-black inline-block pt-2 pb-2"
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.8rem, 6vw, 5.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
            }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{
              delay: 0.1 + 3 * 0.08,
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Your
          </motion.span>

          <motion.span
            className="font-black inline-block pt-2 pb-2"
            style={{
              color: "#EB7300",
              fontSize: "clamp(1.8rem, 6vw, 5.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
            }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{
              delay: 0.1 + 4 * 0.08,
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {service.title}?
          </motion.span>
        </div>

        <motion.p
          className="text-base md:text-lg leading-relaxed max-w-2xl mb-12"
          style={{ color: "rgba(255,255,255,0.6)" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        >
          Let's build something extraordinary together. Tell us about your project and we'll craft a strategy built for your goals.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-40px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black text-sm text-white"
              style={{
                background: "linear-gradient(135deg, #EB7300, #EB7300)",
                boxShadow: "0 4px 28px rgba(235,115,0,0.35)",
              }}
            >
              Schedule a Call
              <motion.span
                className="text-base"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="group">
            <a
              href={`/pdfs/${service.slug}.pdf`}
              download={`${service.slug}-deck.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-sm border transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)" }}
            >
              <div
                className="absolute inset-0 rounded-full bg-linear-to-r from-[#AD390E] to-[#FFC93E] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  padding: "1.5px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                }}
              />
              Download Deck
            </a>
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-12 text-[9px] font-mono uppercase tracking-[0.5em]"
          style={{ color: "rgba(255,255,255,0.18)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.8 }}
        >
          Based in Dubai · Working Globally
        </motion.p>
      </div>
    </section>
  );
}
