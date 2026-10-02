"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

export function GlowCard({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (event: PointerEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const { clientX: x, clientY: y } = event;
      card.style.setProperty("--x", x.toFixed(2));
      card.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
      card.style.setProperty("--y", y.toFixed(2));
      card.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
    };

    document.addEventListener("pointermove", syncPointer, { passive: true });
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];
  const style = {
    "--base": base,
    "--spread": spread,
    width: width === undefined ? undefined : typeof width === "number" ? `${width}px` : width,
    height: height === undefined ? undefined : typeof height === "number" ? `${height}px` : height,
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      data-glow-card
      style={style}
      className={`${customSize ? "" : `${sizeMap[size]} aspect-[3/4]`} relative grid grid-rows-[1fr_auto] gap-4 rounded-2xl p-4 shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px] ${className}`}
    >
      <div ref={innerRef} data-glow-inner aria-hidden="true" />
      {children}
    </div>
  );
}
