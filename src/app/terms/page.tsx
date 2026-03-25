"use client";

import { motion, Variants } from "framer-motion";
import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

const SECTIONS = [
  {
    num: "01",
    title: "Acceptance of Terms",
    body: `By accessing our website, submitting an enquiry, or engaging DiggiTronic for any service, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please discontinue use of our website and services immediately.`,
  },
  {
    num: "02",
    title: "Services Provided",
    body: `DiggiTronic offers a range of digital growth services including graphic design, search engine optimisation (SEO), social media marketing, content creation, video production, web development, and AI-driven solutions. The exact scope of service for each engagement is defined in a separate project agreement or proposal issued prior to commencement. These terms complement — and do not replace — any specific project agreement.`,
  },
  {
    num: "03",
    title: "Client Responsibilities",
    body: `To enable us to deliver exceptional results, clients are expected to provide timely, accurate, and complete briefs; offer feedback within agreed timelines; and ensure they hold all necessary rights, permissions, and licences for any assets, content, or materials submitted to DiggiTronic. Delays or inaccuracies caused by the client may affect delivery timelines and are not the responsibility of DiggiTronic.`,
  },
  {
    num: "04",
    title: "Intellectual Property",
    body: `Upon receipt of full and final payment for a project, ownership of the agreed deliverables transfers to the client. Until that point, all work-in-progress, concepts, and deliverables remain the intellectual property of DiggiTronic. We retain the right to display completed work in our portfolio, case studies, and marketing materials, unless explicitly agreed otherwise in writing. Any pre-existing tools, frameworks, methodologies, or proprietary systems used in delivery remain the property of DiggiTronic.`,
  },
  {
    num: "05",
    title: "Payment Terms",
    body: `Payment schedules are outlined in individual project proposals. Unless otherwise agreed, a deposit — typically 50% — is required before work commences and is non-refundable. Remaining balances are due upon project completion or at agreed milestones. Late payments beyond the specified due date may result in work being paused until payment is received. DiggiTronic reserves the right to charge reasonable late fees on overdue invoices.`,
  },
  {
    num: "06",
    title: "Revisions & Scope",
    body: `The number of revision rounds included in each service is specified in the project proposal. Revisions are defined as minor adjustments within the agreed scope. Requests that constitute a material change in direction, additional deliverables, or scope expansion will be quoted separately. DiggiTronic will not proceed with scope-expanded work without written client approval of an updated proposal.`,
  },
  {
    num: "07",
    title: "Confidentiality",
    body: `Both DiggiTronic and its clients agree to treat each other's proprietary and confidential information with strict discretion. Neither party will disclose the other's trade secrets, financial terms, strategy, or commercially sensitive data to third parties without prior written consent. This obligation survives the termination of any project or business relationship between the parties.`,
  },
  {
    num: "08",
    title: "Limitation of Liability",
    body: `DiggiTronic's liability for any claim arising from services provided — whether in contract, tort, or otherwise — is limited to the total fees paid by the client for the specific service in question during the preceding 12 months. We are not liable for any indirect, consequential, special, or punitive damages, including but not limited to loss of revenue, loss of data, or reputational damage, even if we have been advised of the possibility of such damages.`,
  },
  {
    num: "09",
    title: "Termination",
    body: `Either party may terminate an active engagement by providing a minimum of 14 calendar days' written notice. Upon termination, the client is obligated to pay for all work completed up to the termination date, calculated on a pro-rata basis or at agreed milestone rates. Work produced to the point of termination remains the property of DiggiTronic until all outstanding payments are settled.`,
  },
  {
    num: "10",
    title: "Governing Law",
    body: `These Terms & Conditions are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising from or related to these terms or the services provided shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.`,
  },
  {
    num: "11",
    title: "Contact Us",
    body: `If you have questions about these Terms & Conditions, require clarification on any clause, or wish to negotiate specific terms for your project, please reach out to us at: hello@digitronic.com. We are happy to discuss and tailor arrangements where appropriate.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <main className="relative overflow-x-hidden" style={{ background: "#0a0a0a" }}>

        <section
          className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden"
          style={{ minHeight: "52vh", paddingTop: "8rem", paddingBottom: "5rem" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(235,115,0,0.09) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 72px),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 72px)
              `,
            }}
          />

          <div className="relative z-10 px-6">
            <motion.p
              className="text-[9px] font-mono uppercase tracking-[0.6em] mb-6"
              style={{ color: "#EB7300" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Legal
            </motion.p>

            <div className="overflow-hidden mb-4">
              <motion.h1
                className="font-black text-white"
                style={{
                  fontSize: "clamp(2.4rem, 8vw, 7.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Terms &amp; Conditions
              </motion.h1>
            </div>

            <motion.p
              className="text-[10px] font-mono uppercase tracking-[0.45em]"
              style={{ color: "rgba(255,255,255,0.25)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              Last updated: March 2025
            </motion.p>
          </div>
        </section>

        <section className="relative w-full">
          <div className="max-w-2xl mx-auto px-6 pb-28">

            <motion.p
              className="text-sm leading-[1.9] mb-16"
              style={{ color: "rgba(255,255,255,0.45)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              These Terms &amp; Conditions govern your use of the DiggiTronic website and the services we provide. By engaging us, you agree to these terms in full. Please read them carefully before proceeding.
            </motion.p>

            <div className="flex flex-col gap-12">
              {SECTIONS.map((s) => (
                <motion.div
                  key={s.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-40px" }}
                  variants={fadeUp}
                >
                  <span
                    className="block text-[9px] font-mono uppercase tracking-[0.5em] mb-2"
                    style={{ color: "#EB7300" }}
                  >
                    {s.num}
                  </span>
                  <h2 className="font-black text-white text-lg md:text-xl mb-4">
                    {s.title}
                  </h2>
                  <div
                    className="h-px mb-5"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                  <p
                    className="text-sm leading-[1.9]"
                    style={{ color: "rgba(255,255,255,0.48)" }}
                  >
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
