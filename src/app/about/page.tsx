import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AboutHero from "@/sections/about-hero";
import AboutStory from "@/sections/about-story";
import AboutVision from "@/sections/about-vision";
import AboutValues from "@/sections/about-values";
import AboutExpertise from "@/sections/about-expertise";
import AboutTeam from "@/sections/about-team";
import AboutClosing from "@/sections/about-closing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Digitronic",
  description:
    "Learn about DiggiTronic — your digital growth partner for design, marketing & AI.",
};

export default function AboutPage() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <main className="relative overflow-x-hidden" style={{ background: "#0a0a0a" }}>
        <AboutHero />
        <AboutStory />
        <AboutVision />
        <AboutValues />
        <AboutExpertise />
        <AboutTeam />
        <AboutClosing />
      </main>
      <Footer />
    </>
  );
}
