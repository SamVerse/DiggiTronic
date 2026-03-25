"use client";

import { motion } from "framer-motion";
import {
  Video,
  Globe,
  Code2,
  Megaphone,
  Search,
  Palette,
  Cpu,
} from "lucide-react";
import type { ReactNode } from "react";

// --- Configuration ---
const PRIMARY_COLOR = "#EB7300";
const BASE_WIRE_COLOR = "#1a2a35";
const GRID_TEAL = "#0a3a4a";

// --- Sub-Component: Circuit Node ---
interface CircuitNodeProps {
  x: number;
  y: number;
  icon: ReactNode;
  label: string;
  size?: "normal" | "large";
  delay?: number;
}

const CircuitNode = ({
  x,
  y,
  icon,
  label,
  size = "normal",
  delay = 0,
}: CircuitNodeProps) => {
  const width = size === "large" ? 110 : 80;
  const height = size === "large" ? 120 : 90;
  const iconSize = size === "large" ? "w-16 h-16" : "w-12 h-12";
  const iconScale = size === "large" ? 1.2 : 1;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: "spring", bounce: 0.4 }}
    >
      <foreignObject
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
      >
        <div className="flex flex-col items-center justify-center h-full group relative">
          <motion.div
            className={`relative ${iconSize} flex items-center justify-center rounded-2xl bg-[#0a0a0a] border border-[#333] shadow-lg z-10`}
            animate={{
              borderColor: ["#333", PRIMARY_COLOR, "#333"],
              boxShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "0 0 20px rgba(235,115,0,0.4)",
                "0 0 0px rgba(0,0,0,0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 0,
              delay: delay,
            }}
          >
            <motion.div
              className="text-gray-400"
              animate={{
                color: ["#9ca3af", PRIMARY_COLOR, "#9ca3af"],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2.5,
                delay: delay,
              }}
              style={{ scale: iconScale }}
            >
              {icon}
            </motion.div>

            <div
              className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#666] border border-black ${x < 500 ? "-right-1.5" : "-left-1.5"}`}
            />
          </motion.div>

          <div className="mt-3 text-[10px] font-bold text-gray-400 bg-black/80 px-2 py-1 rounded border border-white/10 uppercase tracking-wider text-center whitespace-nowrap z-10">
            {label}
          </div>
        </div>
      </foreignObject>
    </motion.g>
  );
};

// --- Sub-Component: Connection Path ---
interface ConnectionPathProps {
  d: string;
  delay?: number;
  duration?: number;
  isDownward?: boolean;
}

const ConnectionPath = ({
  d,
  delay = 0,
  duration = 1.5,
  isDownward = false,
}: ConnectionPathProps) => {
  const strokeW = isDownward ? 3 : 2;
  const filterRef = isDownward ? "url(#glow-pipeline)" : "url(#glow-comet)";

  // Downward pipes get 3 staggered particles for density
  const particles = isDownward
    ? [0, 1.0, 2.0].map((offset) => ({ delay: delay + offset, duration: 1.0 }))
    : [{ delay, duration }];

  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={BASE_WIRE_COLOR}
        strokeWidth={strokeW}
        opacity={isDownward ? 0.6 : 0.8}
      />

      {/* Energy packet(s) */}
      {particles.map((p, idx) => (
        <motion.path
          key={idx}
          d={d}
          fill="none"
          stroke={PRIMARY_COLOR}
          strokeWidth={strokeW}
          strokeLinecap="round"
          filter={filterRef}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, isDownward ? 0.25 : 0.4, 0],
            opacity: isDownward ? [0, 0.9, 0] : [0, 1, 0],
            pathOffset: [0, 1, 1],
          }}
          transition={{
            duration: p.duration,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 3 - p.duration,
            delay: p.delay,
          }}
        />
      ))}
    </>
  );
};

