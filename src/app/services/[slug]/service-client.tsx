"use client";

import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ServiceHero from "@/sections/service-hero";
import ServiceOverview from "@/sections/service-overview";
import ServiceOfferings from "@/sections/service-offerings";
import ServiceProcess from "@/sections/service-process";
import ServiceUseCases from "@/sections/service-use-cases";
import ServiceShowcase from "@/sections/service-showcase";
import ServiceSocialProof from "@/sections/service-social-proof";
import ServiceCta from "@/sections/service-cta";
import type { ServiceData } from "@/data/services";

export default function ServiceClient({ service }: { service: ServiceData }) {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <main className="relative overflow-x-hidden" style={{ background: "#0a0a0a" }}>
        <ServiceHero service={service} />
        <ServiceOverview service={service} />
        <ServiceOfferings offerings={service.offerings} />
        <ServiceProcess />
        <ServiceUseCases useCases={service.useCases} slug={service.slug} />
        <ServiceShowcase service={service} />
        <ServiceSocialProof
          stat1={service.stat1}
          stat2={service.stat2}
          stat3={service.stat3}
        />
        <ServiceCta service={service} />
      </main>
      <Footer />
    </>
  );
}
