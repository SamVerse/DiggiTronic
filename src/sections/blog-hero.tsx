"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

const HERO_LINES = [
    { words: ["INSIGHTS"], accent: false },
    { words: ["THAT", "POWER"], accent: false },
    { words: ["DIGITAL", "GROWTH"], accent: true },
];

export default function BlogHero() {
    const sectionRef = useRef<HTMLElement>(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const glowX = useSpring(rawX, { stiffness: 35, damping: 20 });
    const glowY = useSpring(rawY, { stiffness: 35, damping: 20 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
    const sectionFilter = useTransform(
        scrollYProgress,
        [0, 1],
        ["brightness(1)", "brightness(0.5)"]
    );

    function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
        const { left, top, width, height } =
            sectionRef.current!.getBoundingClientRect();
        rawX.set(((e.clientX - left) / width - 0.5) * 60);
        rawY.set(((e.clientY - top) / height - 0.5) * 36);
    }
    function handleMouseLeave() {
        rawX.set(0);
        rawY.set(0);
    }

    /* Flatten all words for sequential delay index */
    let wordIndex = 0;

    return (
        <motion.section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
            style={{ background: "#0a0a0a", y: sectionY, filter: sectionFilter }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                aria-hidden
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: "700px",
                    height: "700px",
                    background:
                        "radial-gradient(circle, rgba(235,115,0,0.08) 0%, transparent 70%)",
                    top: "5%",
                    left: "15%",
                }}
                animate={{ x: [0, 35, 0], y: [0, -25, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: "500px",
                    height: "500px",
                    background:
                        "radial-gradient(circle, rgba(235,115,0,0.05) 0%, transparent 70%)",
                    bottom: "10%",
                    right: "10%",
                }}
                animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                }}
            />

            <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ x: glowX, y: glowY }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(235,115,0,0.10) 0%, transparent 70%)",
                    }}
                />
            </motion.div>

            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.022]"
                style={{
                    backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 72px)
          `,
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl">
                <motion.p
                    className="text-[9px] font-mono uppercase tracking-[0.6em] mb-8"
                    style={{ color: "#EB7300" }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    Our Blog
                </motion.p>

                {/* Headline — word-clip reveal */}
                <div className="mb-8">
                    {HERO_LINES.map((line, li) => (
                        <div key={li} className="overflow-hidden">
                            <div
                                className="font-black flex flex-wrap justify-center gap-x-[0.25em] leading-[0.9]"
                                style={{
                                    fontSize: "clamp(2.2rem, 5.5vw, 6rem)",
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                {line.words.map((word, wi) => {
                                    const isAccentLine = line.accent;
                                    const isLastWord =
                                        li === HERO_LINES.length - 1 &&
                                        wi === line.words.length - 1;
                                    const idx = wordIndex++;
                                    return (
                                        <div key={wi} className="overflow-hidden">
                                            <motion.span
                                                className="block"
                                                style={{
                                                    color: isAccentLine ? "#EB7300" : "#ffffff",
                                                }}
                                                initial={{ y: "110%", opacity: 0 }}
                                                animate={{ y: "0%", opacity: 1 }}
                                                transition={{
                                                    delay: 0.2 + idx * 0.06,
                                                    duration: 0.75,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                            >
                                                {word}
                                            </motion.span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <motion.p
                    className="text-sm md:text-base leading-relaxed max-w-lg mx-auto"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.75, ease: "easeOut" }}
                >
                    Explore ideas, strategies, and industry insights from the DiggiTronic
                    team.
                </motion.p>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
            >
                <span
                    className="text-[8px] font-mono uppercase tracking-[0.5em]"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                >
                    Scroll
                </span>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2], y: [0, 5, 0] }}
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            delay: i * 0.18,
                            ease: "easeInOut",
                        }}
                    >
                        <ChevronDown
                            size={16}
                            strokeWidth={2}
                            style={{ color: "#EB7300" }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}
