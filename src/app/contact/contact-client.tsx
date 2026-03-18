"use client";

import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactHero from "@/sections/contact-hero";
import ContactSplit from "@/sections/contact-split";
import ContactInfo from "@/sections/contact-info";

export default function ContactPageClient() {
  return (
    <>
      <LenisScroll />
      <Navbar />

      <main
        className="relative overflow-x-hidden"
        style={{ background: "#0a0a0a" }}
      >
        <ContactHero />
        <ContactSplit />
        <ContactInfo />
      </main>

      <Footer />
    </>
  );
}