// --- Main Component ---
export default function AICircuit() {
  const cx = 500;
  const cy = 250;

  const leftNodes = [
    { id: "video", label: "Video Prod.", icon: <Video size={20} />, x: 150, y: 100, size: "normal" as const },
    { id: "social", label: "Social Media", icon: <Globe size={24} />, x: 80, y: 250, size: "large" as const },
    { id: "dev", label: "Development", icon: <Code2 size={20} />, x: 150, y: 400, size: "normal" as const },
  ];

  const rightNodes = [
    { id: "marketing", label: "Marketing", icon: <Megaphone size={20} />, x: 850, y: 100, size: "normal" as const },
    { id: "seo", label: "SEO Ranking", icon: <Search size={24} />, x: 920, y: 250, size: "large" as const },
    { id: "graphics", label: "Graphics", icon: <Palette size={20} />, x: 850, y: 400, size: "normal" as const },
  ];

  const getPathToCenter = (
    nodeX: number,
    nodeY: number,
    centerX: number,
    centerY: number,
    isRightSide: boolean
  ) => {
    const startX = isRightSide ? nodeX - 55 : nodeX + 55;
    const endX = isRightSide ? centerX + 70 : centerX - 70;

    if (Math.abs(nodeY - centerY) < 20) {
      return `M ${startX} ${nodeY} L ${endX} ${centerY}`;
    }

    const controlX1 = isRightSide ? startX - 80 : startX + 80;
    const controlX2 = isRightSide ? endX + 80 : endX - 80;

    return `M ${startX} ${nodeY} C ${controlX1} ${nodeY}, ${controlX2} ${centerY}, ${endX} ${centerY}`;
  };

  // Perspective grid intersection nodes (ray x_bottom meets cross y)
  // Formula: x_at_y = 500 + (x_bottom - 500) * (y - 560) / 160
  const gridNodes = [
    { cx: 400.0,  cy: 600,  delay: 0.00 },   // ray xb=100, y=600
    { cx: 378.1,  cy: 625,  delay: 0.25 },   // ray xb=200, y=625
    { cx: 387.5,  cy: 650,  delay: 0.50 },   // ray xb=300, y=650
    { cx: 425.0,  cy: 680,  delay: 0.75 },   // ray xb=400, y=680
    { cx: 500.0,  cy: 680,  delay: 1.00 },   // ray xb=500, y=680 (center)
    { cx: 575.0,  cy: 680,  delay: 1.25 },   // ray xb=600, y=680
    { cx: 612.5,  cy: 650,  delay: 1.50 },   // ray xb=700, y=650
    { cx: 621.9,  cy: 625,  delay: 1.75 },   // ray xb=800, y=625
    { cx: 600.0,  cy: 600,  delay: 2.00 },   // ray xb=900, y=600
    { cx: 450.0,  cy: 600,  delay: 2.25 },   // ray xb=300, y=600
    { cx: 550.0,  cy: 600,  delay: 2.50 },   // ray xb=700, y=600
    { cx: 500.0,  cy: 625,  delay: 2.75 },   // ray xb=500, y=625 (center)
  ];

  // Pipeline wire data (Bezier fan-out, chip pin → grid contact → bottom)
  const pipelineWires = [
    { d: "M 470 320 C 470 400, 440 520, 440 560 L 440 720", contactX: 440 },
    { d: "M 490 320 C 490 400, 480 520, 480 560 L 480 720", contactX: 480 },
    { d: "M 510 320 C 510 400, 520 520, 520 560 L 520 720", contactX: 520 },
    { d: "M 530 320 C 530 400, 560 520, 560 560 L 560 720", contactX: 560 },
  ];

  return (
    <div className="w-full h-[500px] md:h-[650px] relative">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 720">
        <defs>
          <linearGradient id="chip-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          {/* Comet glow — side connection energy packets */}
          <filter id="glow-comet" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pipeline glow — stronger bloom for downward data wires */}
          <filter id="glow-pipeline" x="-30%" y="-10%" width="160%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Chip halo — wide ambient glow around center chip */}
          <filter id="glow-chip" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Grid node glow — tiny intersection circles */}
          <filter id="glow-node" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ripple glow — contact flash circles */}
          <filter id="glow-ripple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g>

          {/* 9 Vertical rays from VP (500,560) to bottom */}
          <line x1="500" y1="560" x2="100" y2="720" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.150" />
          <line x1="500" y1="560" x2="200" y2="720" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.175" />
          <line x1="500" y1="560" x2="300" y2="720" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.200" />
          <line x1="500" y1="560" x2="400" y2="720" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.225" />
          <line x1="500" y1="560" x2="500" y2="720" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.250" />
          <line x1="500" y1="560" x2="600" y2="720" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.225" />
          <line x1="500" y1="560" x2="700" y2="720" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.200" />
          <line x1="500" y1="560" x2="800" y2="720" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.175" />
          <line x1="500" y1="560" x2="900" y2="720" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.150" />

          {/* 6 Horizontal cross-lines with perspective-correct widths */}
          {/* Formula: x = 500 ± 400*(y-560)/160 */}
          <line x1="450"   y1="580" x2="550"   y2="580" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.237" />
          <line x1="400"   y1="600" x2="600"   y2="600" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.225" />
          <line x1="337.5" y1="625" x2="662.5" y2="625" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.209" />
          <line x1="275"   y1="650" x2="725"   y2="650" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.194" />
          <line x1="200"   y1="680" x2="800"   y2="680" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.175" />
          <line x1="100"   y1="720" x2="900"   y2="720" stroke={GRID_TEAL} strokeWidth="0.8" opacity="0.150" />

          {/* 12 Intersection nodes — glowing with staggered breathing */}
          {gridNodes.map((node, i) => (
            <motion.circle
              key={`grid-node-${i}`}
              cx={node.cx}
              cy={node.cy}
              r="2.5"
              fill={GRID_TEAL}
              filter="url(#glow-node)"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                r: [2.5, 3.2, 2.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.delay,
              }}
            />
          ))}

          {/* Contact ripple circles at grid entry points */}
          {[440, 480, 520, 560].map((rippleCx, i) => (
            <motion.circle
              key={`ripple-${i}`}
              cx={rippleCx}
              cy={560}
              r={2}
              fill="none"
              stroke={PRIMARY_COLOR}
              strokeWidth="1.5"
              filter="url(#glow-ripple)"
              animate={{
                r: [2, 12],
                opacity: [0.7, 0],
                strokeWidth: [1.5, 0.5],
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 2.6,
                delay: 2.8 + i * 0.1,
              }}
            />
          ))}
        </g>

        {leftNodes.map((node, i) => (
          <ConnectionPath
            key={node.id}
            d={getPathToCenter(node.x, node.y, cx, cy, false)}
            delay={0.5 + i * 0.1}
            duration={1.5}
          />
        ))}

        {rightNodes.map((node, i) => (
          <ConnectionPath
            key={node.id}
            d={getPathToCenter(node.x, node.y, cx, cy, true)}
            delay={0.5 + i * 0.1}
            duration={1.5}
          />
        ))}

        {pipelineWires.map((wire, i) => (
          <ConnectionPath
            key={`pipeline-${i}`}
            d={wire.d}
            delay={2.0 + i * 0.1}
            duration={1.0}
            isDownward={true}
          />
        ))}

        <motion.g
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Ambient halo — soft static glow */}
          <circle
            cx={cx}
            cy={cy}
            r="110"
            fill={PRIMARY_COLOR}
            filter="url(#glow-chip)"
            opacity="0.07"
          />

          {/* Chip pulse ring — syncs with wire arrival at 2.0s */}
          <motion.circle
            cx={cx}
            cy={cy}
            r="100"
            fill="none"
            stroke={PRIMARY_COLOR}
            strokeWidth="1"
            strokeDasharray="6 6"
            animate={{
              opacity: [0, 0.5, 0],
              scale: [1, 1.1, 1.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 2.0,
            }}
          />

          <g>
            <rect
              x={cx - 90}
              y={cy - 90}
              width="180"
              height="180"
              rx="30"
              fill="url(#chip-gradient)"
              stroke="#333"
              strokeWidth="2"
              className="drop-shadow-2xl"
            />

            {/* Inner orange border — animated glow intensity */}
            <motion.rect
              x={cx - 55}
              y={cy - 55}
              width="110"
              height="110"
              rx="20"
              fill="none"
              stroke={PRIMARY_COLOR}
              strokeWidth="2"
              animate={{
                strokeOpacity: [0.6, 1.0, 0.6],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <rect x={cx - 20} y={cy - 78} width="40" height="8" fill="#333" rx="2" />
            <rect x={cx - 20} y={cy + 70} width="40" height="8" fill="#333" rx="2" />

            <foreignObject x={cx - 50} y={cy - 50} width="100" height="100">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Cpu className="text-[#EB7300]" size={30} />
              </div>
            </foreignObject>
          </g>
        </motion.g>

        <g>
          {leftNodes.map((node, i) => (
            <CircuitNode key={node.id} {...node} delay={i * 0.1} />
          ))}
          {rightNodes.map((node, i) => (
            <CircuitNode key={node.id} {...node} delay={i * 0.1} />
          ))}
        </g>
      </svg>
    </div>
  );
}
