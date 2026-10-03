"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Braces, BriefcaseBusiness, Database, GitBranch, Medal, Pause, Play, Workflow } from "lucide-react";
import { capabilitiesData, profile } from "@/lib/data";
import { renderCanvas } from "@/components/ui/canvas";
import { Reveal } from "@/components/ui/reveal";
import { setMotionEnabled, useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

const capabilityIcons = [Braces, Workflow, Database];
const tickerText = "DESIGN FOR PEOPLE ✳ ENGINEER FOR PURPOSE ✳ BUILD WHAT MATTERS ✳";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const [tickerPaused, setTickerPaused] = useState(false);
  const tickerPlaying = !reduceMotion && !tickerPaused;
  useEffect(() => {
    if (reduceMotion || !heroRef.current || !canvasRef.current) return;
    return renderCanvas(canvasRef.current, heroRef.current);
  }, [reduceMotion]);

  return (
    <>
      <section ref={heroRef} id="home" tabIndex={-1} aria-labelledby="home-title" className="relative isolate overflow-hidden pt-32 sm:pt-40">
        <div className="surface-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-40 size-[420px] rounded-full bg-violet-500/12 blur-[120px] dark:bg-violet-500/20" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 top-20 size-[420px] rounded-full bg-lime-300/15 blur-[130px]" aria-hidden="true" />
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-5 pb-24 sm:px-8 sm:pb-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-violet-700 dark:text-lime-300">
              <span className="inline-block size-2 rounded-full bg-violet-600 shadow-[0_0_0_5px_rgba(109,61,244,0.12)] dark:bg-lime-300" aria-hidden="true" />
              Developer portfolio <span className="text-slate-400 dark:text-zinc-600" aria-hidden="true">/</span> Thailand · 2026
            </div>

            <h1 id="home-title" className="font-display max-w-[830px] text-[clamp(2.75rem,7.8vw,8rem)] font-bold leading-[0.88] tracking-[-0.075em]">
              <span className="block">Mr.Chonlapol</span>
              <span className="block text-violet-600 dark:text-lime-300">Srichayech<span className="text-[#191621] dark:text-white">.</span></span>
            </h1>

            <p className="font-display mt-9 max-w-[660px] text-[clamp(1.35rem,2.2vw,2rem)] font-medium leading-tight tracking-tight">
              I build business software <span className="text-violet-600 dark:text-lime-300">with people in mind.</span>
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg dark:text-zinc-400">
              From messy requirements to thoughtful interfaces, I turn complex workflows into digital tools that feel clear, useful, and human.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#work" className="group inline-flex items-center justify-center gap-3 rounded-full bg-violet-600 px-7 py-4 text-sm font-bold text-white shadow-[0_20px_45px_rgba(109,61,244,0.25)] transition hover:-translate-y-1 hover:bg-violet-500 focus-visible:-translate-y-1 dark:bg-lime-300 dark:text-[#151218] dark:hover:bg-lime-200">
                See my work <ArrowDownRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" aria-hidden="true" />
              </a>
              <a href="#award" className="inline-flex items-center justify-center gap-3 rounded-full border border-black/15 bg-white/50 px-7 py-4 text-sm font-bold transition hover:-translate-y-1 hover:border-violet-500 focus-visible:-translate-y-1 dark:border-white/20 dark:bg-white/5 dark:hover:border-lime-300">
                The WorldSkills story <Medal className="size-4 text-amber-600 dark:text-amber-300" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-11 flex items-center gap-5 border-t border-black/10 pt-5 dark:border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-500">Find me online</p>
              <a href="https://github.com/Chon-sri2009/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-semibold hover:text-violet-700 dark:hover:text-lime-300" aria-label="Chonlapol on GitHub (opens in a new tab)">
                <GitBranch className="size-4" aria-hidden="true" /> GitHub <ArrowUpRight className="size-3 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/in/chonlapol-srichayech-40a802381/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-semibold hover:text-violet-700 dark:hover:text-lime-300" aria-label="Chonlapol on LinkedIn (opens in a new tab)">
                <BriefcaseBusiness className="size-4" aria-hidden="true" /> LinkedIn <ArrowUpRight className="size-3 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          <motion.div
            data-portrait-frame
            className="relative mx-auto w-full max-w-[530px]"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -inset-4 rotate-[5deg] rounded-[2.5rem] border-2 border-violet-500/35 dark:border-lime-300/35" aria-hidden="true" />
            <div className="absolute -inset-4 -rotate-[4deg] rounded-[2.5rem] bg-violet-500/10 dark:bg-lime-300/8" aria-hidden="true" />
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#261e31] shadow-[0_40px_100px_rgba(24,13,44,0.32)]">
              <Image
                src={profile.portraitSrc}
                alt="Chonlapol Srichayech holding his WorldSkills Thailand medal"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="scale-[1.16] object-cover object-[center_68%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#130e1c]/85 via-transparent to-[#130e1c]/10" aria-hidden="true" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 text-white sm:p-9">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-lime-300">WorldSkills Thailand</p>
                  <p className="font-display mt-2 text-xl font-semibold sm:text-2xl">Regional podium · 2026</p>
                </div>
                <span className="font-display text-5xl font-bold tracking-[-0.08em] text-lime-300" aria-hidden="true">03</span>
                <span className="sr-only">Third place.</span>
              </figcaption>
            </figure>
            <div className="absolute -right-4 top-8 rounded-2xl border border-white/25 bg-[#191621] px-5 py-4 text-white shadow-2xl sm:-right-8 sm:top-12" aria-hidden="true">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-lime-300">Achievement unlocked</p>
              <p className="font-display mt-1 text-lg font-bold">3rd place ↗</p>
            </div>
          </motion.div>
        </div>
        <div className="relative mx-auto flex max-w-[1440px] items-center justify-between border-t border-black/10 px-5 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:px-8 lg:px-12 dark:border-white/10 dark:text-zinc-500">
          <span>IT Software Solutions for Business</span>
          <a href="#expertise" className="inline-flex items-center gap-2 hover:text-violet-700 dark:hover:text-lime-300">Scroll to explore <ArrowDownRight className="size-4" aria-hidden="true" /></a>
        </div>
      </section>

      <div className="relative overflow-hidden border-y border-black/10 bg-lime-300 py-3 text-[#191621] dark:border-white/10">
        <div className="ticker-track font-display flex text-lg font-black uppercase tracking-[-0.02em] sm:text-2xl" data-playing={tickerPlaying} aria-hidden="true">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className="shrink-0 whitespace-nowrap px-4">{tickerText}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-lime-300 via-lime-300/95 to-transparent" aria-hidden="true" />
        <button
          type="button"
          onClick={() => {
            if (reduceMotion) {
              setTickerPaused(false);
              setMotionEnabled(true);
            } else {
              setTickerPaused(tickerPlaying);
            }
          }}
          className="absolute right-3 top-1/2 z-10 inline-flex -translate-y-1/2 items-center gap-2 rounded-full bg-[#191621] px-3 py-2 text-xs font-bold text-lime-300 shadow-lg transition hover:bg-[#322b3c] sm:right-5"
          aria-label={tickerPlaying ? "Pause scrolling text" : reduceMotion ? "Turn on animations and play scrolling text" : "Play scrolling text"}
        >
          {tickerPlaying ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
          <span className="hidden sm:inline">{tickerPlaying ? "Pause" : "Play"}</span>
        </button>
      </div>

      <section id="expertise" tabIndex={-1} aria-labelledby="expertise-title" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="grid gap-7 lg:grid-cols-[0.65fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-700 dark:text-lime-300">01 / How I work</p>
              <h2 id="expertise-title" className="font-display mt-5 max-w-xl text-[clamp(2.8rem,5.5vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.06em]">More than writing code<span className="text-violet-600 dark:text-lime-300">.</span></h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end dark:text-zinc-400">Good software starts with listening. I connect the business problem, the user journey, and the engineering needed to make an idea real.</p>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {capabilitiesData.map((item, index) => {
              const Icon = capabilityIcons[index];
              return (
                <Reveal key={item.id} delay={index * 0.1} className="group relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/55 p-7 transition hover:-translate-y-2 hover:border-violet-400/50 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-lime-300/40 sm:p-9">
                  <span className="font-display absolute right-6 top-5 text-5xl font-black text-black/[0.055] dark:text-white/[0.055]" aria-hidden="true">{item.id}</span>
                  <span className="grid size-12 place-items-center rounded-xl bg-violet-600/10 text-violet-700 dark:bg-lime-300/10 dark:text-lime-300"><Icon className="size-5" aria-hidden="true" /></span>
                  <h3 className="font-display mt-12 text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-zinc-400">{item.description}</p>
                  <span className="mt-8 block h-px w-full bg-black/10 dark:bg-white/10" aria-hidden="true" />
                  <span className="mt-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-lime-300">0{index + 1} / 03</span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
