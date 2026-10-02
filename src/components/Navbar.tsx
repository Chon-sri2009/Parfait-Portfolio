"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const navItems = [
  { label: "Work", id: "work" },
  { label: "Approach", id: "expertise" },
  { label: "Award", id: "award" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const sections = ["home", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (sections.some((section) => section.id === id)) setActiveId(id);
    };
    window.addEventListener("hashchange", syncHash);
    syncHash();
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onEscape);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onEscape);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  const closeMenuAndFocus = (id: string) => {
    setMenuOpen(false);
    setActiveId(id);
    window.requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f2efe8]/90 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0c0b11]/85">
      <a href="#main-content" className="sr-only rounded-md bg-lime-300 px-4 py-2 font-bold text-black focus:not-sr-only focus:absolute focus:left-4 focus:top-20 focus:z-[60]">
        Skip to content
      </a>
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" onClick={() => setActiveId("home")} className="group flex items-center gap-3" aria-label="Chonlapol Srichayech — back to top">
          <span className="font-display grid size-10 place-items-center rounded-full bg-violet-600 text-sm font-black text-white transition-transform group-hover:-rotate-12 dark:bg-lime-300 dark:text-[#151218]">
            CS<span aria-hidden="true">.</span>
          </span>
          <span className="hidden sm:block">
            <span className="font-display block text-sm font-bold leading-none tracking-tight">Chonlapol Srichayech</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">Developer portfolio</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveId(item.id)}
              aria-current={activeId === item.id ? "location" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeId === item.id ? "bg-violet-600/10 text-violet-700 dark:bg-white/10 dark:text-lime-300" : "text-slate-600 hover:text-violet-700 dark:text-zinc-300 dark:hover:text-lime-300"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="grid size-10 place-items-center rounded-full border border-black/10 bg-white/40 transition hover:rotate-12 hover:border-violet-400 dark:border-white/15 dark:bg-white/5"
            aria-label="Toggle color theme"
          >
            <Moon className="size-4 dark:hidden" aria-hidden="true" />
            <Sun className="hidden size-4 dark:block" aria-hidden="true" />
          </button>
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-[#191621] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-violet-600 sm:inline-flex dark:bg-lime-300 dark:text-[#191621] dark:hover:bg-lime-200"
          >
            Let&apos;s connect <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-full border border-black/10 md:hidden dark:border-white/15"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="border-t border-black/10 bg-[#f2efe8] px-5 py-3 shadow-2xl md:hidden dark:border-white/10 dark:bg-[#141119]" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => closeMenuAndFocus(item.id)}
              className="font-display flex items-center justify-between border-b border-black/10 py-4 text-xl font-bold last:border-0 dark:border-white/10"
            >
              <span><span className="mr-4 text-xs font-semibold text-violet-600 dark:text-lime-300">0{index + 1}</span>{item.label}</span>
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          ))}
        </nav>
      )}
      <ScrollProgress />
    </header>
  );
}
