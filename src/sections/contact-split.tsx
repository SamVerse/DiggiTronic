"use client";

import { useRef, useState, useId } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { CheckCircle } from "lucide-react";

/* ─── Animation Variants ──────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: "easeOut" },
  },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

/* ─── Budget Options ──────────────────────────────────────── */
const BUDGETS = [
  { label: "< $500", id: "xs" },
  { label: "$500–1K", id: "sm" },
  { label: "$1K–5K", id: "md" },
  { label: "$5K–10K", id: "lg" },
  { label: "$10K+", id: "xl" },
];

/* ─── Floating Label Field ────────────────────────────────── */
interface FieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  error?: boolean;
}

function FloatingField({
  label,
  type = "text",
  value,
  onChange,
  multiline = false,
  rows = 4,
  required = false,
  error = false,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const uid = useId();

  const sharedClass =
    "w-full bg-transparent pt-6 pb-2 text-white text-sm focus:outline-none transition-colors duration-300 resize-none leading-relaxed placeholder-transparent";
  const borderColor = error
    ? "rgba(239,68,68,0.8)"
    : focused
    ? "#EB7300"
    : "rgba(255,255,255,0.15)";

  return (
    <div className="relative w-full">
      <div
        className="relative"
        style={{ borderBottom: `1px solid ${borderColor}`, transition: "border-color 0.3s" }}
      >
        {/* Floating label */}
        <label
          htmlFor={uid}
          className="absolute left-0 pointer-events-none font-mono uppercase tracking-wider transition-all duration-300"
          style={{
            top: floated ? "0px" : "1.4rem",
            fontSize: floated ? "9px" : "11px",
            color: error
              ? "rgba(239,68,68,0.8)"
              : focused
              ? "#EB7300"
              : "rgba(255,255,255,0.35)",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "#EB7300", marginLeft: "2px" }}>*</span>
          )}
        </label>

        {multiline ? (
          <textarea
            id={uid}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={sharedClass}
            placeholder={label}
          />
        ) : (
          <input
            id={uid}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={sharedClass}
            placeholder={label}
          />
        )}

        {/* Orange animated underline on focus */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ background: "#EB7300" }}
          initial={{ width: "0%" }}
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

/* ─── Budget Card ─────────────────────────────────────────── */
function BudgetCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="rounded-xl px-3 py-3 text-[10px] font-mono text-center cursor-pointer tracking-wider uppercase transition-shadow duration-300"
      style={{
        border: selected
          ? "1px solid #EB7300"
          : "1px solid rgba(255,255,255,0.08)",
        background: selected
          ? "rgba(235,115,0,0.09)"
          : "rgba(255,255,255,0.02)",
        color: selected ? "#EB7300" : "rgba(255,255,255,0.45)",
        boxShadow: selected ? "0 0 18px rgba(235,115,0,0.18)" : "none",
      }}
      whileHover={{
        borderColor: selected ? "#EB7300" : "rgba(235,115,0,0.4)",
        color: selected ? "#EB7300" : "rgba(255,255,255,0.75)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.button>
  );
}

/* ─── Success Panel ───────────────────────────────────────── */
function SuccessPanel() {
  return (
    <motion.div
      key="success"
      className="flex flex-col items-center justify-center text-center gap-6 py-16 px-8"
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Pulsing check circle */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: "80px", height: "80px" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(235,115,0,0.15)" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(235,115,0,0.15)", border: "1px solid rgba(235,115,0,0.4)" }}
        >
          <CheckCircle size={32} style={{ color: "#EB7300" }} />
        </div>
      </motion.div>

      <div>
        <p className="font-black text-white text-2xl mb-2">Message Sent.</p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          We'll reach out within 24 hours.
        </p>
      </div>

      <p
        className="text-[9px] font-mono uppercase tracking-[0.4em]"
        style={{ color: "rgba(235,115,0,0.6)" }}
      >
        DiggiTronic — Digital Growth Studio
      </p>
    </motion.div>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
