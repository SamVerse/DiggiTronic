"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Palette,
    Code,
    TrendingUp,
    Search,
    Cpu,
    Film,
    Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import HeroCube from "./hero-cube";

// ── Constants ─────────────────────────────────────────────────────────────────
const ORBITAL_SIZE = 560;
const CUBE_SIZE = 290;

// ── Orbit data — agency services ──────────────────────────────────────────────
const ORBITS: {
    radius: number;
    duration: number;
    delay: number;
    items: { Icon: LucideIcon; label: string; startAngle: number }[];
}[] = [
        {
            radius: 140,
            duration: 20,
            delay: 0.1,
            items: [
                { Icon: Palette, label: "Design", startAngle: 15 },
                { Icon: Code, label: "Development", startAngle: 195 },
            ],
        },
        {
            radius: 200,
            duration: 28,
            delay: 0.2,
            items: [
                { Icon: TrendingUp, label: "Marketing", startAngle: 60 },
                { Icon: Search, label: "SEO", startAngle: 240 },
            ],
        },
        {
            radius: 260,
            duration: 38,
            delay: 0.3,
            items: [
                { Icon: Cpu, label: "AI", startAngle: 20 },
                { Icon: Film, label: "Video", startAngle: 140 },
                { Icon: Share2, label: "Social", startAngle: 260 },
            ],
        },
    ];

export default function AgencyCube() {
    const [isLanded, setIsLanded] = useState(false);

    return (
        <motion.div
            className="relative w-full h-full flex justify-center items-center"
            initial={{ y: -200, opacity: 0, scale: 0.85 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{
                type: "spring",
                stiffness: 60,
                damping: 14,
                mass: 1.2,
                delay: 0.1,
            }}
            onAnimationComplete={(definition) => {
                if (definition === "whileInView" || typeof definition === "object") {
                    setIsLanded(true);
                }
            }}
        >
            <div
                className="relative flex items-center justify-center"
                style={{ width: ORBITAL_SIZE, height: ORBITAL_SIZE }}
            >
                {/* ── Radial glow ──────────────────────────────────────────────────── */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 220,
                        height: 220,
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255,77,0,0.18) 0%, transparent 70%)",
                        filter: "blur(32px)",
                        pointerEvents: "none"
                    }}
                />

                {/* ── Three.js cube canvas ─────────────────────────────────────────── */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: CUBE_SIZE,
                        height: CUBE_SIZE,
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none"
                    }}
                >
                    <HeroCube />
                </div>

                {/* ── Orbital system — pops in when cube lands ─────────────────────── */}
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                    {ORBITS.map((orbit, oi) => (
                        <motion.div
                            key={oi}
                            style={{ position: "absolute", inset: 0 }}
                            initial={false}
                            animate={
                                isLanded
                                    ? { scale: 1, opacity: 1 }
                                    : { scale: 0, opacity: 0 }
                            }
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 18,
                                delay: orbit.delay,
                            }}
                        >
                            {/* Orbit ring — 2px solid for visible thickness */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    width: orbit.radius * 2,
                                    height: orbit.radius * 2,
                                    marginTop: -orbit.radius,
                                    marginLeft: -orbit.radius,
                                    borderRadius: "50%",
                                    border: `3px solid rgba(0,0,0,${0.12 - oi * 0.02})`,
                                }}
                            />

                            {/* Icon+Label Items on this orbit */}
                            {orbit.items.map(({ Icon, label, startAngle }, ii) => (
                                <motion.div
                                    key={label}
                                    initial={false}
                                    animate={
                                        isLanded
                                            ? { scale: 1, opacity: 1 }
                                            : { scale: 0, opacity: 0 }
                                    }
                                    transition={{
                                        type: "spring",
                                        stiffness: 420,
                                        damping: 20,
                                        delay: orbit.delay + 0.28 + ii * 0.12,
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        width: 0,
                                        height: 0,
                                    }}
                                >
                                    <motion.div
                                        initial={{ rotate: startAngle }}
                                        animate={{ rotate: startAngle + 360 }}
                                        transition={{
                                            duration: orbit.duration,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        style={{ width: 0, height: 0 }}
                                    >
                                        <motion.div
                                            initial={{ rotate: -startAngle }}
                                            animate={{ rotate: -(startAngle + 360) }}
                                            transition={{
                                                duration: orbit.duration,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                            style={{
                                                position: "absolute",
                                                x: orbit.radius - 24,
                                                y: -24,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: "50%",
                                                    background: "white",
                                                    border: "2px solid rgba(255,77,0,0.35)",
                                                    boxShadow: "0 4px 16px rgba(255,77,0,0.12), 0 0 0 3px rgba(255,77,0,0.06)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                title={label}
                                            >
                                                <Icon size={22} color="#ff4d00" strokeWidth={2.0} />
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
