"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Cpu,
  Megaphone,
  Palette,
  Target,
  Film,
  Share2,
  Code,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GoalTab {
  id: string;
  label: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  accent: string;
  metricTitle: string;
  metricValue: string;
  metricSub: string;
  timelineLabel: string;
  timelineValue: string;
  primaryCta: string;
  primaryHref: string;
  cardTitle: string;
  cardValue: string;
  cardSub: string;
  cardBadge: string;
  listTitle: string;
  listItems: string[];
  icon: LucideIcon;
}

const tabs: GoalTab[] = [
  {
    id: "strategy",
    label: "Strategy",
    title: "DEFINE YOUR GROWTH STRATEGY",
    description:
      "We start by understanding your brand, goals, and audience. Our strategic planning aligns creativity, marketing, and technology to build a clear roadmap for growth.",
    cta: "View process",
    href: "/services/seo",
    accent: "#EB7300",
    metricTitle: "Growth roadmap",
    metricValue: "3-phase plan",
    metricSub: "8–12 weeks",
    timelineLabel: "Estimated timeline",
    timelineValue: "~ 3 months",
    primaryCta: "View roadmap",
    primaryHref: "/services/seo",
    cardTitle: "Key focus",
    cardValue: "4 Goals",
    cardSub: "Positioning, funnel, offer, KPI",
    cardBadge: "Planned",
    listTitle: "Strategic pillars",
    listItems: ["Brand clarity", "Audience targeting", "Offer optimization"],
    icon: Target,
  },
  {
    id: "design",
    label: "Design",
    title: "DESIGN THAT BUILDS TRUST",
    description:
      "From branding to UI/UX and motion graphics, we design experiences that look premium, feel intuitive, and leave a lasting impression.",
    cta: "See designs",
    href: "/services/graphics-animation",
    accent: "#7DD3FF",
    metricTitle: "Design system",
    metricValue: "12 Assets",
    metricSub: "Brand & UI Kit",
    timelineLabel: "Delivery window",
    timelineValue: "2–4 weeks",
    primaryCta: "View designs",
    primaryHref: "/services/graphics-animation",
    cardTitle: "Design status",
    cardValue: "8 Screens",
    cardSub: "Web & mobile",
    cardBadge: "In progress",
    listTitle: "Included designs",
    listItems: ["Brand Identity", "UI / UX Screens", "Motion Graphics"],
    icon: Palette,
  },
  {
    id: "marketing",
    label: "Marketing",
    title: "MARKET WITH PRECISION",
    description:
      "We combine SEO, social media, paid ads, and content to attract the right audience and convert attention into measurable results.",
    cta: "Explore marketing",
    href: "/services/marketing",
    accent: "#FFB86B",
    metricTitle: "Campaign focus",
    metricValue: "Multi-channel",
    metricSub: "SEO + Paid + Social",
    timelineLabel: "Sprint length",
    timelineValue: "4 weeks",
    primaryCta: "View campaign",
    primaryHref: "/services/marketing",
    cardTitle: "Lead goal",
    cardValue: "1,200",
    cardSub: "Qualified leads",
    cardBadge: "+18%",
    listTitle: "Top channels",
    listItems: ["Google Ads", "LinkedIn", "Content SEO"],
    icon: Megaphone,
  },
  {
    id: "video",
    label: "Video",
    title: "STORIES THAT MOVE AUDIENCES",
    description:
      "We craft cinematic video content — from brand films and 2D/3D animations to motion graphics and logo reveals — that stops the scroll and drives engagement.",
    cta: "View productions",
    href: "/services/video-production",
    accent: "#F97316",
    metricTitle: "Production pipeline",
    metricValue: "150+ Videos",
    metricSub: "All formats",
    timelineLabel: "Turnaround",
    timelineValue: "1–3 weeks",
    primaryCta: "View portfolio",
    primaryHref: "/services/video-production",
    cardTitle: "Engagement lift",
    cardValue: "3x",
    cardSub: "Avg view rate",
    cardBadge: "Proven",
    listTitle: "Video formats",
    listItems: ["2D & 3D Animation", "Motion Graphics", "Brand Films"],
    icon: Film,
  },
  {
    id: "social",
    label: "Social",
    title: "CONTENT THAT CREATES COMMUNITY",
    description:
      "We build social presences that grow audiences, spark conversations, and convert followers into loyal brand advocates across every platform.",
    cta: "Explore social",
    href: "/services/social-media",
    accent: "#EC4899",
    metricTitle: "Reach generated",
    metricValue: "5M+",
    metricSub: "Impressions",
    timelineLabel: "Growth sprint",
    timelineValue: "4–8 weeks",
    primaryCta: "View results",
    primaryHref: "/services/social-media",
    cardTitle: "Engagement",
    cardValue: "3x",
    cardSub: "Avg lift",
    cardBadge: "+280%",
    listTitle: "Key platforms",
    listItems: ["Instagram", "LinkedIn", "YouTube"],
    icon: Share2,
  },
  {
    id: "development",
    label: "Dev",
    title: "ENGINEERED TO PERFORM",
    description:
      "We build digital products that are fast, scalable, and beautiful — from handcrafted websites and web apps to cross-platform mobile applications.",
    cta: "See our work",
    href: "/services/development",
    accent: "#38BDF8",
    metricTitle: "Products launched",
    metricValue: "80+",
    metricSub: "Web & Mobile",
    timelineLabel: "Sprint cycle",
    timelineValue: "2–6 weeks",
    primaryCta: "View projects",
    primaryHref: "/services/development",
    cardTitle: "Uptime avg",
    cardValue: "99.9%",
    cardSub: "Reliability",
    cardBadge: "Stable",
    listTitle: "Tech stack",
    listItems: ["Next.js & React", "Mobile Apps", "UI/UX Design"],
    icon: Code,
  },
  {
    id: "ai",
    label: "AI & Tech",
    title: "POWERED BY AI & TECHNOLOGY",
    description:
      "From AI videos and automation to custom tools and analytics, we use technology to scale efficiency and performance.",
    cta: "Discover AI",
    href: "/services/ai-services",
    accent: "#A78BFA",
    metricTitle: "Automation stack",
    metricValue: "6 Workflows",
    metricSub: "AI + Analytics",
    timelineLabel: "Optimization",
    timelineValue: "30 days",
    primaryCta: "View stack",
    primaryHref: "/services/ai-services",
    cardTitle: "Efficiency gain",
    cardValue: "+26%",
    cardSub: "Time saved",
    cardBadge: "Live",
    listTitle: "AI modules",
    listItems: ["AI Video", "Lead Scoring", "Smart Reports"],
    icon: Cpu,
  },
];

