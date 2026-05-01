"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroGlobe from "@/components/hero-globe";
import Link from "next/link";
import LightRays from "@/components/LightRays";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const sectionFilter = useTransform(scrollYProgress, [0, 1], ["brightness(1)", "brightness(0.4)"]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#050505] z-0 overflow-hidden"
      style={{
        y: sectionY,
        filter: sectionFilter,
      }}
    >
      <div
        className="relative px-4 md:px-16 lg:px-24 xl:px-32 flex w-full h-full flex-col items-center md:-mt-24"
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <LightRays
            raysOrigin="top-right"
            raysColor="#EB7300"
            raysSpeed={1.5}
            lightSpread={1.5}
            rayLength={4}
            followMouse={true}
            mouseInfluence={0.15}
            noiseAmount={0.24}
            distortion={0}
            className="custom-rays opacity-100"
            pulsating={false}
            fadeDistance={1.5}
            saturation={2}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full px-4">
          <motion.a
            href="/contact"
            className="flex items-center mt-48 gap-2 border border-slate-800 bg-slate-900/50 text-gray-300 rounded-full px-4 py-2 backdrop-blur-sm"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <div className="size-2.5 bg-[#EB7300] rounded-full animate-pulse"></div>
            <span>Let’s Talk About Your Brand</span>
          </motion.a>

          <motion.h1
            className="text-center text-4xl leading-[0.95] md:text-6xl md:leading-[0.9] mt-6 font-bold max-w-4xl text-white"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
          >
            Your Growth Partner For Design, Marketing &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#EB7300] to-[#EB7300]">
              AI
            </span>
          </motion.h1>

          <motion.p
            className="text-center text-gray-400 text-base max-w-xl mt-6 leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            We help brands look better, sell better, and grow faster, through
            design, marketing, and smart systems that actually work in the real
            world.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row items-center gap-4 mt-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
          >
            <Link href="/contact" className="flex items-center gap-2 bg-[#EB7300] hover:bg-[#EB7300] font-medium transition text-white active:scale-95 rounded-full px-8 h-12 shadow-[0_0_20px_rgba(255,77,0,0.3)]">
              Let’s build something that grows
              <ArrowRight className="size-5" />
            </Link>
            <Link href="/#agency-statement" className="group flex items-center justify-center relative border border-slate-700 text-gray-300 active:scale-95 hover:bg-white/5 transition rounded-full px-8 h-12">
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
              Explore how we work
            </Link>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full z-0 flex justify-center translate-y-[10%] pointer-events-none">
        <HeroGlobe />
      </div>
    </motion.section>
  );
}