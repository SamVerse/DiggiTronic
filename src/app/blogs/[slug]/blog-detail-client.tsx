"use client";

import { useRef } from "react";
import {
    motion,
    Variants,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import Link from "next/link";
import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { Blog } from "@/data/blogs";
import { getRelatedBlogs } from "@/data/blogs";

/* ── Animation variants ─────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.75, ease: "easeOut" },
    },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

/* ── Format date helper ─────────────────────────────────────────── */
function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/* ── Share Icons ─────────────────────────────────────────────────── */
function XIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

/* ── Related Blog Card ──────────────────────────────────────────── */
function RelatedCard({ blog }: { blog: Blog }) {
    return (
        <Link href={`/blogs/${blog.slug}`} className="block group">
            <motion.div
                className="related-card rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden flex flex-col"
                whileHover={{ y: -8, borderColor: "rgba(235,115,0,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 50%)",
                        }}
                    />
                    <span
                        className="absolute top-4 left-4 text-[9px] font-mono uppercase tracking-[0.4em] rounded-full px-3 py-1.5 backdrop-blur-md"
                        style={{
                            background: "rgba(235,115,0,0.15)",
                            color: "#EB7300",
                            border: "1px solid rgba(235,115,0,0.25)",
                        }}
                    >
                        {blog.category}
                    </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    <h3
                        className="font-black text-white text-lg leading-tight mb-3 transition-colors duration-300 group-hover:text-[#EB7300]"
                        style={{ letterSpacing: "-0.02em" }}
                    >
                        {blog.title}
                    </h3>
                    <p
                        className="text-sm leading-relaxed line-clamp-2 mb-4"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                        {blog.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                        <span
                            className="text-[9px] font-mono uppercase tracking-[0.35em]"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                            {blog.readTime}
                        </span>
                        <span style={{ color: "#EB7300", fontSize: "8px" }}>●</span>
                        <span
                            className="text-[9px] font-mono uppercase tracking-[0.35em]"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                            {formatDate(blog.date)}
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function BlogDetailClient({ blog }: { blog: Blog }) {
    const articleRef = useRef<HTMLElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);
    const words = blog.title.split(" ");
    const relatedBlogs = getRelatedBlogs(blog.slug, 3);

    /* Reading progress */
    const { scrollYProgress } = useScroll({
        target: articleRef,
        offset: ["start start", "end end"],
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    /* Hero parallax */
    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: heroImageRef,
        offset: ["start start", "end start"],
    });
    const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);

    /* Build share URLs */
    const blogUrl = typeof window !== "undefined"
        ? window.location.href
        : `https://digitronic.in/blogs/${blog.slug}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blog.title)}`;
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`;

    return (
        <>
            <LenisScroll />
            <Navbar />

            {/* ── Reading progress bar ────────────────────────────────── */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
                style={{
                    scaleX: smoothProgress,
                    background: "linear-gradient(90deg, #EB7300, #ff9a00)",
                }}
            />

            <main
                ref={articleRef}
                className="relative overflow-x-hidden"
                style={{ background: "#0a0a0a" }}
            >
                {/* ── Hero Section ────────────────────────────────────────── */}
                <section className="relative w-full overflow-hidden">
                    {/* Cover image with parallax */}
                    <div
                        ref={heroImageRef}
                        className="relative w-full overflow-hidden"
                        style={{ height: "70vh", minHeight: "500px" }}
                    >
                        <motion.div className="absolute inset-0" style={{ y: heroY }}>
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-[130%] object-cover"
                            />
                        </motion.div>

                        {/* Dark overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(to top, #0a0a0a 0%, rgba(5,5,5,0.7) 40%, rgba(5,5,5,0.3) 100%)",
                            }}
                        />
                    </div>

                    {/* Hero content overlapping bottom of image */}
                    <div
                        className="relative z-10 max-w-3xl mx-auto px-6"
                        style={{ marginTop: "-12rem" }}
                    >
                        {/* Back link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.3em] px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                                style={{
                                    color: "#fff",
                                    background: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                }}
                            >
                                ← All Articles
                            </Link>
                        </motion.div>

                        {/* Category + Meta */}
                        <motion.div
                            className="flex flex-wrap items-center gap-3 mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <span
                                className="text-[9px] font-mono uppercase tracking-[0.4em] rounded-full px-4 py-1.5"
                                style={{
                                    background: "rgba(235,115,0,0.15)",
                                    color: "#EB7300",
                                    border: "1px solid rgba(235,115,0,0.25)",
                                }}
                            >
                                {blog.category}
                            </span>
                        </motion.div>

                        {/* Title — word-clip reveal */}
                        <div className="mb-6 flex flex-wrap gap-x-[0.22em]">
                            {words.map((word, wi) => (
                                <div key={wi} className="overflow-hidden">
                                    <motion.span
                                        className="block font-black text-white"
                                        style={{
                                            fontSize: "clamp(2rem, 5vw, 3.8rem)",
                                            lineHeight: 1.05,
                                            letterSpacing: "-0.03em",
                                        }}
                                        initial={{ y: "110%", opacity: 0 }}
                                        animate={{ y: "0%", opacity: 1 }}
                                        transition={{
                                            delay: 0.15 + wi * 0.07,
                                            duration: 0.8,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                    >
                                        {word}
                                    </motion.span>
                                </div>
                            ))}
                        </div>

                        {/* Author row */}
                        <motion.div
                            className="flex items-center gap-4 pb-10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            {/* Author avatar */}
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                                style={{
                                    background: "linear-gradient(135deg, #EB7300, #ff9a00)",
                                    color: "#fff",
                                }}
                            >
                                {blog.author
                                    .split(" ")
                                    .map((w) => w[0])
                                    .join("")
                                    .slice(0, 2)}
                            </div>
                            <div>
                                <p
                                    className="text-sm font-black"
                                    style={{ color: "rgba(255,255,255,0.8)" }}
                                >
                                    {blog.author}
                                </p>
                                <p
                                    className="text-[10px] font-mono uppercase tracking-[0.3em]"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    Published {formatDate(blog.date)}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Meta Grid — Date / Author / Time / Share ────────────── */}
                <section className="relative w-full">
                    <div className="max-w-3xl mx-auto px-6">
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y"
                            style={{ borderColor: "rgba(255,255,255,0.08)" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {/* Date */}
                            <div>
                                <p
                                    className="text-[10px] font-mono uppercase tracking-[0.35em] mb-2"
                                    style={{ color: "#EB7300" }}
                                >
                                    Date
                                </p>
                                <p
                                    className="text-base font-bold"
                                    style={{ color: "rgba(255,255,255,0.85)" }}
                                >
                                    {formatDate(blog.date)}
                                </p>
                            </div>

                            {/* Author */}
                            <div>
                                <p
                                    className="text-[10px] font-mono uppercase tracking-[0.35em] mb-2"
                                    style={{ color: "#EB7300" }}
                                >
                                    Author
                                </p>
                                <p
                                    className="text-base font-bold"
                                    style={{ color: "rgba(255,255,255,0.85)" }}
                                >
                                    {blog.author}
                                </p>
                            </div>

                            {/* Time */}
                            <div>
                                <p
                                    className="text-[10px] font-mono uppercase tracking-[0.35em] mb-2"
                                    style={{ color: "#EB7300" }}
                                >
                                    Time
                                </p>
                                <p
                                    className="text-base font-bold"
                                    style={{ color: "rgba(255,255,255,0.85)" }}
                                >
                                    {blog.readTime}
                                </p>
                            </div>

                            {/* Share this post */}
                            <div>
                                <p
                                    className="text-[10px] font-mono uppercase tracking-[0.35em] mb-2"
                                    style={{ color: "#EB7300" }}
                                >
                                    Share this post
                                </p>
                                <div className="flex items-center gap-3">
                                    <a
                                        href={twitterShareUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors duration-200 hover:text-[#EB7300]"
                                        style={{ color: "rgba(255,255,255,0.85)" }}
                                        aria-label="Share on X"
                                    >
                                        <XIcon />
                                    </a>
                                    <a
                                        href={linkedInShareUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors duration-200 hover:text-[#EB7300]"
                                        style={{ color: "rgba(255,255,255,0.85)" }}
                                        aria-label="Share on LinkedIn"
                                    >
                                        <LinkedInIcon />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Article Content ─────────────────────────────────────── */}
                <section className="relative w-full">
                    <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
                        {/* Blog content */}
                        <motion.div
                            className="blog-content"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={fadeUp}
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>
                </section>

                {/* ── Related Articles ────────────────────────────────────── */}
                {relatedBlogs.length > 0 && (
                    <section
                        className="relative w-full"
                        style={{ background: "#050505" }}
                    >
                        <div
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent, rgba(235,115,0,0.15), transparent)",
                            }}
                        />
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background:
                                    "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(235,115,0,0.04) 0%, transparent 70%)",
                            }}
                        />

                        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
                            <motion.div
                                className="mb-14"
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
                                    Keep Reading
                                </motion.p>
                                <motion.h2
                                    variants={fadeUp}
                                    className="font-black text-white"
                                    style={{
                                        fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                                        lineHeight: 0.95,
                                        letterSpacing: "-0.025em",
                                    }}
                                >
                                    Related
                                    <br />
                                    <span style={{ color: "#EB7300" }}>articles.</span>
                                </motion.h2>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedBlogs.map((related) => (
                                    <RelatedCard key={related.slug} blog={related} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />

            {/* ── Blog content styles ───────────────────────────────────── */}
            <style jsx global>{`
        /* ─── Base typography ─────────────────────────────────────── */
        .blog-content h2 {
          font-weight: 900;
          color: #ffffff;
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
        }

        .blog-content h3 {
          font-weight: 800;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.15rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
        }

        .blog-content p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
          line-height: 1.9;
          margin-bottom: 1.25rem;
        }

        .blog-content p.blog-intro {
          color: rgba(255, 255, 255, 0.65);
          font-size: 1.1rem;
          line-height: 1.85;
          margin-bottom: 2rem;
        }

        .blog-content p em,
        .blog-content em {
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
        }

        .blog-content strong {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 800;
        }

        /* ─── Blockquotes ─────────────────────────────────────────── */
        .blog-content blockquote {
          position: relative;
          margin: 2.5rem 0;
          padding: 1.5rem 1.75rem;
          border-left: 3px solid #eb7300;
          background: rgba(235, 115, 0, 0.04);
          border-radius: 0 0.75rem 0.75rem 0;
        }

        .blog-content blockquote p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.05rem;
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 0.5rem;
        }

        .blog-content blockquote cite {
          display: block;
          color: #eb7300;
          font-size: 0.75rem;
          font-style: normal;
          font-family: monospace;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-top: 0.5rem;
        }

        /* ─── Callout boxes ───────────────────────────────────────── */
        .blog-content .blog-callout {
          margin: 2rem 0;
          padding: 1.25rem 1.5rem;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .blog-content .blog-callout strong {
          color: #eb7300;
          font-weight: 900;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ─── Code blocks ─────────────────────────────────────────── */
        .blog-content pre {
          margin: 2rem 0;
          padding: 1.5rem;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          overflow-x: auto;
          font-family: "Geist Mono", "Fira Code", monospace;
          font-size: 0.85rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .blog-content code {
          font-family: "Geist Mono", "Fira Code", monospace;
          font-size: 0.85em;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.15em 0.4em;
          border-radius: 4px;
          color: #eb7300;
        }

        .blog-content pre code {
          background: none;
          padding: 0;
          border-radius: 0;
          color: inherit;
        }

        /* ─── Images ──────────────────────────────────────────────── */
        .blog-content img {
          width: 100%;
          border-radius: 0.75rem;
          margin: 2rem 0;
          max-height: 480px;
          object-fit: cover;
        }

        .blog-content figure {
          margin: 2.5rem 0;
        }

        .blog-content figure img {
          margin-bottom: 0.75rem;
        }

        .blog-content figcaption {
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.8rem;
          text-align: center;
          font-style: italic;
        }

        /* ─── Lists ───────────────────────────────────────────────── */
        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .blog-content li {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
          line-height: 1.8;
          margin-bottom: 0.75rem;
        }

        .blog-content li::marker {
          color: #eb7300;
        }

        .blog-content ol li::marker {
          font-weight: 700;
        }

        /* ─── Horizontal rules ────────────────────────────────────── */
        .blog-content hr {
          border: none;
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin: 3rem 0;
        }

        /* ─── Links ───────────────────────────────────────────────── */
        .blog-content a {
          color: #eb7300;
          text-decoration: underline;
          text-decoration-color: rgba(235, 115, 0, 0.3);
          text-underline-offset: 3px;
          transition: text-decoration-color 0.2s;
        }

        .blog-content a:hover {
          text-decoration-color: #eb7300;
        }

        /* ─── Video embeds ────────────────────────────────────────── */
        .blog-content .video-embed {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          margin: 2rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
        }

        .blog-content .video-embed iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
        </>
    );
}
