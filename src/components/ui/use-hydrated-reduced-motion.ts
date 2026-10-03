"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const storageKey = "portfolio-motion";
const changeEvent = "portfolio-motion-change";

type MotionOverride = "on" | "off" | null;
let volatileOverride: MotionOverride = null;

function getOverride(): MotionOverride {
  try {
    const value = window.localStorage.getItem(storageKey);
    return value === "on" || value === "off" ? value : null;
  } catch {
    return volatileOverride;
  }
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

function getSnapshot() {
  const override = getOverride();
  return override === "off" || (override === null && window.matchMedia(query).matches);
}

function getServerSnapshot() {
  return false;
}

// Keep the first client render identical to the server render, then honor the
// saved choice or the OS setting. The user can explicitly opt in to motion.
export function useHydratedReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setMotionEnabled(enabled: boolean) {
  volatileOverride = enabled ? "on" : "off";
  try {
    window.localStorage.setItem(storageKey, volatileOverride);
  } catch {
    // The current tab can still use the choice when storage is unavailable.
  }
  document.documentElement.dataset.motion = enabled ? "on" : "off";
  window.dispatchEvent(new Event(changeEvent));
}
