import AgencyStatement from "@/sections/agency-statement";
import AgencyStatementGLB from "@/sections/agency-statement-glb";
import GoalSection from "@/sections/goal-section";
import HeroSection from "@/sections/hero-section";
import ServicesCTA from "@/sections/services-cta";
import ClientsSection from "@/sections/clients-section";
import TestimonialsSection from "@/sections/testimonials-section";
import FAQSection from "@/sections/faq-section";
import Footer from "@/components/footer";
import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";

export default function Page() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <AgencyStatement />
        {/* <AgencyStatementGLB /> */}
        <ServicesCTA />
        <GoalSection />
        <ClientsSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
