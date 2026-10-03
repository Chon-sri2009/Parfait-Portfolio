"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

interface ContainerScrollProps {
  titleComponent: ReactNode;
  children: ReactNode;
}

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.22 });

  const rotateX = useTransform(smoothProgress, [0, 0.72], [11, 0]);
  const scale = useTransform(smoothProgress, [0, 0.72], [0.9, 1]);
  const cardY = useTransform(smoothProgress, [0, 0.72], [44, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.72], [20, -12]);

  return (
    <div ref={containerRef} className={reduceMotion ? "relative py-16 sm:py-24" : "relative h-[150vh] min-h-[950px]"}>
      <div className={`${reduceMotion ? "relative" : "sticky top-[72px] h-[calc(100vh-72px)]"} flex flex-col items-center justify-center gap-7 px-1 sm:gap-10`}>
        <motion.div
          className="relative z-10 w-full text-center"
          style={reduceMotion ? undefined : { y: titleY }}
        >
          {titleComponent}
        </motion.div>

        <div className="w-full max-w-6xl" style={{ perspective: "1600px" }}>
          <motion.div
            data-scroll-card
            className="relative mx-auto h-[54vh] min-h-[360px] max-h-[590px] w-full will-change-transform sm:h-[62vh]"
            style={
              reduceMotion
                ? undefined
                : { rotateX, scale, y: cardY, transformOrigin: "center top", transformStyle: "preserve-3d" }
            }
          >
            <div className="h-full overflow-hidden rounded-[1.5rem] border-[6px] border-[#202b3d] bg-[#0c1421] shadow-[0_35px_100px_rgba(2,6,23,0.4)] sm:rounded-[2rem] sm:border-[10px]">
              {children}
            </div>
            <div className="pointer-events-none absolute inset-x-[8%] -bottom-7 h-12 rounded-full bg-indigo-500/25 blur-3xl" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
