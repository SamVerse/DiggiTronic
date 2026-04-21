"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const COMPANY_LINKS = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blogs" },
];

const SERVICE_LINKS = [
    { label: "Graphics & Animation", href: "/services/graphics-animation" },
    { label: "Video Production", href: "/services/video-production" },
    { label: "Social Media", href: "/services/social-media" },
    { label: "Development", href: "/services/development" },
    { label: "Marketing", href: "/services/marketing" },
    { label: "SEO", href: "/services/seo" },
    { label: "AI Services", href: "/services/ai-services" },
];

const LEGAL_LINKS = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
];

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

function InstagramIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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

function YouTubeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
        </svg>
    );
}

function PinterestIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
    );
}

function BehanceIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-.16 1.35-.49.36-1.06.62-1.7.78-.64.17-1.32.25-2.03.25H0V4.51h6.938zM16.94 6.09h5.07v1.35h-5.07V6.09zm-1.78 8.96c.234.37.573.55 1.014.55.3 0 .558-.08.77-.26.21-.17.35-.38.42-.63h2.24c-.22.79-.6 1.38-1.14 1.77-.55.39-1.2.58-1.96.58-.53 0-1.01-.09-1.44-.27-.43-.18-.8-.44-1.1-.77-.3-.33-.54-.73-.7-1.18-.17-.46-.25-.96-.25-1.5 0-.52.08-1.01.25-1.47.17-.46.41-.86.72-1.2.31-.34.69-.6 1.12-.8.43-.19.91-.29 1.43-.29.58 0 1.09.11 1.53.33.44.22.8.52 1.08.9.28.38.48.82.6 1.32.12.5.16 1.03.12 1.57h-4.94c.01.48.13.87.24 1.12zm1.64-3.38c-.2-.34-.54-.51-1.01-.51-.3 0-.55.06-.76.17-.2.11-.36.26-.48.43-.12.17-.2.36-.24.56-.04.2-.07.39-.07.57h2.93c-.08-.5-.19-.88-.37-1.22zM4.84 10.29h1.58c.22 0 .43-.02.63-.07.2-.05.38-.13.53-.24.15-.11.27-.26.36-.44.09-.19.13-.42.13-.7 0-.52-.14-.9-.43-1.12-.29-.23-.68-.34-1.17-.34H4.84v2.91zm0 4.67h1.83c.26 0 .5-.03.72-.08.22-.05.41-.14.58-.27.17-.13.3-.3.4-.51.1-.21.15-.48.15-.8 0-.62-.17-1.07-.51-1.35-.34-.28-.81-.42-1.41-.42H4.84v3.43z" />
        </svg>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="relative w-full overflow-hidden"
            style={{ background: "#080808" }}
        >
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background: "linear-gradient(to right, #ff4d00, #ff6a00 30%, transparent 65%)",
                }}
            />

            <div
                aria-hidden
                className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
            >
                <span
                    className="font-black leading-none text-center"
                    style={{
                        fontSize: "clamp(4rem, 20vw, 22rem)",
                        color: "#ffffff",
                        opacity: 0.025,
                        letterSpacing: "-0.04em",
                        transform: "translateY(15%)",
                    }}
                >
                    DIGITRONIC
                </span>
            </div>

            <div
                aria-hidden
                className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 60% at 0% 100%, rgba(255,77,0,0.05) 0%, transparent 70%)",
                }}
            />

            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
                variants={staggerContainer}
            >

                <motion.div
                    variants={fadeUp}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                    <div className="flex items-center gap-4">
                        <Image
                            src="/logo row.png"
                            alt="Digitronic"
                            width={48}
                            height={48}
                            className="object-contain flex-shrink-0"
                        />
                        <div>
                            <p
                                className="font-black text-white"
                                style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
                            >
                                Digitronic
                            </p>
                            <p
                                className="text-xs mt-0.5 max-w-xs leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.35)" }}
                            >
                                Your Growth Partner for Design, Marketing &amp; AI
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-3">
                        <p
                            className="text-xs uppercase font-mono tracking-[0.25em]"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                            Ready to grow?
                        </p>
                        <motion.a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-sm text-white shrink-0"
                            style={{
                                background: "linear-gradient(135deg, #ff4d00, #ff6a00)",
                                boxShadow: "0 4px 24px rgba(255,77,0,0.3)",
                            }}
                            whileHover={{
                                scale: 1.04,
                                boxShadow: "0 6px 32px rgba(255,77,0,0.5)",
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            Book a Free Session
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                    <div>
                        <p
                            className="text-[9px] uppercase font-mono mb-5"
                            style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.55em" }}
                        >
                            Company
                        </p>
                        <ul className="flex flex-col gap-3">
                            {COMPANY_LINKS.map((link) => (
                                <li key={link.label}>
                                    <motion.a
                                        href={link.href}
                                        className="text-sm font-medium transition-colors duration-200"
                                        style={{ color: "rgba(255,255,255,0.45)" }}
                                        whileHover={{ x: 4, color: "#ffffff" }}
                                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p
                            className="text-[9px] uppercase font-mono mb-5"
                            style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.55em" }}
                        >
                            Services
                        </p>
                        <ul className="flex flex-col gap-3">
                            {SERVICE_LINKS.map((link) => (
                                <li key={link.label}>
                                    <motion.a
                                        href={link.href}
                                        className="text-sm font-medium transition-colors duration-200"
                                        style={{ color: "rgba(255,255,255,0.45)" }}
                                        whileHover={{ x: 4, color: "#ffffff" }}
                                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p
                            className="text-[9px] uppercase font-mono mb-5"
                            style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.55em" }}
                        >
                            Legal
                        </p>
                        <ul className="flex flex-col gap-3">
                            {LEGAL_LINKS.map((link) => (
                                <li key={link.label}>
                                    <motion.a
                                        href={link.href}
                                        className="text-sm font-medium transition-colors duration-200"
                                        style={{ color: "rgba(255,255,255,0.45)" }}
                                        whileHover={{ x: 4, color: "#ffffff" }}
                                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <p
                            className="text-[9px] uppercase font-mono mb-5"
                            style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.55em" }}
                        >
                            Contact
                        </p>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <motion.a
                                    href="mailto:hello@digitronic.in"
                                    className="text-sm font-medium transition-colors duration-200"
                                    style={{ color: "rgba(255,255,255,0.45)" }}
                                    whileHover={{ x: 4, color: "#ff4d00" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                >
                                    hello@digitronic.in
                                </motion.a>
                            </li>
                            <li>
                                <motion.a
                                    href="tel:+91XXXXXXXXXX"
                                    className="text-sm font-medium transition-colors duration-200"
                                    style={{ color: "rgba(255,255,255,0.45)" }}
                                    whileHover={{ x: 4, color: "#ffffff" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                >
                                    +91 XXX XXX XXXX
                                </motion.a>
                            </li>
                            <li>
                                <span
                                    className="text-sm font-medium"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    India
                                </span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
                >
                    <p
                        className="text-xs font-mono"
                        style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}
                    >
                        &copy; {year} Digitronic. All rights reserved.
                    </p>



                    <div className="flex items-center gap-4">
                        {[
                            { Icon: InstagramIcon, href: "https://www.instagram.com/diggitronic/", label: "Instagram" },
                            { Icon: YouTubeIcon, href: "https://www.youtube.com/@diggitronic", label: "YouTube" },
                            { Icon: LinkedInIcon, href: "https://www.linkedin.com/company/diggitronic.com/?viewAsMember=true", label: "LinkedIn" },
                            { Icon: PinterestIcon, href: "https://in.pinterest.com/Diggitronic/", label: "Pinterest" },
                            { Icon: BehanceIcon, href: "https://www.behance.net/shashanksharma34", label: "Behance" },
                        ].map(({ Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                style={{ color: "rgba(255,255,255,0.3)" }}
                                whileHover={{ scale: 1.2, color: "#ff4d00" }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
