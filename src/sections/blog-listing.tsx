"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { BLOGS, CATEGORIES, type Category } from "@/data/blogs";

/* ── Animation variants ─────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

/* Card reveal — different delays per column for a cascade effect */
const cardReveal = (index: number): Variants => ({
    hidden: {
        opacity: 0,
        y: 80,
        scale: 0.96,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.9,
            delay: (index % 3) * 0.18,
            ease: [0.22, 1, 0.36, 1],
        },
    },
});

/* Image reveal — slides the image up from within the container */
const imageReveal: Variants = {
    hidden: { scale: 1.15, y: 30 },
    visible: {
        scale: 1,
        y: 0,
        transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

/* ── Format date helper ─────────────────────────────────────────── */
function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/* ── Blog Card — with mouse-following View Blog button ──────────── */
function BlogCard({
    slug,
    title,
    category,
    date,
    author,
    excerpt,
    coverImage,
    index,
}: {
    slug: string;
    title: string;
    category: string;
    date: string;
    author: string;
    excerpt: string;
    coverImage: string;
    index: number;
}) {
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    /* Raw cursor position (relative to container) */
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    /* Smooth spring follow */
    const btnX = useSpring(rawX, { stiffness: 150, damping: 20 });
    const btnY = useSpring(rawY, { stiffness: 150, damping: 20 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!imageContainerRef.current) return;
            const rect = imageContainerRef.current.getBoundingClientRect();
            rawX.set(e.clientX - rect.left);
            rawY.set(e.clientY - rect.top);
        },
        [rawX, rawY]
    );

    return (
        <motion.div
            variants={cardReveal(index)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
        >
            <Link href={`/blogs/${slug}`} className="block group">
                {/* Image container */}
                <div
                    ref={imageContainerRef}
                    className="relative overflow-hidden rounded-xl aspect-[4/3] mb-5 cursor-none"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={handleMouseMove}
                >
                    {/* Image with zoom on hover + reveal animation */}
                    <motion.img
                        src={coverImage}
                        alt={title}
                        variants={imageReveal}
                        className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
                    />

                    {/* Dark overlay on hover */}
                    <div
                        className="absolute inset-0 transition-[background-color] duration-500 ease-out"
                        style={{
                            backgroundColor: isHovering
                                ? "rgba(0,0,0,0.35)"
                                : "rgba(0,0,0,0)",
                        }}
                    />

                    {/* Mouse-following "View Blog" button */}
                    <motion.div
                        className="absolute top-0 left-0 pointer-events-none z-10"
                        style={{ x: btnX, y: btnY }}
                    >
                        <motion.div
                            className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{
                                opacity: isHovering ? 1 : 0,
                                scale: isHovering ? 1 : 0.6,
                            }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <span
                                className="px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap"
                                style={{
                                    background:
                                        "linear-gradient(135deg, rgba(235,115,0,0.85), rgba(255,154,0,0.75))",
                                    color: "#fff",
                                    border: "1px solid rgba(255,200,120,0.3)",
                                    boxShadow:
                                        "0 0 25px rgba(235,115,0,0.4), 0 4px 15px rgba(0,0,0,0.3)",
                                }}
                            >
                                View Blog
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Category badge */}
                    <span
                        className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-[0.3em] rounded-full px-3.5 py-1.5"
                        style={{
                            background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(8px)",
                            color: "#EB7300",
                            border: "1px solid rgba(235,115,0,0.2)",
                        }}
                    >
                        {category}
                    </span>
                </div>

                {/* Text content below image */}
                <div className="space-y-3">
                    <h3
                        className="font-black text-white text-xl md:text-2xl leading-tight transition-colors duration-300 group-hover:text-[#EB7300]"
                        style={{ letterSpacing: "-0.02em" }}
                    >
                        {title}
                    </h3>

                    <p
                        className="text-sm leading-relaxed line-clamp-2"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                        {excerpt}
                    </p>

                    {/* Author + Date row */}
                    <div className="flex items-center justify-between pt-1">
                        <span
                            className="text-[11px] tracking-wide"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                            By{" "}
                            <span style={{ color: "rgba(255,255,255,0.6)" }}>
                                {author}
                            </span>
                        </span>
                        <span
                            className="text-[11px] tracking-wide"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                            {formatDate(date)}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ── Main Listing Component ─────────────────────────────────────── */
export default function BlogListing() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");

    const filteredBlogs =
        activeCategory === "All"
            ? BLOGS
            : BLOGS.filter((b) => b.category === activeCategory);

    return (
        <section
            className="relative w-full"
            style={{ background: "#0a0a0a" }}
        >
            {/* Subtle top line */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 10%, rgba(235,115,0,0.15) 50%, transparent 90%)",
                }}
            />

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-36">
                {/* Section header */}
                <motion.div
                    className="mb-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                >
                    <motion.p
                        variants={fadeUp}
                        className="text-[9px] font-mono uppercase tracking-[0.55em] mb-4"
                        style={{ color: "#EB7300" }}
                    >
                        Latest Articles
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="font-black text-white"
                        style={{
                            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                            lineHeight: 1.05,
                            letterSpacing: "-0.025em",
                        }}
                    >
                        Ideas that{" "}
                        <span style={{ color: "#EB7300" }}>drive growth.</span>
                    </motion.h2>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    className="flex flex-wrap gap-2.5 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="relative text-[10px] font-mono uppercase tracking-[0.3em] rounded-full px-5 py-2.5 border transition-all duration-300"
                                style={{
                                    borderColor: isActive
                                        ? "rgba(235,115,0,0.5)"
                                        : "rgba(255,255,255,0.08)",
                                    color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                                    background: isActive
                                        ? "rgba(235,115,0,0.12)"
                                        : "transparent",
                                }}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Blog Grid — 2 column with cascade animations */}
                <AnimatePresence mode="popLayout">
                    {filteredBlogs.length > 0 ? (
                        <motion.div
                            key={activeCategory}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredBlogs.map((blog, i) => (
                                <BlogCard key={blog.slug} {...blog} index={i} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p
                                className="text-sm font-mono uppercase tracking-[0.3em]"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                                No articles in this category yet.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
