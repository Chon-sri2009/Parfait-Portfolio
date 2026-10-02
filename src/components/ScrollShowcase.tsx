import { Activity, ArrowUpRight, BarChart3, Check, Layers3 } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const bars = [43, 59, 51, 73, 64, 86, 72, 94, 78, 88, 82, 100];

export default function ScrollShowcase() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-300">A closer look</p>
          <h3 className="font-display mt-4 text-balance text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Clarity from complexity.
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-400">
            An illustrative workspace for bringing operations, people, and decisions into one clear view.
          </p>
        </div>
      }
    >
      <div
        role="img"
        aria-label="Illustrative business operations dashboard interface concept"
        className="flex h-full flex-col overflow-hidden bg-[#0d1522] text-white"
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:h-16 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid size-7 place-items-center rounded-lg bg-indigo-500 text-[9px] font-black tracking-tight sm:size-9 sm:text-xs">NC</span>
            <div>
              <p className="font-display text-xs font-bold sm:text-sm">Nexus Core</p>
              <p className="hidden text-[10px] text-slate-500 sm:block">Operations workspace</p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-300 sm:px-3 sm:text-[10px]">
            Interface concept
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          <aside aria-hidden="true" className="hidden w-48 shrink-0 border-r border-white/10 p-5 md:block lg:w-56">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
            <div className="space-y-2 text-xs font-medium">
              <div className="flex items-center gap-3 rounded-lg bg-indigo-500/15 px-3 py-2.5 text-indigo-200"><Layers3 className="size-4" /> Overview</div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500"><Activity className="size-4" /> Operations</div>
              <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500"><BarChart3 className="size-4" /> Reports</div>
            </div>
            <div className="mt-14 rounded-xl border border-indigo-400/15 bg-indigo-400/5 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Built for teams</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">The right information, right where work happens.</p>
            </div>
          </aside>

          <div aria-hidden="true" className="min-w-0 flex-1 overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-300">Overview</p>
                <p className="font-display mt-1 text-lg font-semibold sm:text-2xl">Good morning, team.</p>
              </div>
              <span className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-slate-400 sm:inline-flex">
                <span className="size-1.5 rounded-full bg-emerald-400" /> Systems on track
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-4">
              {[
                { label: "Active workflows", value: "08", detail: "+2 this month" },
                { label: "Open requests", value: "24", detail: "Across 4 teams" },
                { label: "On-time delivery", value: "92%", detail: "Current cycle" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:rounded-2xl sm:p-5">
                  <p className="truncate text-[9px] font-medium text-slate-400 sm:text-xs">{item.label}</p>
                  <p className="font-display mt-2 text-xl font-semibold sm:mt-4 sm:text-3xl">{item.value}</p>
                  <p className="mt-1 hidden text-[10px] text-emerald-300 sm:block">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid min-h-0 grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-[1.35fr_0.65fr] sm:gap-4">
              <div className="min-h-0 rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:rounded-2xl sm:p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold sm:text-sm">Workflow activity</p>
                  <ArrowUpRight className="size-4 text-indigo-300" />
                </div>
                <div className="mt-5 flex h-20 items-end gap-1.5 sm:mt-7 sm:h-32 sm:gap-2">
                  {bars.map((height, index) => (
                    <span
                      key={index}
                      className={`min-w-0 flex-1 rounded-t-sm ${index === 7 || index === 11 ? "bg-indigo-400" : "bg-indigo-400/25"}`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:block">
                <p className="text-sm font-semibold">Priorities</p>
                <div className="mt-6 space-y-4 text-xs text-slate-400">
                  <p className="flex items-center gap-2"><Check className="size-4 text-emerald-400" /> Review requests</p>
                  <p className="flex items-center gap-2"><Check className="size-4 text-emerald-400" /> Update schedules</p>
                  <p className="flex items-center gap-2"><span className="size-4 rounded-full border border-amber-400/70" /> Finalize report</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerScroll>
  );
}
