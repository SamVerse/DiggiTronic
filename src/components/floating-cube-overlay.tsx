"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import {
  Palette,
  Code,
  TrendingUp,
  Search,
  Cpu,
  Film,
  Share2,
} from "lucide-react";
import HeroCube from "./hero-cube";

const ORBITAL_SIZE = 560; // total size of the orbital canvas
const CUBE_SIZE = 290; // Three.js canvas

const ORBITS = [
  {
    radius: 130,
    duration: 11,
    delay: 0.05,
    icons: [
      { Icon: Palette, startAngle: 15, label: "Design" },
      { Icon: Code, startAngle: 195, label: "Development" },
    ],
  },
  {
    radius: 185,
    duration: 18,
    delay: 0.22,
    icons: [
      { Icon: TrendingUp, startAngle: 60, label: "Marketing" },
      { Icon: Search, startAngle: 240, label: "SEO" },
    ],
  },
  {
    radius: 248,
    duration: 28,
    delay: 0.42,
    icons: [
      { Icon: Cpu, startAngle: 20, label: "AI" },
      { Icon: Film, startAngle: 140, label: "Video" },
      { Icon: Share2, startAngle: 260, label: "Social" },
    ],
  },
];

export default function FloatingCubeOverlay() {
  const [vh, setVh] = useState(900);
  const [isLanded, setIsLanded] = useState(false);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollY } = useScroll();

  // Toggle landed state — once cube reaches agency section, orbits pop in
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsLanded(latest >= vh * 0.9);
  });

  // X: starts centered in hero (50vw), ends at right of agency (75vw)
  const rawX = useTransform(scrollY, [0, vh], [50, 75]);
  // Y: starts lower (78vh) so it doesn't overlap with buttons
  // lands at 50vh, then mathematically scrolls 1:1 with the page so it sticks to the agency section mapping
  const rawY = useTransform(scrollY, [0, vh, vh * 20], [78, 50, -1850]);
  // Scale: slight shrink on landing — the spring overshoot gives a "thunk" feel
  const rawScale = useTransform(scrollY, [0, vh], [1, 0.9]);

  // Fade out gracefully after both sections have been passed
  const opacity = useTransform(scrollY, [vh * 2.0, vh * 2.5], [1, 0]);

  // Springs — physical weight to position & scale
  const x = useSpring(rawX, { stiffness: 40, damping: 16, mass: 1.3 });
  const y = useSpring(rawY, { stiffness: 40, damping: 16, mass: 1.3 });
  const scale = useSpring(rawScale, { stiffness: 60, damping: 16 });

  // Convert % to CSS calc so the ORBITAL_SIZE container is centered on the point
  const half = ORBITAL_SIZE / 2;
  const left = useTransform(x, (v) => `calc(${v}vw - ${half}px)`);
  const top = useTransform(y, (v) => `calc(${v}vh - ${half}px)`);

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        left,
        top,
        width: ORBITAL_SIZE,
        height: ORBITAL_SIZE,
        scale,
        opacity,
        zIndex: 25,
        overflow: "visible",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 220,
          height: 220,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,77,0,0.18) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: CUBE_SIZE,
          height: CUBE_SIZE,
          transform: "translate(-50%, -50%)",
        }}
      >
        <HeroCube />
      </div>

      <div style={{ position: "absolute", inset: 0 }}>
        {ORBITS.map((orbit, oi) => (
          <motion.div
            key={oi}
            style={{ position: "absolute", inset: 0 }}
            initial={false}
            animate={
              isLanded
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: orbit.delay,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: orbit.radius * 2,
                height: orbit.radius * 2,
                marginTop: -orbit.radius,
                marginLeft: -orbit.radius,
                borderRadius: "50%",
                border: `3px dashed rgba(0,0,0,${0.35 - oi * 0.08})`,
              }}
            />

            {orbit.icons.map(({ Icon, startAngle, label }, ii) => (
              <motion.div
                key={label}
                initial={false}
                animate={
                  isLanded
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 20,
                  delay: orbit.delay + 0.28 + ii * 0.12,
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 0,
                  height: 0,
                }}
              >
                {/* Orbit rotator — spins the icon around the center */}
                <motion.div
                  initial={{ rotate: startAngle }}
                  animate={{ rotate: startAngle + 360 }}
                  transition={{
                    duration: orbit.duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ width: 0, height: 0 }}
                >
                  {/* Counter-rotation keeps the icon face upright */}
                  <motion.div
                    initial={{ rotate: -startAngle }}
                    animate={{ rotate: -(startAngle + 360) }}
                    transition={{
                      duration: orbit.duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      position: "absolute",
                      x: orbit.radius - 24,
                      y: -24,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "white",
                        border: "2px solid rgba(255,77,0,0.35)",
                        boxShadow: "0 4px 16px rgba(255,77,0,0.12), 0 0 0 3px rgba(255,77,0,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={22} color="#EB7300" strokeWidth={2.0} />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
