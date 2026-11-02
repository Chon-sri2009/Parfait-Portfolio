"use client";

import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";

// Storage can be missing or throw (private windows, blocked site data), so writes also land in memory.
const memory = new Map<string, string>();
const listeners = new Set<() => void>();

function readRaw(key: string) {
  try {
    const stored = window.localStorage.getItem(key);
    if (stored !== null) return stored;
  } catch {}
  return memory.get(key) ?? null;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function parse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** State saved in this browser. The server render and first paint use `fallback`, which must be a stable value. */
export function useStoredState<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(subscribe, () => readRaw(key), () => null);
  const value = useMemo(() => parse(raw, fallback), [raw, fallback]);

  const setValue = useCallback(
    (update: T | ((current: T) => T)) => {
      const current = parse(readRaw(key), fallback);
      const next = typeof update === "function" ? (update as (current: T) => T)(current) : update;
      const serialized = JSON.stringify(next);
      memory.set(key, serialized);
      try {
        window.localStorage.setItem(key, serialized);
      } catch {}
      listeners.forEach((listener) => listener());
    },
    [key, fallback],
  );

  return [value, setValue] as const;
}

/** Copies text and reports which item was copied for two seconds, for a visible and announced confirmation. */
export function useCopy() {
  const [copied, setCopied] = useState<{ key: string; ok: boolean } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(async (text: string, key = "default") => {
    let ok = true;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      ok = false;
    }
    setCopied({ key, ok });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 2000);
  }, []);

  return { copied, copy };
}
