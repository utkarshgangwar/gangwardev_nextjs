"use client";

import React, { useEffect, useRef } from "react";
import { IconType } from "react-icons";
import {
  SiNodedotjs,
  SiReact,
  SiMongodb,
  SiHtml5,
  SiCss,
  SiMysql,
  SiC,
  SiCplusplus,
  SiAngular,
  SiGooglecloud,
  SiRedux,
  SiBootstrap,
  SiTailwindcss,
  SiSst,
  SiPython,
  SiRetool,
  SiSocketdotio,
  SiNextdotjs,
} from "react-icons/si";
import { TbLambda, TbDatabase, TbBrandAws } from "react-icons/tb";

const iconMap: Record<string, { icon: IconType; color: string }> = {
  nodejs: { icon: SiNodedotjs, color: "text-[#339933]" },
  react: { icon: SiReact, color: "text-[#61DAFB]" },
  mongodb: { icon: SiMongodb, color: "text-[#47A248]" },
  html: { icon: SiHtml5, color: "text-[#E34F26]" },
  css: { icon: SiCss, color: "text-[#1572B6]" },
  mysql: { icon: SiMysql, color: "text-[#4479A1]" },
  c: { icon: SiC, color: "text-[#A8B9CC]" },
  cplusplus: { icon: SiCplusplus, color: "text-[#00599C]" },
  angular: { icon: SiAngular, color: "text-[#DD0031]" },
  ec2: { icon: TbBrandAws, color: "text-[#FF9900]" },
  gcp: { icon: SiGooglecloud, color: "text-[#4285F4]" },
  redux: { icon: SiRedux, color: "text-[#764ABC]" },
  bootstrap: { icon: SiBootstrap, color: "text-[#7952B3]" },
  tailwindcss: { icon: SiTailwindcss, color: "text-[#06B6D4]" },
  dynamodb: { icon: TbDatabase, color: "text-[#4053D6]" },
  sst: { icon: SiSst, color: "text-[#E25A24]" },
  python: { icon: SiPython, color: "text-[#3776AB]" },
  retool: { icon: SiRetool, color: "text-[#2563EB]" },
  lambda: { icon: TbLambda, color: "text-[#FF9900]" },
  socketio: { icon: SiSocketdotio, color: "text-[#010101] dark:text-white" },
  reactnative: { icon: SiReact, color: "text-[#61DAFB]" },
  nextjs: { icon: SiNextdotjs, color: "text-black dark:text-white" },
};

interface ServerTechItem {
  name: string;
  iconId: string;
}

interface BubbleState {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  ref: HTMLDivElement | null;
}

interface TechCanvasProps {
  techStack: ServerTechItem[];
}

export default function TechCanvas({ techStack }: TechCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  const bubblesData = useRef<BubbleState[]>(
    techStack.map((_, index) => ({
      id: index,
      x: 0,
      y: 0,
      dx: (Math.random() - 0.5) * 2, // Slightly reduced speed for better mobile UX
      dy: (Math.random() - 0.5) * 2,
      ref: null,
    })),
  );

  useEffect(() => {
    // Determine dynamic size parameter for safe initial spawn tracking
    const isMobile = window.innerWidth < 768;
    const initialBubbleSize = isMobile ? 80 : 120;

    bubblesData.current.forEach((bubble) => {
      bubble.x = Math.random() * (window.innerWidth - initialBubbleSize);
      bubble.y = Math.random() * (window.innerHeight - initialBubbleSize);
    });

    const animate = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Dynamic collision detection sizes updated frame-by-frame matching CSS classes
      const bubbleSize = window.innerWidth < 768 ? 80 : 120;

      bubblesData.current.forEach((bubble) => {
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        if (bubble.x + bubbleSize >= width || bubble.x <= 0) {
          bubble.dx = -bubble.dx;
          bubble.x = Math.max(0, Math.min(bubble.x, width - bubbleSize));
        }
        if (bubble.y + bubbleSize >= height || bubble.y <= 0) {
          bubble.dy = -bubble.dy;
          bubble.y = Math.max(0, Math.min(bubble.y, height - bubbleSize));
        }

        if (bubble.ref) {
          bubble.ref.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0)`;
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      className="relative w-full h-full min-h-screen overflow-hidden bg-slate-50 dark:bg-black p-0 min-w-[100%]"
      ref={containerRef}
    >
      {techStack.map((tech, index) => {
        const iconConfig = iconMap[tech.iconId];
        if (!iconConfig) return null;

        const IconComponent = iconConfig.icon;

        return (
          <div
            key={index}
            /* 
              Responsive structural adjustments:
              - Mobile size: w-[80px] h-[80px] with lighter p-2 padding
              - Tablet/Desktop size: md:w-[120px] md:h-[120px] with p-3 padding
            */
            className="absolute left-0 top-0 w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex flex-col items-center justify-center rounded-full border border-slate-200/60 dark:border-slate-800 bg-white/80 dark:bg-zinc-900/80 shadow-sm backdrop-blur-sm p-2 md:p-3 select-none"
            ref={(el) => {
              if (bubblesData.current[index]) {
                bubblesData.current[index].ref = el;
              }
            }}
            style={{ willChange: "transform" }}
          >
            {/* Responsive Icon: w-7 h-7 on mobile -> md:w-12 md:h-12 on desktop */}
            <IconComponent
              className={`w-7 h-7 md:w-12 md:h-12 ${iconConfig.color} transition-colors duration-300`}
            />

            {/* Responsive Typography: micro text-xxs sizing on small nodes to handle string text wrapping */}
            <p className="mt-1 md:mt-2 text-[0.58rem] md:text-[0.72rem] font-bold tracking-tight text-slate-600 dark:text-slate-300 text-center truncate w-full px-0.5 md:px-1">
              {tech.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
