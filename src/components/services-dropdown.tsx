"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const SERVICES = [
    {
        title: "Video Production",
        desc: "Stories that move — cinematic content for modern brands.",
        href: "/services/video-production",
    },
    {
        title: "Social Media",
        desc: "Scroll-stopping content strategy that builds real community.",
        href: "/services/social-media",
    },
    {
        title: "Development",
        desc: "Precision-engineered digital experiences that perform at scale.",
        href: "/services/development",
    },
    {
        title: "Marketing",
        desc: "Data-driven campaigns built to acquire, convert, and retain.",
        href: "/services/marketing",
    },
    {
        title: "SEO",
        desc: "Organic visibility engineered for lasting competitive advantage.",
        href: "/services/seo",
    },
    {
        title: "AI Services",
        desc: "Intelligent automation that scales your brand efficiently.",
        href: "/services/ai-services",
    },
    {
        title: "Graphics & Animation",
        desc: "Visual language crafted to elevate every brand touchpoint.",
        href: "/services/graphics-animation",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.28, ease: "easeOut" },
    },
};

interface Props {
    isOpen: boolean;
    isLightSection: boolean;
    onClose: () => void;
}

export default function ServicesDropdown({ isOpen, isLightSection, onClose }: Props) {
    const isDark = !isLightSection;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="absolute top-full left-1/2 mt-3 w-[780px] rounded-2xl overflow-hidden"
                    style={{
                        x: "-50%",
                        background: isDark ? "rgba(8, 8, 8, 0.97)" : "rgba(255, 255, 255, 0.97)",
                        border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                        boxShadow: isDark
                            ? "0 24px 80px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
                            : "0 12px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                        backdropFilter: "blur(24px) saturate(180%)",
                        WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    }}
                    initial={{ opacity: 0, y: -10, filter: "blur(6px)", scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, y: -6, filter: "blur(4px)", scale: 0.99 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                            background: "linear-gradient(90deg, transparent, #EB7300, transparent)",
                            opacity: isDark ? 0.5 : 0.35,
                        }}
                    />

                    <motion.div
                        className="grid grid-cols-2 gap-px p-2"
                        style={{
                            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                        }}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {SERVICES.map((service) => (
                            <motion.div key={service.title} variants={itemVariants}>
                                <Link
                                    href={service.href}
                                    onClick={onClose}
                                    className="group relative flex items-center gap-3 rounded-xl px-4 py-3.5 overflow-hidden transition-colors duration-200"
                                    style={{
                                        background: "transparent",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = isDark
                                            ? "rgba(255,255,255,0.04)"
                                            : "rgba(0,0,0,0.035)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = "transparent";
                                    }}
                                >
                                    <div
                                        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"
                                        style={{ background: "#EB7300" }}
                                    />

                                    <div className="flex-1 min-w-0 pl-1">
                                        <p
                                            className="text-[13px] font-semibold leading-tight transition-colors duration-200"
                                            style={{ color: isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.88)" }}
                                        >
                                            {service.title}
                                        </p>
                                        <p
                                            className="text-[11px] mt-0.5 leading-snug transition-colors duration-200"
                                            style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)" }}
                                        >
                                            {service.desc}
                                        </p>
                                    </div>

                                    <ArrowRight
                                        size={13}
                                        className="shrink-0 opacity-0 -translate-x-1 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                                        style={{ color: "#EB7300" }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div
                        className="px-4 py-3 flex items-center justify-between"
                        style={{
                            borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                        }}
                    >
                        <p
                            className="text-[10px] uppercase tracking-[0.4em] font-mono"
                            style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)" }}
                        >
                            What we do
                        </p>
                        {/* <Link
                            href="#services"
                            onClick={onClose}
                            className="group inline-flex items-center gap-1.5 text-[11px] font-semibold transition-colors duration-200"
                            style={{ color: "#EB7300" }}
                        >
                            View all services
                            <ArrowRight
                                size={11}
                                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                            />
                        </Link> */}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
