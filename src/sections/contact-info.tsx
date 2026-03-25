"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const INFO = [
  {
    label: "Office Address",
    value: "Business Bay, Dubai, UAE",
    sub: "Available for global clients",
  },
  {
    label: "Phone",
    value: "+971 50 000 0000",
    sub: "Sun – Thu, 9AM – 6PM GST",
  },
  {
    label: "Email",
    value: "hello@digitronic.com",
    sub: "Replies within 24 hours",
  },
];

export default function ContactInfo() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(235,115,0,0.25), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[9px] font-mono uppercase tracking-[0.55em] mb-4"
            style={{ color: "#EB7300" }}
          >
            Find Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-black text-white"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            You're in good hands.
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={stagger}
        >
          {INFO.map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="relative flex flex-col gap-2 py-8 pl-5 md:py-0 md:pl-10 md:px-10"
            >
              <div
                className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                style={{ background: "rgba(235,115,0,0.35)" }}
              />

              <p
                className="text-[9px] font-mono uppercase tracking-[0.5em]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {item.label}
              </p>

              <motion.p
                className="font-black text-white text-sm md:text-base"
                whileHover={{ x: 4, color: "#EB7300" }}
                transition={{ duration: 0.2 }}
                style={{ cursor: "default" }}
              >
                {item.value}
              </motion.p>

              <p
                className="text-[10px] font-mono uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {item.sub}
              </p>

              {/* Vertical divider between columns (desktop) */}
              {i < INFO.length - 1 && (
                <div
                  className="hidden md:block absolute right-0 top-0 bottom-0 w-px"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 relative overflow-hidden rounded-3xl"
          style={{ height: "380px" }}
          initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14436.6283744!2d55.2697871!3d25.1855522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682e1e8a8891%3A0x1e90e94f6e79fc47!2sBusiness%20Bay%20-%20Dubai!5e0!3m2!1sen!2sae!4v1710000000000"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: "grayscale(80%) invert(85%) hue-rotate(180deg)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DiggiTronic Office Location"
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,5,5,0.65) 0%, transparent 25%, transparent 75%, rgba(5,5,5,0.65) 100%)",
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(5,5,5,0.4) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.4) 100%)",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute rounded-full"
                style={{ background: "rgba(235,115,0,0.2)", width: "60px", height: "60px" }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              />
              <div
                className="w-4 h-4 rounded-full border-2"
                style={{ background: "#EB7300", borderColor: "rgba(235,115,0,0.4)" }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            className="text-[9px] font-mono uppercase tracking-[0.5em]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            DiggiTronic — Digital Growth Studio
          </p>
          <p
            className="text-[9px] font-mono uppercase tracking-[0.5em]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Dubai · Global
          </p>
        </motion.div>
      </div>
    </section>
  );
}
