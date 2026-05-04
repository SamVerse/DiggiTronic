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
    value: "Dwarka, Delhi, India 110075",
    sub: "Available for global clients",
  },
  {
    label: "Phone",
    value: "+971 50 000 0000",
    sub: "Sun – Thu, 9AM – 6PM GST",
  },
  {
    label: "Email",
    value: "Support@diggitronic.com",
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
          className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            className="text-[11px] font-mono uppercase tracking-[0.5em]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Diggitronic
          </p>
          <p
            className="text-[11px] font-mono uppercase tracking-[0.5em]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Delhi · India
          </p>
        </motion.div>
      </div>
    </section>
  );
}
