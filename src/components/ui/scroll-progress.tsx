"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

export function ScrollProgress() {
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.25 });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left bg-violet-500 dark:bg-lime-300"
      style={{ scaleX: smoothProgress }}
    />
  );
}
