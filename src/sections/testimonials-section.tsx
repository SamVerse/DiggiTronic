"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Digitronic completely redefined how we present ourselves online. From brand identity to web presence, they brought a level of craft and strategy that genuinely moved the needle for our business.",
    name: "Alex Harrison",
    role: "CEO",
    company: "NovaTech Solutions",
  },
  {
    id: 2,
    quote:
      "Working with Digitronic was a revelation. They didn't just design — they listened, understood our market, and built a brand system that now earns us deals before we ever get on a call.",
    name: "Priya Mehta",
    role: "CMO",
    company: "Strategos Inc.",
  },
  {
    id: 3,
    quote:
      "The AI workflow integrations Digitronic built for us cut our internal overhead by 60%. This team operates at a different level — they're part strategist, part engineer, part creative director.",
    name: "Marcus Chen",
    role: "Founder",
    company: "Quantum Labs",
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#ff4d00">
          <path d="M7 1l1.55 3.14L12 4.74l-2.5 2.44.59 3.43L7 9.01l-3.09 1.6.59-3.43L2 4.74l3.45-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isHovered]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  const { scrollYProgress: inProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(inProgress, [0, 1], ["10%", "-10%"]);

  const active = TESTIMONIALS[activeIndex];

  return (
    <motion.section
      ref={sectionRef}
      data-navbar-theme="light"
      className="relative z-10 w-full overflow-hidden rounded-t-[2rem]"
      style={{
        backgroundColor: '#ffffff',
        boxShadow: "0 -16px 60px rgba(0,0,0,0.3)",
        y: sectionY,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        aria-hidden
        style={{ y: quoteY }}
        className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-black leading-none pl-4 md:pl-16"
          style={{
            fontSize: "clamp(14rem, 45vw, 56rem)",
            color: "#ff4d00",
            opacity: 0.04,
            lineHeight: 0.8,
          }}
        >
          "
        </span>
      </motion.div>

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24"
      >

        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={staggerContainer}
        >
          {/* <motion.p
            variants={fadeUp}
            className="text-[9px] uppercase font-mono tracking-[0.55em] text-gray-400 mb-4"
          >
            What clients say
          </motion.p> */}
          <motion.h2
            variants={fadeUp}
            className="font-black leading-[0.9] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Real results,
          </motion.h2>
          <motion.h2
            variants={fadeUp}
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)", color: "#ff4d00" }}
          >
            real words.
          </motion.h2>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            DESKTOP LAYOUT — left/right split
            ══════════════════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={fadeUp}
          className="hidden lg:flex gap-12 xl:gap-20 items-start"
        >

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <StarRating />

                <blockquote
                  className="mt-6 font-medium leading-relaxed text-gray-800"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
                >
                  "{active.quote}"
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #ff4d00, #ff6a00)" }}
                  >
                    {active.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm">{active.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mt-0.5">
                      {active.role} — {active.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="relative h-0.5 rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    width: i === activeIndex ? "3rem" : "1.5rem",
                    background: "rgba(0,0,0,0.1)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  {i === activeIndex && (
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: "#ff4d00" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                      key={activeIndex}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="w-72 xl:w-80 flex flex-col gap-3 flex-shrink-0">
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.button
                  key={t.id}
                  onClick={() => setActiveIndex(i)}
                  className="text-left p-5 rounded-2xl border transition-colors duration-300 cursor-pointer"
                  animate={{
                    borderColor: isActive
                      ? "rgba(255,77,0,0.3)"
                      : "rgba(0,0,0,0.06)",
                    background: isActive
                      ? "rgba(255,77,0,0.04)"
                      : "rgba(0,0,0,0.02)",
                    scale: isActive ? 1 : 0.98,
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{ borderWidth: "1px", willChange: "transform" }}
                >
                  <div className="flex gap-3 items-start">
                    <motion.div
                      className="w-0.5 self-stretch rounded-full flex-shrink-0 mt-1"
                      animate={{ background: isActive ? "#ff4d00" : "transparent" }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <p
                        className="font-black text-sm transition-colors duration-300"
                        style={{ color: isActive ? "#1a1a1a" : "rgba(0,0,0,0.4)" }}
                      >
                        {t.name}
                      </p>
                      <p
                        className="text-[10px] uppercase tracking-[0.25em] mt-0.5 transition-colors duration-300"
                        style={{ color: isActive ? "#ff4d00" : "rgba(0,0,0,0.3)" }}
                      >
                        {t.role} — {t.company}
                      </p>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-2"
                        >
                          "{t.quote.slice(0, 80)}..."
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            MOBILE LAYOUT — full card + dot nav
            ══════════════════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={fadeUp}
          className="lg:hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-6 border"
              style={{
                borderColor: "rgba(255,77,0,0.2)",
                background: "rgba(255,77,0,0.02)",
              }}
            >
              <StarRating />
              <blockquote className="mt-4 text-base font-medium leading-relaxed text-gray-800">
                "{active.quote}"
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #ff4d00, #ff6a00)" }}
                >
                  {active.name[0]}
                </div>
                <div>
                  <p className="font-black text-gray-900 text-sm">{active.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mt-0.5">
                    {active.role} — {active.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? "1.5rem" : "0.5rem",
                  height: "0.5rem",
                  background: i === activeIndex ? "#ff4d00" : "rgba(0,0,0,0.15)",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
