"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What kinds of brands do you work with?",
    a: "We work with a wide spectrum — from ambitious early-stage startups building their first identity, to established businesses looking to reposition or scale digitally. What connects our clients is a growth mindset and a belief that design, marketing, and technology should work in concert.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope. A brand identity sprint runs 3–4 weeks. A full website build typically takes 6–10 weeks. Integrated marketing retainers are ongoing. We always agree on a clear timeline at the start — no surprises, no drift.",
  },
  {
    q: "Do you offer retainer or ongoing services?",
    a: "Yes. Many of our clients evolve from project-based work into monthly retainers covering content, SEO, paid media, and product updates. It's a model that allows for compounding results and a deeper partnership over time.",
  },
  {
    q: "How do you integrate AI into business workflows?",
    a: "We audit your existing processes, identify where AI can reduce friction or multiply output, then build and integrate the right tools — whether that's LLM-powered workflows, automation pipelines, or custom AI tooling. We focus on measurable efficiency gains, not AI for its own sake.",
  },
  {
    q: "What makes Digitronic different from other agencies?",
    a: "We don't separate strategy from execution. You get senior-level thinking applied to every deliverable — not handed off down a chain. We also believe in systems over one-off outputs: our work compounds. Design, marketing, and AI living together under one roof means nothing gets lost in translation.",
  },
  {
    q: "Can you manage end-to-end brand and digital projects?",
    a: "Absolutely — that's our strongest suit. From initial discovery and brand strategy through to design, development, marketing, and AI integration, we manage the full arc. Most of our best work happens when we own the brief from day one.",
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="faq-item border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      <button
        className="w-full flex items-start gap-4 md:gap-6 py-6 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <motion.span
          className="text-xs font-mono flex-shrink-0 mt-1 transition-colors duration-300"
          animate={{ color: isOpen ? "#EB7300" : "rgba(255,255,255,0.2)" }}
          transition={{ duration: 0.3 }}
          style={{ letterSpacing: "0.1em" }}
        >
          {num}
        </motion.span>

        <span
          className="flex-1 font-black leading-tight transition-colors duration-300"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.35rem)",
            color: isOpen ? "#ffffff" : "rgba(255,255,255,0.7)",
          }}
        >
          {item.q}
        </span>

        <motion.span
          className="flex-shrink-0 mt-1 text-xl font-light leading-none"
          animate={{
            rotate: isOpen ? 45 : 0,
            color: isOpen ? "#EB7300" : "rgba(255,255,255,0.3)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pl-10 md:pl-14 pb-6 pr-8">
              <motion.div
                className="w-8 h-0.5 mb-4 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{ background: "#EB7300", transformOrigin: "left" }}
              />
              <p
                className="leading-relaxed text-sm md:text-[15px]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      if (!contentRef.current) return;
      const items = contentRef.current.querySelectorAll(".faq-item");

      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden rounded-t-[2rem]"
      style={{
        background: "#050505",
        boxShadow: "0 -16px 60px rgba(0,0,0,0.6)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(255,77,0,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32">

        <motion.div
          className="mb-16 md:mb-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* <motion.p
            variants={fadeUp}
            className="text-[9px] uppercase font-mono mb-5"
            style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.55em" }}
          >
            FAQ
          </motion.p> */}

          <motion.h2
            variants={fadeUp}
            className="font-black leading-[1.1] tracking-tight text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
          >
            Questions you have,
          </motion.h2>
          <motion.h2
            variants={fadeUp}
            className="font-black leading-[1.1] tracking-tight -mt-[0.15em]"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
              color: "#EB7300",
            }}
          >
            answers we've earned.
          </motion.h2>
        </motion.div>

        <div className="h-px mb-0" style={{ background: "rgba(255,255,255,0.07)" }} />

        <div ref={contentRef}>
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
