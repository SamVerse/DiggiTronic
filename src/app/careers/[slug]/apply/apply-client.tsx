"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { Job } from "@/data/jobs";

function FloatingField({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className="absolute left-0 pointer-events-none font-medium transition-all duration-200"
        style={{
          top: lifted ? "0px" : "50%",
          transform: lifted ? "translateY(0)" : "translateY(-50%)",
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.45em" : "0",
          textTransform: lifted ? "uppercase" : "none",
          color: focused ? "#EB7300" : "rgba(255,255,255,0.3)",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent border-0 outline-none text-sm font-medium pt-5 pb-3"
        style={{ color: "rgba(255,255,255,0.85)" }}
      />
      <div className="relative h-px" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="absolute inset-y-0 left-0 h-full"
          style={{ background: "#EB7300", originX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </div>
    </div>
  );
}

function FloatingTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className="absolute left-0 pointer-events-none font-medium transition-all duration-200"
        style={{
          top: lifted ? "0px" : "16px",
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.45em" : "0",
          textTransform: lifted ? "uppercase" : "none",
          color: focused ? "#EB7300" : "rgba(255,255,255,0.3)",
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={5}
        className="w-full bg-transparent border-0 outline-none text-sm font-medium pt-5 pb-3 resize-none"
        style={{ color: "rgba(255,255,255,0.85)" }}
      />
      <div className="relative h-px" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="absolute inset-y-0 left-0 h-full"
          style={{ background: "#EB7300", originX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </div>
    </div>
  );
}

function ResumeDropZone({
  file,
  onFile,
}: {
  file: File | null;
  onFile: (f: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  return (
    <motion.div
      className="relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors"
      style={{
        borderColor: dragging ? "rgba(235,115,0,0.5)" : file ? "rgba(235,115,0,0.4)" : "rgba(255,255,255,0.12)",
        background: dragging ? "rgba(235,115,0,0.03)" : file ? "rgba(235,115,0,0.02)" : "transparent",
      }}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      whileHover={{ borderColor: "rgba(235,115,0,0.4)", backgroundColor: "rgba(235,115,0,0.02)" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
      />

      <AnimatePresence mode="wait">
        {file ? (
          <motion.div
            key="selected"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(235,115,0,0.15)" }}
            >
              <span className="text-lg" style={{ color: "#EB7300" }}>✓</span>
            </motion.div>
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{file.name}</p>
            <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
              Click to replace
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                Drop your resume here
              </p>
              <p className="text-[10px] font-mono uppercase tracking-wider mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                PDF, DOC or DOCX · Max 10MB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type SubmitState = "idle" | "loading" | "success";

/* ══════════════════════════════════════════════════════════════════ */
export default function ApplyClient({ job }: { job: Job }) {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [cover, setCover] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [progress, setProgress] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !resume) return;

    setSubmitState("loading");
    setProgress(10);

    const formData = new FormData();
    formData.append("firstName", firstName.trim());
    formData.append("lastName", lastName.trim());
    formData.append("email", email.trim());
    formData.append("mobile", mobile.trim());
    formData.append("portfolio", portfolio.trim());
    formData.append("cover", cover.trim());
    formData.append("jobSlug", job.slug);
    formData.append("resume", resume);

    // Animate progress while upload is in flight
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) { clearInterval(interval); return 85; }
        return p + Math.random() * 12;
      });
    }, 200);

    try {
      // Do NOT set Content-Type — browser sets multipart boundary automatically
      const res = await fetch("/api/apply", { method: "POST", body: formData });
      clearInterval(interval);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Application error:", (data as { error?: string }).error);
        setProgress(0);
        setSubmitState("idle");
        return;
      }

      setProgress(100);
      setSubmitState("success");
      await new Promise((r) => setTimeout(r, 600));
      router.push(`/careers/thank-you?for=${encodeURIComponent(job.title)}`);
    } catch (err) {
      clearInterval(interval);
      console.error("Network error:", err);
      setProgress(0);
      setSubmitState("idle");
    }
  }

  return (
    <>
      <LenisScroll />
      <Navbar />
      <main className="relative overflow-x-hidden" style={{ background: "#0a0a0a" }}>

        <section
          className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden"
          style={{ minHeight: "38vh", paddingTop: "8rem", paddingBottom: "4rem" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 50% at 50% 70%, rgba(235,115,0,0.07) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 px-6">
            <motion.p
              className="text-[9px] font-mono uppercase tracking-[0.6em] mb-4"
              style={{ color: "#EB7300" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Application
            </motion.p>

            <motion.p
              className="font-black text-white/40 mb-1"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Apply for
            </motion.p>

            <div className="overflow-hidden pb-2">
              <motion.h1
                className="font-black"
                style={{ fontSize: "clamp(2.2rem, 7vw, 6rem)", lineHeight: 1.15, letterSpacing: "-0.03em", color: "#EB7300" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {job.title}
              </motion.h1>
            </div>
          </div>
        </section>

        <section className="relative w-full pb-28">
          <div className="max-w-2xl mx-auto px-6">

            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href={`/careers/${job.slug}`}
                className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] transition-opacity hover:opacity-60"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                ← Back to Role
              </Link>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-8 md:p-12 flex flex-col gap-8"
              style={{ backdropFilter: "blur(16px)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.75, ease: "easeOut" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FloatingField label="First Name" value={firstName} onChange={setFirstName} required />
                <FloatingField label="Last Name" value={lastName} onChange={setLastName} required />
              </div>

              <FloatingField label="Email Address" type="email" value={email} onChange={setEmail} required />

              <FloatingField label="Mobile Number" type="tel" value={mobile} onChange={setMobile} />

              <FloatingField label="Portfolio / Website URL" type="url" value={portfolio} onChange={setPortfolio} />

              <div>
                <p
                  className="text-[9px] font-mono uppercase tracking-[0.45em] mb-3"
                  style={{ color: "#EB7300" }}
                >
                  Resume / CV
                </p>
                <ResumeDropZone file={resume} onFile={setResume} />
              </div>

              <FloatingTextarea label="Cover Message" value={cover} onChange={setCover} />

              <motion.button
                type="submit"
                disabled={submitState !== "idle"}
                className="group relative w-full rounded-2xl py-4 font-black text-sm text-white overflow-hidden border"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
                whileHover={submitState === "idle" ? { y: -2 } : {}}
                whileTap={submitState === "idle" ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
                {submitState === "loading" && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[3px]"
                    style={{ background: "rgba(255,255,255,0.5)", width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {submitState === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      Submit Application
                      <span className="text-base">→</span>
                    </motion.span>
                  )}
                  {submitState === "loading" && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-1.5"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </motion.span>
                  )}
                  {submitState === "success" && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      ✓ Submitted!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p
                className="text-center text-[10px] font-mono uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                We'll be in touch within 3–5 business days.
              </p>
            </motion.form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