export default function GoalSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameworkTextRef = useRef<HTMLParagraphElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const visualsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const triggerEl = containerRef.current;

      gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 50%",
          end: "top -50%",
          scrub: false,
          onEnter: () => {
            gsap.fromTo(
              containerRef.current,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.4, ease: "power3.out" }
            );
            gsap.fromTo(
              frameworkTextRef.current,
              { x: -20, opacity: 0, filter: "blur(4px)" },
              { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }
            );
          },
          onEnterBack: () => {
            gsap.fromTo(
              containerRef.current,
              { y: -60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
            );
            gsap.fromTo(
              frameworkTextRef.current,
              { x: -20, opacity: 0, filter: "blur(4px)" },
              { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
            );
          },
          onLeave: () => {
            gsap.to(
              containerRef.current,
              { y: -60, opacity: 0, duration: 0.7, ease: "power3.inOut" }
            );
            gsap.to(
              frameworkTextRef.current,
              { x: -20, opacity: 0, filter: "blur(4px)", duration: 0.7, ease: "power3.inOut" }
            );
          },
          onLeaveBack: () => {
            gsap.to(
              containerRef.current,
              { y: 60, opacity: 0, duration: 0.7, ease: "power3.inOut" }
            );
            gsap.to(
              frameworkTextRef.current,
              { x: -20, opacity: 0, filter: "blur(4px)", duration: 0.7, ease: "power3.inOut" }
            );
          },
        },
      });

      gsap.from(buttonRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    if (
      !labelRef.current ||
      !titleRef.current ||
      !descriptionRef.current ||
      !buttonRef.current ||
      !visualsRef.current
    ) {
      return;
    }
    setActiveIndex(index);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const currentWords = titleRef.current.querySelectorAll(".word");

    tl.to([labelRef.current, ...currentWords], {
      y: -20,
      opacity: 0,
      duration: 0.25,
      stagger: 0.03,
    })
      .to(
        [descriptionRef.current, buttonRef.current],
        {
          y: 20,
          opacity: 0,
          duration: 0.25,
        },
        "-=0.18",
      )
      .to(
        visualsRef.current,
        {
          y: -40,
          opacity: 0,
          duration: 0.25,
        },
        "-=0.15",
      )
      .add(() => {
        setContentIndex(index);
        requestAnimationFrame(() => {
          const nextWords = titleRef.current?.querySelectorAll(".word") ?? [];
          gsap.set(nextWords, { y: -30, opacity: 0 });
          gsap.set(labelRef.current, { y: -30, opacity: 0 });
          gsap.set([descriptionRef.current, buttonRef.current], {
            y: 30,
            opacity: 0,
          });
          gsap.set(visualsRef.current, {
            x: 60,
            opacity: 0,
            scale: 0.98,
            y: 0,
          });

          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to([labelRef.current, ...nextWords], {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
            })
            .to(
              descriptionRef.current,
              {
                y: 0,
                opacity: 1,
                duration: 0.45,
              },
              "-=0.3",
            )
            .to(
              buttonRef.current,
              {
                y: 0,
                opacity: 1,
                duration: 0.4,
              },
              "-=0.3",
            )
            .to(
              visualsRef.current,
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.55,
                ease: "expo.out",
              },
              "-=0.2",
            );
        });
      });
  };

  const active = tabs[contentIndex];

  return (
    <section className="relative z-30 bg-[#050505] pt-36 pb-16 md:pt-44 md:pb-24 px-4 md:px-8 lg:px-16 rounded-t-[2rem] shadow-[0_-16px_60px_rgba(0,0,0,0.5)]">
      {/* <p
        ref={frameworkTextRef}
        className="text-[10px] uppercase tracking-[0.55em] text-gray-400 mb-4 font-mono ml-24 max-w-[1200px] mx-auto"
        style={{ opacity: 0 }}
      >
        Our Framework
      </p> */}
      <div
        ref={containerRef}
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-white/10 bg-[#141414] px-6 py-10 md:px-10 md:py-28 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        style={{ opacity: 0 }}
      >
        <div className="absolute -inset-4 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px] opacity-40"></div>

        <div className="relative z-10 flex flex-col gap-10 lg:flex-row">
          <div className="flex flex-row lg:flex-col items-center self-center lg:-space-y-2 gap-0.5 lg:gap-0">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = index === activeIndex;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(index)}
                  aria-label={tab.label}
                  className={`group relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 overflow-hidden ${isActive
                    ? "border-white/40 text-black shadow-[0_0_25px_rgba(255,255,255,0.2)] scale-105"
                    : "border-white/10 bg-black text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20"
                    }`}
                >
                  <span
                    className={`absolute inset-0 rounded-full bg-white transition-transform duration-300 ease-out ${isActive ? "scale-100" : "scale-0"
                      }`}
                  />
                  <Icon className="size-4 relative z-10" />
                </button>
              );
            })}
          </div>

          <div className="flex flex-1 flex-col gap-10 lg:flex-row lg:items-center">
            <div ref={textRef} className="max-w-xl">
              <p
                ref={labelRef}
                className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50"
              >
                {active.label}
              </p>
              <h2
                ref={titleRef}
                className="mt-3 text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white"
              >
                {active.title.split(" ").map((word, idx) => (
                  <span
                    key={`${word}-${idx}`}
                    className="word inline-block mr-2"
                  >
                    {word}
                  </span>
                ))}
              </h2>
              <p
                ref={descriptionRef}
                className="mt-4 text-base md:text-lg text-white/70 leading-relaxed"
              >
                {active.description}
              </p>
              <Link
                href={active.href}
                ref={buttonRef}
                className="mt-6 inline-flex items-center rounded-full bg-white/10 px-6 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] active:scale-95"
              >
                {active.cta}
              </Link>
            </div>

            <div ref={visualsRef} className="relative w-full max-w-xl">
              <div
                className="absolute -right-8 -top-10 h-24 w-24 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${active.accent}33, transparent 70%)`,
                }}
              />

              <div className="grid gap-4 md:grid-cols-2">
                {/* MAIN CARD — PRIMARY OVERVIEW */}
                <div className="md:col-span-2 rounded-2xl border border-white/10 bg-[#1b1b1b] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.45)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50">
                        {active.metricTitle}
                      </p>
                      <p className="text-lg font-semibold text-white">
                        {active.metricValue}
                      </p>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                      {active.metricSub}
                    </div>
                  </div>

                  {/* Timeline / Phases graph */}
                  <div className="mt-4 h-20 w-full rounded-xl bg-[#151515] p-3">
                    <div
                      className="h-full w-full rounded-lg"
                      style={{
                        background: `linear-gradient(90deg, ${active.accent} 0%, ${active.accent}80 60%, ${active.accent}40 100%)`,
                        clipPath:
                          "polygon(0 70%, 12% 62%, 28% 72%, 42% 50%, 58% 56%, 72% 42%, 86% 60%, 100% 48%, 100% 100%, 0 100%)",
                      }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                    <span>{active.timelineLabel}</span>
                    <span>{active.timelineValue}</span>
                  </div>

                  <Link
                    href={active.primaryHref}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
                  >
                    {active.primaryCta}
                    <span className="text-base">🚀</span>
                  </Link>
                </div>

                {/* CARD — KPI SNAPSHOT */}
                <div className="rounded-2xl border border-white/10 bg-[#1b1b1b] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.45)]">
                  <p className="text-xs uppercase tracking-wider text-white/50">
                    {active.cardTitle}
                  </p>

                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {active.cardValue}
                      </p>
                      <p className="text-xs text-white/60">
                        {active.cardSub}
                      </p>
                    </div>
                    <div className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/70">
                      {active.cardBadge}
                    </div>
                  </div>
                </div>

                {/* CARD — LIST */}
                <div className="rounded-2xl border border-white/10 bg-[#1b1b1b] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.45)]">
                  <p className="text-xs uppercase tracking-wider text-white/50">
                    {active.listTitle}
                  </p>

                  <div className="mt-4 space-y-3 text-xs text-white/70">
                    {active.listItems.map((item) => (
                      <div key={item} className="flex items-center justify-between">
                        <span>{item}</span>
                        <span>✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
