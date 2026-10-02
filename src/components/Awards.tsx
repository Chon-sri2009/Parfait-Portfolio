import Image from "next/image";
import { ArrowUpRight, Medal, Sparkles } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { achievement, profile } from "@/lib/data";

export default function Awards() {
  return (
    <section id="award" tabIndex={-1} aria-labelledby="award-title" className="relative overflow-hidden bg-[#1a1420] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12">
      <div className="fine-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-20 size-[500px] rounded-full bg-violet-600/20 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-[480px] rounded-full bg-amber-500/12 blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-lime-300">02 / The story</p>
            <h2 id="award-title" className="font-display mt-5 max-w-3xl text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.98] tracking-[-0.06em]">
              More than a <span className="text-lime-300">medal.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-zinc-300 lg:justify-self-end">
            I&apos;m {profile.name}, a developer who enjoys solving the problem behind the brief. Placing third at the 2026 WorldSkills Thailand Regional Competition made that approach even more meaningful.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-7">
          <Reveal>
            <GlowCard glowColor="purple" customSize className="h-full min-h-[570px] w-full !p-2 sm:!p-3">
              <figure className="relative row-span-2 min-h-[550px] overflow-hidden rounded-xl bg-[#312139]">
                <Image
                  src={profile.portraitSrc}
                  alt="Chonlapol Srichayech smiling and holding his WorldSkills Thailand medal"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-[center_58%]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#100c16] via-[#100c16]/65 to-transparent" aria-hidden="true" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-9">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-lime-300">The person behind the work</p>
                    <p className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{profile.name}</p>
                    <p className="mt-1 text-sm text-zinc-300">{profile.role}</p>
                  </div>
                  <Sparkles className="hidden size-7 text-lime-300 sm:block" aria-hidden="true" />
                </figcaption>
              </figure>
            </GlowCard>
          </Reveal>

          <Reveal delay={0.12}>
            <GlowCard glowColor="orange" customSize className="h-full min-h-[570px] w-full !p-2 sm:!p-3">
              <div className="relative row-span-2 flex min-h-[550px] flex-col overflow-hidden rounded-xl border border-amber-200/10 bg-[#251c20] p-7 sm:p-10">
                <div className="fine-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="pointer-events-none absolute -right-20 top-20 size-72 rounded-full bg-amber-500/15 blur-[90px]" aria-hidden="true" />
                <div className="relative flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-200">
                    <Medal className="size-4" aria-hidden="true" /> WorldSkills Thailand
                  </span>
                  <span className="font-display text-sm font-bold text-amber-200">2026</span>
                </div>

                <div className="relative my-auto py-12">
                  <p className="font-display text-[clamp(7rem,18vw,13rem)] font-black leading-[0.8] tracking-[-0.13em] text-amber-300" aria-hidden="true">
                    03<span className="ml-2 align-top text-[0.16em] tracking-normal">rd</span>
                  </p>
                  <h3 className="font-display mt-8 text-3xl font-bold tracking-tight sm:text-4xl">Third place, regional.</h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-zinc-300">{achievement.description}</p>
                </div>

                <div className="relative border-t border-white/15 pt-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">Competition category</p>
                  <p className="font-display mt-2 max-w-md text-xl font-semibold leading-snug">{achievement.category}</p>
                  <ArrowUpRight className="absolute bottom-0 right-0 size-6 text-amber-200" aria-hidden="true" />
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
