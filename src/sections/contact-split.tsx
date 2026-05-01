"use client";

import { useRef, useState, useId } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { CheckCircle } from "lucide-react";

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



function SuccessPanel() {
  return (
    <motion.div
      key="success"
      className="flex flex-col items-center justify-center text-center gap-6 py-16 px-8"
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
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
        className="text-[10px] font-mono uppercase tracking-[0.4em]"
        style={{ color: "rgba(235,115,0,0.6)" }}
      >
        DiggiTronic
      </p>
    </motion.div>
  );
}

export default function ContactSplit() {
  const sectionRef = useRef<HTMLElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
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

  async function handleSubmit(ev: React.FormEvent) {
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          mobile,
          email,
          company,
          service,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Contact submission error:", (data as { error?: string }).error);
        setFormShake(true);
        setTimeout(() => setFormShake(false), 600);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error("Network error:", err);
      setFormShake(true);
      setTimeout(() => setFormShake(false), 600);
      setIsSubmitting(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(235,115,0,0.3), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-20 items-start">

          <motion.div
            className="lg:sticky lg:top-28 flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={stagger}
          >
            <div className="flex flex-col gap-1 mb-8">
              {[
                { text: "Your Vision.", color: "white" },
                { text: "Our Plan.", color: "#EB7300" },
                { text: "Real Growth.", color: "white" },
              ].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="block font-black tracking-tight leading-[1.1] pt-2 pb-1"
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

                    <FloatingField
                      label="Mobile Number"
                      type="tel"
                      value={mobile}
                      onChange={setMobile}
                      required
                      error={!!errors.mobile}
                    />

                    <FloatingField
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      required
                      error={!!errors.email}
                    />

                    <FloatingField
                      label="Company Name"
                      value={company}
                      onChange={setCompany}
                    />

                    <FloatingField
                      label="Service Description"
                      value={service}
                      onChange={setService}
                      multiline
                      rows={4}
                      required
                      error={!!errors.service}
                    />



                    <div
                      className="w-full h-px"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    />

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full h-14 rounded-2xl font-black text-white text-sm tracking-[0.12em] uppercase overflow-hidden cursor-pointer disabled:cursor-not-allowed border"
                      style={{ borderColor: "rgba(255,255,255,0.15)" }}
                      whileHover={!isSubmitting ? { y: -3 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                      transition={{ duration: 0.25 }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#AD390E] to-[#FFC93E] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{
                          padding: "1.5px",
                          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          maskComposite: "exclude",
                          WebkitMaskComposite: "xor",
                        }}
                      />
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
                            <motion.div
                              className="absolute bottom-0 left-0 h-[3px] rounded-full"
                              style={{ background: "rgba(255,255,255,0.5)" }}
                              initial={{ width: "0%" }}
                              animate={{ width: "88%" }}
                              transition={{ duration: 1.6, ease: "easeInOut" }}
                            />
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
