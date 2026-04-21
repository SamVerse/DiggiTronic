"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once at module level — safe with SSR guard
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisScroll() {
  useEffect(() => {
    // Detect if the device primarily uses touch (mobile phones/tablets)
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    // For touch devices, we rely entirely on the native, highly-optimized hardware momentum scroll.
    // Lenis is known to sometimes cause "rigid" or "tough" scrolling drag on mobile devices
    // due to main-thread processing loads during touch-drag interactions.
    if (isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      anchors: true,
      touchMultiplier: 2,
    });

    // Forward Lenis scroll updates to the native scroll event (Navbar uses this)
    const onScroll = () => window.dispatchEvent(new Event("scroll"));
    lenis.on("scroll", onScroll);

    // Feed Lenis virtual scroll position into GSAP ScrollTrigger
    // This keeps scrub animations perfectly in sync with Lenis easing
    lenis.on("scroll", ScrollTrigger.update);

    // Replace rAF loop with GSAP's ticker as the single master clock.
    // gsap.ticker provides seconds; Lenis.raf() expects milliseconds.
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);

    // Disable GSAP lag smoothing — Lenis is the sole physics driver
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return null;
}
