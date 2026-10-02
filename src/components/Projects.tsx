"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Boxes, GitBranch } from "lucide-react";
import ScrollShowcase from "@/components/ScrollShowcase";
import { projectsData } from "@/lib/data";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

const projectIcons = [Boxes, BarChart3, GitBranch];
const accentStyles = {
  indigo: { dot: "bg-violet-500", text: "text-violet-500", glow: "bg-violet-500/20" },
  cyan: { dot: "bg-cyan-400", text: "text-cyan-400", glow: "bg-cyan-400/20" },
  amber: { dot: "bg-amber-400", text: "text-amber-400", glow: "bg-amber-400/20" },
};

export default function Projects() {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <section id="work" tabIndex={-1} aria-labelledby="work-title" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-700 dark:text-lime-300">03 / Selected work</p>
            <h2 id="work-title" className="font-display mt-5 max-w-2xl text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.98] tracking-[-0.06em]">
              Ideas, made <span className="text-violet-600 dark:text-lime-300">visible.</span>
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end dark:text-zinc-400">
            A set of interface concepts exploring operations, finance, and automation. They show how I think through real business workflows—not commissioned client work.
          </p>
        </div>

        <ScrollShowcase />

        <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-5 dark:border-white/10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-700 dark:text-lime-300">Concept studies / 2026</p>
          <p className="font-display text-sm font-semibold text-slate-500 dark:text-zinc-500">01 — 03</p>
        </div>

        <div className="space-y-6">
          {projectsData.map((project, index) => {
            const Icon = projectIcons[index];
            const accent = accentStyles[project.accent as keyof typeof accentStyles];

            return (
              <motion.article
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white/65 shadow-[0_18px_70px_rgba(15,23,42,0.045)] transition-colors hover:border-violet-400/60 dark:border-white/10 dark:bg-[#17131d] dark:hover:border-lime-300/35"
              >
                <div className="grid lg:grid-cols-[1fr_0.9fr]">
                  <div className={`flex flex-col p-7 sm:p-10 lg:p-12 ${index === 1 ? "lg:order-2" : ""}`}>
                    <div className="flex items-center justify-between gap-5">
                      <span className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 dark:text-zinc-400">
                        <span className={`size-2 rounded-full ${accent.dot}`} aria-hidden="true" /> {project.category}
                      </span>
                      <span className="font-display text-sm font-bold text-slate-400 dark:text-zinc-600">/{project.id}</span>
                    </div>

                    <div className="my-auto py-12">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-lime-300">Concept {project.id}</p>
                      <h3 className="font-display mt-3 max-w-xl text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-5xl">{project.title}</h3>
                      <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-zinc-400">{project.description}</p>
                    </div>

                    <div role="group" className="flex flex-wrap gap-2 border-t border-black/10 pt-6 dark:border-white/10" aria-label="Technologies explored">
                      {project.technologies.map((technology) => (
                        <span key={technology} className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-semibold text-slate-600 dark:border-white/15 dark:text-zinc-300">{technology}</span>
                      ))}
                    </div>
                  </div>

                  <div className={`relative min-h-[330px] overflow-hidden bg-[#100e19] p-5 sm:p-8 ${index === 1 ? "lg:order-1" : ""}`} role="img" aria-label={`${project.title} illustrative interface preview`}>
                    <div className="fine-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
                    <div className={`pointer-events-none absolute -right-12 -top-12 size-72 rounded-full blur-[100px] ${accent.glow}`} aria-hidden="true" />
                    <div aria-hidden="true" className="relative flex h-full min-h-[280px] flex-col rounded-2xl border border-white/10 bg-[#1d1b29]/95 p-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.035] sm:p-6">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex gap-1.5"><span className="size-2 rounded-full bg-white/20" /><span className="size-2 rounded-full bg-white/20" /><span className="size-2 rounded-full bg-white/20" /></div>
                        <Icon className={`size-5 ${accent.text}`} />
                      </div>
                      <div className="grid flex-1 grid-cols-[0.37fr_1fr] gap-4 pt-5">
                        <div className="space-y-3 border-r border-white/10 pr-3">
                          {project.modules.map((module, moduleIndex) => (
                            <div key={module} className={`rounded-lg px-2.5 py-2 text-[10px] font-semibold ${moduleIndex === 0 ? "bg-white/10 text-white" : "text-zinc-500"}`}>{module}</div>
                          ))}
                        </div>
                        <div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="h-14 rounded-xl border border-white/8 bg-white/[0.035] p-3"><div className={`h-1.5 w-10 rounded-full ${accent.dot}`} /></div>
                            <div className="h-14 rounded-xl border border-white/8 bg-white/[0.035] p-3"><div className="h-1.5 w-7 rounded-full bg-white/20" /></div>
                          </div>
                          <div className="mt-3 flex h-28 items-end gap-2 rounded-xl border border-white/8 bg-white/[0.035] px-4 pb-4">
                            {[42, 72, 55, 88, 68, 96, 78].map((height, barIndex) => (
                              <span key={barIndex} className={`flex-1 rounded-sm ${barIndex === 5 ? accent.dot : "bg-white/10"}`} style={{ height: `${height}%` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        <span>Interface study</span><ArrowUpRight className="size-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
