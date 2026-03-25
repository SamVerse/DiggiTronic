"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// CubeAmbient — cinematic ground-plane + energy FX behind the floating cube.
// Positioned in the hero section, fades out as the user scrolls.

function Particle({
    delay,
    duration,
    size,
    left,
    startY,
}: {
    delay: number;
    duration: number;
    size: number;
    left: string;
    startY: string;
}) {
    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: size,
                height: size,
                left,
                bottom: startY,
                background: `radial-gradient(circle, rgba(255,77,0,${0.6 + Math.random() * 0.3}) 0%, transparent 70%)`,
                filter: "blur(0.5px)",
            }}
            animate={{
                y: [0, -(80 + Math.random() * 120)],
                opacity: [0, 0.9, 0],
                scale: [0.5, 1.2, 0.3],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeOut",
            }}
        />
    );
}

function ScanLine({ delay, duration }: { delay: number; duration: number }) {
    return (
        <motion.div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
                height: 1,
                background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,77,0,0.2) 30%, rgba(255,77,0,0.45) 50%, rgba(255,77,0,0.2) 70%, transparent 100%)",
            }}
            initial={{ top: "100%", opacity: 0 }}
            animate={{ top: "0%", opacity: [0, 1, 0] }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}

export default function CubeAmbient() {
    const ref = useRef<HTMLDivElement>(null);

    // Fade the entire ambient layer as the page scrolls
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end start"],
    });
    const ambientOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let rafId = 0;
        let t = 0;

        const resize = () => {
            canvas.width = canvas.clientWidth * Math.min(window.devicePixelRatio, 2);
            canvas.height = canvas.clientHeight * Math.min(window.devicePixelRatio, 2);
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            rafId = requestAnimationFrame(draw);
            t += 0.003;

            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            // Vanishing point — center-X, slightly above center-Y
            const vpX = W * 0.5;
            const vpY = H * 0.35;

            // Bottom edge (ground plane horizon)
            const groundY = H * 0.92;

            const hLines = 14;
            for (let i = 0; i <= hLines; i++) {
                const progress = i / hLines; // 0 → 1  (horizon → bottom)
                const yy = vpY + (groundY - vpY) * Math.pow(progress, 1.6);

                // Spread factor — lines widen as they approach the viewer
                const spread = 0.15 + progress * 0.85;
                const xLeft = vpX - W * 0.54 * spread;
                const xRight = vpX + W * 0.54 * spread;

                const pulse = 0.5 + Math.sin(t * 2 + i * 0.6) * 0.25;
                const alpha = (0.06 + progress * 0.12) * pulse;

                ctx.beginPath();
                ctx.moveTo(xLeft, yy);
                ctx.lineTo(xRight, yy);
                ctx.strokeStyle = `rgba(255, 77, 0, ${alpha})`;
                ctx.lineWidth = 0.6 + progress * 0.6;
                ctx.stroke();
            }

            const vLines = 18;
            for (let i = 0; i <= vLines; i++) {
                const ratio = i / vLines;
                const bx = (vpX - W * 0.54) + W * 1.08 * ratio;

                const pulse = 0.5 + Math.sin(t * 1.5 + i * 0.5) * 0.3;
                const alpha = 0.04 + Math.abs(ratio - 0.5) * 0.06;

                ctx.beginPath();
                ctx.moveTo(vpX, vpY);
                ctx.lineTo(bx, groundY);
                ctx.strokeStyle = `rgba(255, 77, 0, ${alpha * pulse})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            const rings = 4;
            for (let r = 0; r < rings; r++) {
                const baseRadius = 40 + r * 55;
                const breathe = Math.sin(t * 1.2 + r * 1.5) * 8;
                const radius = baseRadius + breathe;
                const alpha = (0.08 - r * 0.015) * (0.7 + Math.sin(t * 2 + r) * 0.3);

                ctx.beginPath();
                ctx.arc(vpX, vpY + 30, radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 77, 0, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            const glowRadius = 60 + Math.sin(t * 1.8) * 10;
            const gradient = ctx.createRadialGradient(vpX, vpY + 30, 0, vpX, vpY + 30, glowRadius);
            gradient.addColorStop(0, `rgba(255, 77, 0, ${0.12 + Math.sin(t * 2) * 0.05})`);
            gradient.addColorStop(0.5, "rgba(255, 77, 0, 0.04)");
            gradient.addColorStop(1, "rgba(255, 77, 0, 0)");

            ctx.beginPath();
            ctx.arc(vpX, vpY + 30, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        };

        draw();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    const particles = Array.from({ length: 16 }, (_, i) => ({
        id: i,
        delay: i * 0.5 + Math.random() * 2,
        duration: 3 + Math.random() * 3,
        size: 2 + Math.random() * 3,
        left: `${20 + Math.random() * 60}%`,
        startY: `${5 + Math.random() * 20}%`,
    }));

    return (
        <motion.div
            ref={ref}
            className="absolute inset-0 pointer-events-none z-5"
            style={{ opacity: ambientOpacity }}
        >
            <canvas
                ref={canvasRef}
                className="absolute w-full h-full"
                style={{ bottom: 0, left: 0 }}
            />

            <div
                className="absolute"
                style={{
                    left: "50%",
                    top: "68%",
                    width: 600,
                    height: 600,
                    transform: "translate(-50%, -50%)",
                    background:
                        "radial-gradient(ellipse at center, rgba(255,77,0,0.10) 0%, rgba(255,77,0,0.03) 40%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            <div
                className="absolute"
                style={{
                    left: "50%",
                    bottom: "4%",
                    width: 420,
                    height: 80,
                    transform: "translateX(-50%)",
                    background:
                        "radial-gradient(ellipse at center, rgba(255,77,0,0.15) 0%, transparent 70%)",
                    filter: "blur(30px)",
                }}
            />

            <div className="absolute inset-0 overflow-hidden">
                <ScanLine delay={0} duration={6} />
                <ScanLine delay={2} duration={7} />
                <ScanLine delay={4.5} duration={5.5} />
            </div>

            <div className="absolute inset-0 overflow-hidden">
                {particles.map((p) => (
                    <Particle key={p.id} {...p} />
                ))}
            </div>

            <motion.div
                className="absolute"
                style={{
                    left: "18%",
                    bottom: "15%",
                    width: 120,
                    height: 1,
                    background:
                        "linear-gradient(90deg, rgba(255,77,0,0.3), transparent)",
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute"
                style={{
                    left: "18%",
                    bottom: "15%",
                    width: 1,
                    height: 80,
                    background:
                        "linear-gradient(180deg, transparent, rgba(255,77,0,0.3))",
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                    duration: 3,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute"
                style={{
                    right: "18%",
                    bottom: "15%",
                    width: 120,
                    height: 1,
                    background:
                        "linear-gradient(270deg, rgba(255,77,0,0.3), transparent)",
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                    duration: 3,
                    delay: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute"
                style={{
                    right: "18%",
                    bottom: "15%",
                    width: 1,
                    height: 80,
                    background:
                        "linear-gradient(180deg, transparent, rgba(255,77,0,0.3))",
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                    duration: 3,
                    delay: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.span
                className="absolute text-[8px] font-mono uppercase tracking-[0.4em] select-none"
                style={{ left: "22%", bottom: "18%", color: "rgba(255,77,0,0.30)" }}
                animate={{ opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                Design System
            </motion.span>
            <motion.span
                className="absolute text-[8px] font-mono uppercase tracking-[0.4em] select-none"
                style={{ right: "22%", bottom: "18%", color: "rgba(255,77,0,0.30)" }}
                animate={{ opacity: [0.15, 0.4, 0.15] }}
                transition={{
                    duration: 4,
                    delay: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                AI Engine
            </motion.span>
            <motion.span
                className="absolute text-[8px] font-mono uppercase tracking-[0.4em] select-none"
                style={{ left: "50%", bottom: "6%", transform: "translateX(-50%)", color: "rgba(255,77,0,0.25)" }}
                animate={{ opacity: [0.1, 0.35, 0.1] }}
                transition={{
                    duration: 5,
                    delay: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                Growth Platform
            </motion.span>
        </motion.div>
    );
}
