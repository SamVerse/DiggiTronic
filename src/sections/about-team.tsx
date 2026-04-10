"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { Linkedin, ArrowUpRight, MapPin } from "lucide-react";

/* ─── founder data ─────────────────────────────────────────────── */
const FOUNDER = {
  name: "Shashank Sharma",
  role: "Founder & Creative Director",
  tagline: "Unlocking Growth Through Graphics & Social Media",
  bio: "A creative visionary with boundless imagination, specializing in graphic design and strategic marketing. From stunning visual identities to high-impact digital campaigns — transforming brands through the power of design.",
  image: "/images/blog/founder.jpeg",
  linkedin: "https://www.linkedin.com/in/shashank-sharma-00267b260/",
  skills: [
    "Photoshop",
    "Illustrator",
    "Canva",
    "Brand Identity",
    "Digital Marketing",
  ],
};

/* ─── animation variants ───────────────────────────────────────── */
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const underlineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── component ────────────────────────────────────────────────── */
export default function AboutTeam() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <motion.section
      ref={sectionRef}
      data-navbar-theme="light"
      className="relative z-10 w-full overflow-hidden rounded-t-[2rem]"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 -16px 60px rgba(0,0,0,0.3)",
        y: sectionY,
      }}
    >
      {/* ── dot grid texture (behind image column) ── */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #EB7300 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── large watermark ── */}
      <motion.span
        aria-hidden
        className="absolute -top-8 -right-4 font-black pointer-events-none select-none hidden lg:block"
        style={{
          fontSize: "clamp(10rem, 20vw, 18rem)",
          lineHeight: 0.85,
          color: "#e5e5e5",
          opacity: 0.55,
        }}
      >
        F.
      </motion.span>

      {/* ── content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ────────── LEFT: details ────────── */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={staggerContainer}
          >
            {/* tag */}
            <motion.p
              variants={fadeLeft}
              className="text-[9px] uppercase font-mono tracking-[0.55em] text-gray-400 mb-4"
            >
              The Visionary Behind It
            </motion.p>

            {/* name */}
            <motion.h2
              variants={fadeLeft}
              className="font-black leading-[0.92] tracking-tight text-gray-900"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              {FOUNDER.name}
            </motion.h2>

            {/* role */}
            <motion.p
              variants={fadeLeft}
              className="mt-2 text-sm md:text-base font-bold uppercase tracking-[0.15em]"
              style={{ color: "#EB7300" }}
            >
              {FOUNDER.role}
            </motion.p>

            {/* location + social stats */}
            <motion.div
              variants={fadeLeft}
              className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin size={13} style={{ color: "#EB7300" }} />
                Delhi, India
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                <Linkedin size={13} style={{ color: "#EB7300" }} />
                21,720+ followers
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="#EB7300"
                  width={13}
                  height={13}
                  className="flex-shrink-0"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
                </svg>
                2.5K+ subscribers
              </span>
            </motion.div>

            {/* divider */}
            <motion.div
              variants={underlineGrow}
              className="mt-5 mb-6 origin-left"
              style={{ width: "4rem", height: "3px", background: "#EB7300" }}
            />

            {/* tagline with vertical bar */}
            <motion.div
              variants={fadeUp}
              className="flex items-start gap-4 mb-6"
            >
              <div
                className="w-[3px] self-stretch rounded-full flex-shrink-0 mt-1"
                style={{
                  background: "linear-gradient(to bottom, #EB7300, #FF4D00)",
                }}
              />
              <p
                className="text-base md:text-lg font-bold italic leading-snug"
                style={{ color: "#EB7300" }}
              >
                &ldquo;{FOUNDER.tagline}&rdquo;
              </p>
            </motion.div>

            {/* bio */}
            <motion.p
              variants={fadeUp}
              className="text-sm md:text-base leading-relaxed text-gray-500 max-w-lg mb-8"
            >
              {FOUNDER.bio}
            </motion.p>

            {/* skill tags */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-2 mb-8"
            >
              {FOUNDER.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border"
                  style={{
                    borderColor: "rgba(235,115,0,0.25)",
                    color: "#EB7300",
                    background: "rgba(235,115,0,0.06)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* linkedin */}
            <motion.a
              variants={fadeUp}
              href={FOUNDER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold group"
              style={{ color: "#EB7300" }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <Linkedin size={18} />
              <span className="border-b border-current">
                Connect on LinkedIn
              </span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </motion.div>

          {/* ────────── RIGHT: image ────────── */}
          <motion.div
            className="lg:col-span-5 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={fadeRight}
          >
            {/* offset frame */}
            <div
              aria-hidden
              className="absolute -top-4 -right-4 bottom-8 left-8 rounded-2xl border-2 pointer-events-none hidden lg:block"
              style={{ borderColor: "rgba(235,115,0,0.2)" }}
            />

            {/* corner bracket */}
            <div
              aria-hidden
              className="absolute -top-2 -right-2 w-16 h-16 pointer-events-none hidden lg:block"
              style={{
                borderTop: "3px solid #EB7300",
                borderRight: "3px solid #EB7300",
                borderRadius: "0 1rem 0 0",
              }}
            />

            {/* photo */}
            <motion.div
              className="relative aspect-[3/4] rounded-2xl overflow-hidden"
              style={{ y: imageY }}
            >
              <Image
                src={FOUNDER.image}
                alt={`${FOUNDER.name} — ${FOUNDER.role}`}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
                priority
              />

              {/* orange gradient overlay on bottom edge */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(235,115,0,0.15) 0%, transparent 40%)",
                }}
              />
            </motion.div>

            {/* dot decorators */}
            <div
              aria-hidden
              className="absolute -bottom-3 -left-3 flex gap-1.5"
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#EB7300",
                    opacity: 1 - i * 0.25,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
