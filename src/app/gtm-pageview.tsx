"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function GTMPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const qs = searchParams.toString();
    const url = pathname + (qs ? `?${qs}` : "");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "pageview", page: url });
  }, [pathname, searchParams]);

  return null;
}
