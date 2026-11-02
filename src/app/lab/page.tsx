import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { labTools } from "@/components/lab/registry";

export const metadata: Metadata = {
  title: "Lab | Mr. Chonlapol Srichayech",
  description: "Working tools for everyday business and developer tasks: calculators, a task board, CSV charts and developer utilities.",
};

const principles = [
  { title: "Runs in your browser", body: "Every tool works on this page. There is no account and no server." },
  { title: "Your data stays here", body: "Nothing you type or open is uploaded. The task board saves only to this browser." },
  { title: "Built to grow", body: "Each tool is a self-contained module, so new ones join the lab as I build them." },
];

export default function LabPage() {
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-700 dark:text-lime-300">Lab / Working tools</p>
          <h1 className="font-display mt-5 max-w-3xl text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.06em]">
            Not just a portfolio. <span className="text-violet-600 dark:text-lime-300">Try the work.</span>
          </h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-muted lg:justify-self-end">
          Small, useful tools for the kind of problems I like solving: business numbers, planning, data and everyday developer chores. Pick one and use it.
        </p>
      </div>

      <ul role="list" className="mt-16 grid gap-5 md:grid-cols-2">
        {labTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <li
              key={tool.slug}
              className="group relative flex flex-col rounded-[2rem] border border-line bg-white/65 p-7 transition-colors hover:border-violet-500 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent sm:p-9 dark:bg-[#17131d] dark:hover:border-lime-300"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-violet-600/10 text-violet-700 dark:bg-lime-300/10 dark:text-lime-300">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-bold text-muted" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{tool.category}</p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                {/* The link covers the whole card; its focus ring is drawn on the card instead. */}
                <Link href={`/lab/${tool.slug}`} className="after:absolute after:inset-0 after:rounded-[2rem] focus-visible:outline-none">
                  {tool.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-muted">{tool.summary}</p>
              <ul role="list" aria-label="Includes" className="mt-6 flex flex-wrap gap-2">
                {tool.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-semibold text-slate-600 dark:border-white/15 dark:text-zinc-300">
                    {highlight}
                  </li>
                ))}
              </ul>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-violet-700 transition-[gap] group-hover:gap-3 dark:text-lime-300" aria-hidden="true">
                Open tool <ArrowUpRight className="size-4" />
              </span>
            </li>
          );
        })}
      </ul>

      <ul role="list" className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
        {principles.map((principle) => (
          <li key={principle.title}>
            <h2 className="font-display text-lg font-bold tracking-tight">{principle.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{principle.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
