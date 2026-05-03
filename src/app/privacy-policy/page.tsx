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
    title: "Information We Collect",
    body: `When you contact us through our website or engage with our services, we may collect the following information: your name, email address, mobile number, company name, and the nature of services you are enquiring about. We also collect standard browser metadata (such as IP address, browser type, and device information) for analytics and security purposes. This data is gathered only when voluntarily submitted by you.`,
  },
  {
    num: "02",
    title: "How We Use Your Information",
    body: `We use the information we collect solely to respond to your enquiries, deliver the services you have engaged us for, and improve how we communicate with you. We do not use your personal information for unsolicited marketing. Any project-related communications are directly related to the services discussed. We will never sell, rent, or trade your data with third parties for their marketing purposes.`,
  },
  {
    num: "03",
    title: "Data Sharing",
    body: `DiggiTronic does not sell your personal data. We may share your information with trusted third-party service providers — such as cloud hosting platforms, project management tools, and analytics services — only to the extent necessary to operate our business. All third-party processors we work with are GDPR-compliant and prohibited from using your data for their own purposes.`,
  },
  {
    num: "04",
    title: "Cookies",
    body: `Our website uses essential cookies required for basic site functionality, and optional analytics cookies to help us understand how visitors interact with our content. Analytics cookies are only activated with your consent, and you may opt out at any time through your browser settings or our cookie preferences. We do not use tracking cookies for advertising.`,
  },
  {
    num: "05",
    title: "Data Retention",
    body: `Enquiry and project-related data is retained for up to 24 months from the date of your last interaction with us, unless you request earlier deletion or a longer retention period is required by law. You may request the deletion of your personal data at any time by emailing hello@digitronic.com, and we will process your request within 30 days.`,
  },
  {
    num: "06",
    title: "Your Rights",
    body: `Depending on your jurisdiction, you may have the right to access the personal data we hold about you, request corrections, request erasure, restrict processing, or request data portability. If you are located in the European Economic Area or United Kingdom, these rights are guaranteed under GDPR. California residents retain similar rights under CCPA. To exercise any of these rights, please contact us at hello@digitronic.com.`,
  },
  {
    num: "07",
    title: "Security",
    body: `We implement industry-standard technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.`,
  },
  {
    num: "08",
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make material changes, we will update the date at the top of this page. Your continued use of our website or services following the posting of changes constitutes your acceptance of those changes.`,
  },
  {
    num: "09",
    title: "Contact Us",
    body: `If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at: hello@digitronic.com. We are committed to addressing your concerns promptly and transparently.`,
  },
];

export default function PrivacyPolicyPage() {
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

            <div className="overflow-hidden mb-4 py-2">
              <motion.h1
                className="font-black text-white pt-1 pb-2"
                style={{
                  fontSize: "clamp(3rem, 9vw, 6.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Privacy Policy
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
              At DiggiTronic, we are committed to protecting your privacy and handling your personal data with transparency and care. This Privacy Policy explains what information we collect, how we use it, and the rights you have over your data.
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
