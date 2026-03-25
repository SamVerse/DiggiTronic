"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ServicesDropdown from "./services-dropdown";

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

const MOBILE_SERVICES = [
    "Video Production",
    "Social Media",
    "Development",
    "Marketing",
    "SEO",
    "AI Services",
    "Graphics & Animation",
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isLightSection, setIsLightSection] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

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
                        className={`h-14 w-35 transition-[filter] duration-450 ease-out ${isLightSection ? "brightness-0" : ""
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
                    <Link href="/contact" className="px-6 py-2 inline-block bg-[#ff4d00] hover:bg-[#ff6a00] font-medium transition text-white rounded-md active:scale-95">
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

            <div
                className={`fixed inset-0 z-100 bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-6 lg:hidden transition-transform duration-400 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {navlinks.map((link) =>
                    link.hasDropdown ? (
                        <div key={link.href} className="flex flex-col items-center gap-2">
                            <span className="text-slate-200 font-semibold">{link.text}</span>
                            <div className="flex flex-col items-center gap-1.5">
                                {MOBILE_SERVICES.map((name) => (
                                    <Link
                                        key={name}
                                        href="/#services"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                                    >
                                        {name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="relative inline-flex items-center text-slate-200 hover:text-white transition-colors duration-200"
                        >
                            {link.text}
                        </Link>
                    )
                )}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex mt-2"
                    aria-label="Close menu"
                >
                    <X />
                </button>
            </div>
        </>
    );
}
