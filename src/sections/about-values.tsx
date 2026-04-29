"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    num: "01",
    title: "Bold Thinking",
    body: "We believe great brands stand out when they’re willing to do things differently. We’re always open to fresh ideas, creative risks, and approaches that help businesses leave a stronger impression.",
  },
  {
    num: "02",
    title: "Purposeful Strategy",
    body: "Every design, campaign, and decision should have a reason behind it. We focus on creating work that not only looks good, but also supports long term growth.",
  },
  {
    num: "03",
    title: "Attention to Quality",
    body: "Whether it’s branding, content, videos, or marketing, we care deeply about the details. Good work comes from consistency, thought, and taking the extra step.",
  },
  {
    num: "04",
    title: "Growing Together",
    body: "We see every client relationship as a partnership. We stay involved, communicate honestly, and work closely with brands as they grow over time.",
  },
];

function ValueCard({ value, index }: { value: typeof VALUES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const bgOpacity = useMotionValue(0.03);
  const borderOpacity = useMotionValue(0.1);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = cardRef.current!.getBoundingClientRect();
    const cx = (e.clientX - left) / width - 0.5;
    const cy = (e.clientY - top) / height - 0.5;
    rotateX.set(-cy * 12);
    rotateY.set(cx * 12);
    bgOpacity.set(0.08);
    borderOpacity.set(0.35);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    bgOpacity.set(0.03);
    borderOpacity.set(0.1);
  }

  return (
    <div className="value-card" style={{ perspective: "800px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
          borderColor: `rgba(235,115,0,${borderOpacity.get()})`,
        }}
        animate={{
          borderColor: [null],
        }}
        className="relative rounded-3xl p-8 h-full cursor-default transition-[border-color,background] duration-300"
        whileHover={{
          y: -6,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            border: "1px solid rgba(235,115,0,0.0)",
            background: "rgba(235,115,0,0.0)",
          }}
          whileHover={{
            borderColor: "rgba(235,115,0,0.3)",
            background: "rgba(235,115,0,0.05)",
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          <span
            className="text-[9px] font-mono tracking-[0.4em]"
            style={{ color: "#EB7300" }}
          >
            {value.num}
          </span>

          <h3
            className="font-black text-white mt-4 mb-3"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
          >
            {value.title}
          </h3>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {value.body}
          </p>

          <div className="mt-8">
            <motion.div
              className="h-0.5 rounded-full"
              style={{ width: "2rem", background: "#EB7300" }}
              whileHover={{ width: "4rem", opacity: 1 }}
              initial={{ opacity: 0.35 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".value-card");
      if (!cards?.length) return;
      gsap.from(cards, {
        y: 70,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-20 w-full overflow-hidden rounded-t-[2rem]"
      style={{
        background: "#0a0a0a",
        boxShadow: "0 -16px 60px rgba(0,0,0,0.4)",
        y: sectionY,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(235,115,0,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="text-[9px] uppercase font-mono tracking-[0.55em] mb-5"
            style={{ color: "#EB7300" }}
          >
            What We Stand For
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85 } },
            }}
            className="font-black leading-[0.92] tracking-tight text-white"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
          >
            Core Values
          </motion.h2>
        </motion.div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {VALUES.map((v, i) => (
            <ValueCard key={v.num} value={v} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