export default function ContactSplit() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Form state */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formShake, setFormShake] = useState(false);


  function validate() {
    const e: Record<string, boolean> = {};
    if (!firstName.trim()) e.firstName = true;
    if (!lastName.trim()) e.lastName = true;
    if (!mobile.trim()) e.mobile = true;
    if (!email.trim() || !email.includes("@")) e.email = true;
    if (!service.trim()) e.service = true;
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setFormShake(true);
      setTimeout(() => setFormShake(false), 600);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1700);
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ background: "#0a0a0a" }}
    >
      {/* Subtle divider from hero */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(235,115,0,0.3), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-20 items-start">

          {/* ── LEFT: Emotional Side ─────────────────────── */}
          <motion.div
            className="lg:sticky lg:top-28 flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={stagger}
          >
            {/* Big statement */}
            <div className="flex flex-col gap-1 mb-8">
              {[
                { text: "You Think.", color: "white" },
                { text: "We Create.", color: "#EB7300" },
                { text: "We Scale.", color: "white" },
              ].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="block font-black tracking-tight leading-none"
                    style={{
                      fontSize: "clamp(2.2rem, 4vw, 4.2rem)",
                      color: line.color,
                    }}
                    variants={{
                      hidden: { y: "100%", opacity: 0 },
                      visible: {
                        y: "0%",
                        opacity: 1,
                        transition: {
                          delay: i * 0.1,
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                  >
                    {line.text}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Orange accent line */}
            <motion.div
              className="mb-8 origin-left"
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: { duration: 0.7, delay: 0.4, ease: "easeOut" },
                },
              }}
              style={{ width: "3.5rem", height: "2px", background: "#EB7300" }}
            />

            <motion.p
              variants={fadeUp}
              className="text-sm leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.45)", maxWidth: "26rem" }}
            >
              Whether you're a startup, growing brand, or established business —
              we craft digital solutions that elevate your presence and
              performance.
            </motion.p>

            {/* Micro-badges */}
            <motion.div
              variants={stagger}
              className="flex flex-col gap-3"
            >
              {[
                { stat: "50+", label: "Projects Delivered" },
                { stat: "5+", label: "Years of Expertise" },
                { stat: "98%", label: "Client Satisfaction" },
              ].map((b) => (
                <motion.div
                  key={b.stat}
                  variants={fadeUp}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#EB7300" }}
                  />
                  <span
                    className="font-black text-sm text-white"
                  >
                    {b.stat}
                  </span>
                  <span
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {b.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Form ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="rounded-3xl overflow-hidden"
              animate={formShake ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(16px)",
              }}
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="p-8 md:p-10 flex flex-col gap-7"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Section label */}
                    <div className="mb-1">
                      <p
                        className="text-[9px] font-mono uppercase tracking-[0.5em]"
                        style={{ color: "#EB7300" }}
                      >
                        Start a Project
                      </p>
                      <h3
                        className="font-black text-white mt-2"
                        style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
                      >
                        Tell us about yourself.
                      </h3>
                    </div>

                    {/* Row: First + Last name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <FloatingField
                        label="First Name"
                        value={firstName}
                        onChange={setFirstName}
                        required
                        error={!!errors.firstName}
                      />
                      <FloatingField
                        label="Last Name"
                        value={lastName}
                        onChange={setLastName}
                        required
                        error={!!errors.lastName}
                      />
                    </div>

                    {/* Mobile */}
                    <FloatingField
                      label="Mobile Number"
                      type="tel"
                      value={mobile}
                      onChange={setMobile}
                      required
                      error={!!errors.mobile}
                    />

                    {/* Email */}
                    <FloatingField
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      required
                      error={!!errors.email}
                    />

                    {/* Company */}
                    <FloatingField
                      label="Company Name"
                      value={company}
                      onChange={setCompany}
                    />

                    {/* Service description */}
                    <FloatingField
                      label="Service Description"
                      value={service}
                      onChange={setService}
                      multiline
                      rows={4}
                      required
                      error={!!errors.service}
                    />

                    {/* Budget selector */}
                    <div>
                      <p
                        className="text-[9px] font-mono uppercase tracking-[0.45em] mb-4"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        Expected Budget
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {BUDGETS.map((b) => (
                          <BudgetCard
                            key={b.id}
                            label={b.label}
                            selected={budget === b.id}
                            onClick={() =>
                              setBudget(budget === b.id ? null : b.id)
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Thin separator */}
                    <div
                      className="w-full h-px"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    />

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full h-14 rounded-2xl font-black text-white text-sm tracking-[0.12em] uppercase overflow-hidden cursor-pointer disabled:cursor-not-allowed"
                      style={{ background: "#EB7300" }}
                      whileHover={
                        !isSubmitting
                          ? {
                              y: -3,
                              boxShadow: "0 12px 36px rgba(235,115,0,0.38)",
                            }
                          : {}
                      }
                      whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                      transition={{ duration: 0.25 }}
                    >
                      <AnimatePresence mode="wait">
                        {!isSubmitting ? (
                          <motion.span
                            key="idle"
                            className="flex items-center justify-center gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                          >
                            → Start the Conversation
                          </motion.span>
                        ) : (
                          <motion.span
                            key="loading"
                            className="flex items-center justify-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {/* Animated progress bar at bottom */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-[3px] rounded-full"
                              style={{ background: "rgba(255,255,255,0.5)" }}
                              initial={{ width: "0%" }}
                              animate={{ width: "88%" }}
                              transition={{ duration: 1.6, ease: "easeInOut" }}
                            />
                            {/* Animated dots */}
                            <span>Processing</span>
                            <span className="flex gap-1">
                              {[0, 1, 2].map((d) => (
                                <motion.span
                                  key={d}
                                  className="w-1 h-1 rounded-full bg-white inline-block"
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{
                                    duration: 0.9,
                                    repeat: Infinity,
                                    delay: d * 0.2,
                                  }}
                                />
                              ))}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    <p
                      className="text-center text-[9px] font-mono"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      We respond within 24 hours · No spam, ever.
                    </p>
                  </motion.form>
                ) : (
                  <SuccessPanel key="success" />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
