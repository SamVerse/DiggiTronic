"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight, Film, Share2, Code, Megaphone, Search, Cpu, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ServicesDropdown from "./services-dropdown";
import type { LucideIcon } from "lucide-react";

const NAV_H = 72; // matches h-18 (4.5rem)

/** Walk up the DOM from `el` looking for data-navbar-theme. */
function getNavbarTheme(el: Element | null): "light" | "dark" | null {
    let node = el;
    while (node && node !== document.documentElement) {
        const theme = (node as HTMLElement).dataset?.navbarTheme;
        if (theme === "light" || theme === "dark") return theme;
        node = node.parentElement;
    }
    return null;
}

const MOBILE_SERVICES: { name: string; href: string; icon: LucideIcon }[] = [
    { name: "Video Production", href: "/services/video-production", icon: Film },
    { name: "Social Media", href: "/services/social-media", icon: Share2 },
    { name: "Development", href: "/services/development", icon: Code },
    { name: "Marketing", href: "/services/marketing", icon: Megaphone },
    { name: "SEO", href: "/services/seo", icon: Search },
    { name: "AI Services", href: "/services/ai-services", icon: Cpu },
    { name: "Graphics & Animation", href: "/services/graphics-animation", icon: Palette },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isLightSection, setIsLightSection] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    useEffect(() => {
        const update = () => {
            setScrolled(window.scrollY > 8);

            // Hide navbar from pointer events temporarily to allow elementFromPoint to "see" through the open dropdown
            const nav = document.getElementById("main-nav");
            let oldPointerEvents = "";
            if (nav) {
                oldPointerEvents = nav.style.pointerEvents;
                nav.style.pointerEvents = "none";
            }

            // Sample the pixel just below the navbar — honours CSS transforms/parallax
            const el = document.elementFromPoint(window.innerWidth / 2, NAV_H + 4);
            setIsLightSection(getNavbarTheme(el) === "light");

            if (nav) {
                nav.style.pointerEvents = oldPointerEvents;
            }
        };
        window.addEventListener("scroll", update, { passive: true });
        update();
        return () => window.removeEventListener("scroll", update);
    }, []);

    const navlinks = [
        { href: "/about", text: "About Us", hasDropdown: false },
        { href: "/#services", text: "Services", hasDropdown: true },
        { href: "/blogs", text: "Blogs", hasDropdown: false },
        { href: "/careers", text: "Careers", hasDropdown: false },
        { href: "/contact", text: "Contact Us", hasDropdown: false },
    ];

    const textColor = isLightSection ? "text-gray-800" : "text-slate-200";
    const mutedColor = isLightSection ? "text-gray-500" : "text-slate-400";

    return (
        <>
            <motion.nav
                id="main-nav"
                className={`fixed top-0 left-0 w-full z-120 flex items-center justify-between h-18 px-6 md:px-16 lg:px-24 xl:px-32 border-b transition-[border-color,backdrop-filter,box-shadow] duration-450 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isLightSection
                    ? "backdrop-blur-2xl border-black/6 shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
                    : scrolled
                        ? "backdrop-blur border-white/5 shadow-lg"
                        : "backdrop-blur-none border-transparent"
                    }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    backgroundColor: isLightSection
                        ? "rgba(255, 255, 255, 0.88)"
                        : scrolled
                            ? "rgba(0, 0, 0, 0.10)"
                            : "rgba(0, 0, 0, 0)",
                }}
                transition={{
                    y: { type: "spring", stiffness: 250, damping: 70, mass: 1 },
                    opacity: { type: "spring", stiffness: 250, damping: 70, mass: 1 },
                    backgroundColor: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                viewport={{ once: true }}
            >
                <Link href="/" className="text-2xl font-bold">
                    {/* Replace src with a dedicated dark-variant logo if available */}
                    <img
                        className={`w-35 transition-[filter] duration-450 ease-out ${isLightSection ? "brightness-0" : ""
                            }`}
                        src="/logo row.png"
                        alt="Diggitronic Logo"
                        width={56}
                        height={56}
                    />
                </Link>

                <div className="hidden lg:flex items-center gap-4">
                    {navlinks.map((link, index) =>
                        link.hasDropdown ? (
                            /* ── Services dropdown trigger ── */
                            <div
                                key={link.href}
                                className="relative"
                                onMouseEnter={() => {
                                    setHoveredIndex(index);
                                    setIsServicesOpen(true);
                                }}
                                onMouseLeave={() => {
                                    setHoveredIndex(null);
                                    setIsServicesOpen(false);
                                }}
                            >
                                <button
                                    aria-expanded={isServicesOpen}
                                    aria-haspopup="true"
                                    className="relative px-4 py-2 rounded-full inline-flex items-center gap-1.5 font-medium"
                                >
                                    <span
                                        className={`relative z-10 transition-colors duration-450 ease-out ${textColor}`}
                                    >
                                        {link.text}
                                    </span>
                                    <motion.span
                                        className="relative z-10"
                                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <ChevronDown
                                            size={13}
                                            className={`transition-colors duration-450 ease-out ${mutedColor}`}
                                        />
                                    </motion.span>

                                    {/* Gradient border — same as regular nav items */}
                                    <AnimatePresence>
                                        {hoveredIndex === index && (
                                            <>
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-linear-to-r from-[#AD390E] to-[#FFC93E] pointer-events-none"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    style={{
                                                        padding: "1.5px",
                                                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                                        WebkitMask:
                                                            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                                        maskComposite: "exclude",
                                                        WebkitMaskComposite: "xor",
                                                    }}
                                                />
                                                <motion.div
                                                    className="absolute inset-0 rounded-full opacity-30 blur-md pointer-events-none"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            </>
                                        )}
                                    </AnimatePresence>
                                </button>

                                <ServicesDropdown
                                    isOpen={isServicesOpen}
                                    isLightSection={isLightSection}
                                    onClose={() => setIsServicesOpen(false)}
                                />
                            </div>
                        ) : (
                            /* ── Regular nav link ── */
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 rounded-full inline-flex items-center justify-center font-medium"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <span
                                    className={`relative z-10 transition-colors duration-450 ease-out ${textColor}`}
                                >
                                    {link.text}
                                </span>
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <>
                                            <motion.div
                                                className="absolute inset-0 rounded-full bg-linear-to-r from-[#AD390E] to-[#FFC93E] pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                style={{
                                                    padding: "1.5px",
                                                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                                    WebkitMask:
                                                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                                    maskComposite: "exclude",
                                                    WebkitMaskComposite: "xor",
                                                }}
                                            />
                                            <motion.div
                                                className="absolute inset-0 rounded-full opacity-30 blur-md pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </>
                                    )}
                                </AnimatePresence>
                            </Link>
                        )
                    )}
                </div>

                <div className="hidden lg:block space-x-3">
                    <Link href="/contact" className="px-6 py-2 inline-block bg-[#EB7300] hover:bg-[#EB7300] font-medium transition text-white rounded-md active:scale-95">
                        Get a Quote
                    </Link>
                </div>

                <button
                    onClick={() => setIsMenuOpen(true)}
                    className={`lg:hidden active:scale-90 transition-colors duration-450 ease-out ${isLightSection ? "text-gray-800" : "text-white"
                        }`}
                    aria-label="Open menu"
                >
                    <Menu className="size-6.5" />
                </button>
            </motion.nav>

            {/* ═══ MOBILE FULLSCREEN MENU ═══ */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[200] lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* backdrop */}
                        <motion.div
                            className="absolute inset-0"
                            style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* grain texture */}
                        <div
                            aria-hidden
                            className="absolute inset-0 pointer-events-none opacity-[0.03]"
                            style={{
                                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                                backgroundSize: "20px 20px",
                            }}
                        />

                        {/* orange glow — top-right */}
                        <div
                            aria-hidden
                            className="absolute -top-20 -right-20 w-64 h-64 pointer-events-none"
                            style={{
                                background: "radial-gradient(circle, rgba(255,77,0,0.15) 0%, transparent 70%)",
                                filter: "blur(60px)",
                            }}
                        />

                        {/* content */}
                        <div className="relative z-10 flex flex-col h-full">
                            {/* header — logo + close */}
                            <div className="flex items-center justify-between h-18 px-6">
                                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                                    <img
                                        src="/logo row.png"
                                        alt="Diggitronic Logo"
                                        className="h-14 w-35"
                                        width={56}
                                        height={56}
                                    />
                                </Link>
                                <motion.button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white/10"
                                    aria-label="Close menu"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={18} className="text-white/70" />
                                </motion.button>
                            </div>

                            {/* scrollable body */}
                            <div className="flex-1 overflow-y-auto px-6 pt-4 pb-8">
                                {/* ── primary nav links ── */}
                                <motion.div
                                    className="flex flex-col"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                                >
                                    {navlinks.map((link) =>
                                        link.hasDropdown ? (
                                            <motion.div
                                                key={link.href}
                                                variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                                            >
                                                <button
                                                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                                    className="w-full flex items-center justify-between py-4 border-b border-white/5"
                                                >
                                                    <span className="text-2xl font-black text-white uppercase tracking-tight">
                                                        {link.text}
                                                    </span>
                                                    <motion.div
                                                        animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <ChevronDown size={20} className="text-[#EB7300]" />
                                                    </motion.div>
                                                </button>

                                                <AnimatePresence>
                                                    {mobileServicesOpen && (
                                                        <motion.div
                                                            className="overflow-hidden"
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                                        >
                                                            <div className="py-3 grid grid-cols-2 gap-2">
                                                                {MOBILE_SERVICES.map((item, i) => {
                                                                    const Icon = item.icon;
                                                                    return (
                                                                        <motion.div
                                                                            key={item.name}
                                                                            initial={{ opacity: 0, y: 10 }}
                                                                            animate={{ opacity: 1, y: 0 }}
                                                                            transition={{ delay: i * 0.04, duration: 0.3 }}
                                                                        >
                                                                            <Link
                                                                                href={item.href}
                                                                                onClick={() => setIsMenuOpen(false)}
                                                                                className="flex items-center gap-2.5 rounded-xl px-3 py-3 transition-colors duration-200"
                                                                                style={{
                                                                                    border: "1px solid rgba(255,255,255,0.06)",
                                                                                    background: "rgba(255,255,255,0.03)",
                                                                                }}
                                                                            >
                                                                                <Icon size={15} color="#EB7300" strokeWidth={2} />
                                                                                <span className="text-xs font-semibold text-white/70">
                                                                                    {item.name}
                                                                                </span>
                                                                            </Link>
                                                                        </motion.div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key={link.href}
                                                variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="group flex items-center justify-between py-4 border-b border-white/5"
                                                >
                                                    <span className="text-2xl font-black text-white uppercase tracking-tight group-active:text-[#EB7300] transition-colors">
                                                        {link.text}
                                                    </span>
                                                    <ArrowRight size={18} className="text-white/20 group-active:text-[#EB7300] transition-colors" />
                                                </Link>
                                            </motion.div>
                                        )
                                    )}
                                </motion.div>

                                {/* ── CTA button ── */}
                                <motion.div
                                    className="mt-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45, duration: 0.5 }}
                                >
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full h-12 rounded-full font-black text-sm text-white"
                                        style={{
                                            background: "linear-gradient(135deg, #EB7300, #EB7300)",
                                            boxShadow: "0 4px 24px rgba(255,77,0,0.3)",
                                        }}
                                    >
                                        Get a Quote
                                        <ArrowRight size={16} />
                                    </Link>
                                </motion.div>

                                {/* ── bottom info ── */}
                                <motion.div
                                    className="mt-10 flex items-center justify-between"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.55, duration: 0.5 }}
                                >
                                    <p className="text-[10px] uppercase tracking-[0.4em] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
                                        Diggitronic
                                    </p>
                                    <p className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.15)" }}>
                                        Design &middot; Marketing &middot; AI
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
