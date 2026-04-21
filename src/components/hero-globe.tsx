"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import World to avoid SSR issues with WebGL
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

const GLOBE_CONFIG = {
  pointSize: 1.6,
  globeColor: "#050e1c",       // deep navy — the "earth" body
  showAtmosphere: true,
  atmosphereColor: "#EB7300",  // highly visible navy atmosphere
  atmosphereAltitude: 0.25,
  emissive: "#0b1b31",
  emissiveIntensity: 0.8,
  shininess: 1.5,
  polygonColor: "rgba(255,255,255,0.85)", // bright white/blue landmasses
  ambientLight: "#3a5a80",
  directionalLeftLight: "#EB7300",  // orange key light = brand color bleed
  directionalTopLight: "#ffffff",
  pointLight: "#EB7300",
  arcTime: 1800,
  arcLength: 0.92,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.75,
};

// Arc data — all orange brand color, spanning global routes
const SAMPLE_ARCS = [
  { order: 1, startLat: 40.71, startLng: -74.01, endLat: 51.51, endLng: -0.13, arcAlt: 0.32, color: "#EB7300" },
  { order: 2, startLat: 48.85, startLng: 2.35, endLat: 35.69, endLng: 139.69, arcAlt: 0.42, color: "#EB7300" },
  { order: 3, startLat: 1.35, startLng: 103.82, endLat: -33.87, endLng: 151.21, arcAlt: 0.28, color: "#EB7300" },
  { order: 4, startLat: 19.43, startLng: -99.13, endLat: -23.55, endLng: -46.63, arcAlt: 0.35, color: "#ff8040" },
  { order: 5, startLat: 55.75, startLng: 37.62, endLat: 28.61, endLng: 77.21, arcAlt: 0.3, color: "#EB7300" },
  { order: 6, startLat: 37.77, startLng: -122.4, endLat: 40.71, endLng: -74.01, arcAlt: 0.2, color: "#EB7300" },
  { order: 7, startLat: 25.2, startLng: 55.27, endLat: 48.85, endLng: 2.35, arcAlt: 0.25, color: "#EB7300" },
  { order: 8, startLat: -1.29, startLng: 36.82, endLat: 51.51, endLng: -0.13, arcAlt: 0.38, color: "#ff8040" },
  { order: 9, startLat: 13.75, startLng: 100.52, endLat: 22.32, endLng: 114.17, arcAlt: 0.18, color: "#EB7300" },
  { order: 10, startLat: 41.01, startLng: 28.97, endLat: 1.35, endLng: 103.82, arcAlt: 0.33, color: "#EB7300" },
  { order: 11, startLat: 52.37, startLng: 4.89, endLat: 40.71, endLng: -74.01, arcAlt: 0.29, color: "#EB7300" },
  { order: 12, startLat: -34.6, startLng: -58.38, endLat: 37.77, endLng: -122.4, arcAlt: 0.45, color: "#EB7300" },
];

export default function HeroGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    // Outer wrapper — establishes the clipping boundary
    // overflow-hidden clips the bottom 2/3 so only the top arc is visible
    <div
      ref={wrapRef}
      className="relative w-full pointer-events-none select-none"
      style={{
        // We set overflow to "visible" below so it is NO LONGER clipped at the top!
        // The globe rays can freely extend upwards behind the "No Boundaries" text.
        height: "clamp(280px, 50vw, 780px)",
        overflow: "visible", // Allowed to overlap!
      }}
    >
      {/* Entrance animation — slides up from below on mount */}
      <motion.div
        initial={{ y: "60%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 55,
          damping: 22,
          delay: 0.6,
        }}
        className="absolute inset-0"
      >
        <div
          className="absolute left-1/2 top-[-10%] sm:top-[5%] md:top-[20%] lg:top-[50%] -translate-x-1/2"
          style={{
            // `height`      — Because overflow is visible, making this taller just increases the 3D sphere size.
            // Responsive positioning is now handled via Tailwind classes above!
            width: "100%",
            height: "clamp(700px, 110vw, 1300px)",
          }}
        >
          <World globeConfig={GLOBE_CONFIG} data={SAMPLE_ARCS} />
        </div>
      </motion.div>
    </div>
  );
}
