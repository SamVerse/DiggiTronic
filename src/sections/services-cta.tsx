"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Hyperspeed from "@/components/Hyperspeed";

const VALUE_LABELS = [
  "Growth.",
  "Strategy.",
  "Performance.",
  "Impact.",
  "Precision.",
  "Excellence.",
];

gsap.registerPlugin(ScrollTrigger);

function RotatingValue() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % VALUE_LABELS.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="relative pb-4 font-black overflow-hidden"
      style={{ display: "inline-block", lineHeight: "1" }}
    >
      <span aria-hidden style={{ visibility: "hidden", pointerEvents: "none" }}>
        Performance.
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "50%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-50%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(90deg, #EB7300, #EB7300)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {VALUE_LABELS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}


export default function ServicesCTA() {
  const containerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const bgX = useSpring(rawX, { stiffness: 40, damping: 22 });
  const bgY = useSpring(rawY, { stiffness: 40, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { left, top, width, height } =
      containerRef.current!.getBoundingClientRect();
    const nx = ((e.clientX - left) / width - 0.5) * 28; // ±14px
    const ny = ((e.clientY - top) / height - 0.5) * 16; // ±8px
    rawX.set(nx);
    rawY.set(ny);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

  const { scrollYProgress: parallaxProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const sectionY = useTransform(parallaxProgress, [0, 1], ["0%", "90%"]);
  const sectionFilter = useTransform(
    parallaxProgress,
    [0, 1],
    ["brightness(1)", "brightness(0.4)"]
  );

  const effectOptions = useMemo(
    () => ({
      onSpeedUp: () => { },
      onSlowDown: () => { },
      distortion: "mountainDistortion",
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],
      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],
      carLightsLength: [12, 80],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.8, 0.8],
      carFloorSeparation: [0, 5],
      colors: {
        roadColor: 526344,
        islandColor: 657930,
        background: 0,
        shoulderLines: 1250072,
        brokenLines: 1250072,
        leftCars: [16777215, 16731392, 16777215],
        rightCars: [16738816, 16777215, 15430400],
        sticks: 16731392,
      },
    }),
    []
  );

  useGSAP(
    () => {
      const titleNode = titleRef.current;
      const subtitleNode = subtitleRef.current;
      const bottomNode = bottomRef.current;

      if (!titleNode || !subtitleNode || !bottomNode) return;

      const words = titleNode.querySelectorAll(".word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom center",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.set(words, { opacity: 1, y: 0 });

      tl.from(words, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      })
        .from(subtitleNode, { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .from(bottomNode, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4");
    },
    { scope: containerRef }
  );

  return (
    <motion.section
      id="services"
      ref={containerRef}
      className="relative z-20 h-screen w-full overflow-hidden max-w-none bg-[#050505]"
      style={{ y: sectionY, filter: sectionFilter }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 z-10 pointer-events-auto"
        style={{ x: bgX, y: bgY, scale: 1.06 }}
      >
        <Hyperspeed
          isBoosting={false}
          effectOptions={effectOptions}
        />
      </motion.div>

      <div className="absolute inset-0 z-20 pointer-events-none backdrop-blur-sm bg-black/10" />

      <motion.div
        className="relative z-30 flex h-full flex-col items-center justify-center text-center px-6 pointer-events-none"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* <motion.p
          className="text-[9px] uppercase font-mono mb-6 tracking-[0.55em]"
          style={{ color: "rgba(255,255,255,0.35)" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Full-service digital studio
        </motion.p> */}

        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight [word-spacing:1rem] leading-tight max-w-5xl mx-auto text-white"
        >
          Branding. Websites.
          <br className="hidden md:block" />
          Marketing. AI. Content.
        </h2>

        <p
          ref={subtitleRef}
          className="mt-6 text-base md:text-lg max-w-xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Everything under one roof, so you don’t have to handle 5 separate
          vendors.
        </p>

        <div
          ref={bottomRef}
          className="mt-10 flex flex-col items-center gap-8"
        >
          <div className="flex flex-col mb-2 items-center gap-1 text-2xl md:text-3xl font-black">
            <span style={{ color: "rgba(255,255,255,0.99)" }}>We deliver</span>
            <RotatingValue />
          </div>

          {/* <div
            className="w-px h-8"
            style={{ background: "rgba(255,255,255,0.22)" }}
          /> */}
        </div>
      </motion.div>
    </motion.section>
  );
}