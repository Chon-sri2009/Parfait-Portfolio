import { ArrowUpRight, BriefcaseBusiness, GitBranch, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export default function Contact() {
  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="px-5 pb-8 pt-20 sm:px-8 sm:pb-12 sm:pt-28 lg:px-12">
      <Reveal className="mx-auto max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[2rem] bg-lime-300 px-6 py-14 text-[#191621] sm:rounded-[3rem] sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          <div className="pointer-events-none absolute -right-16 -top-28 font-display text-[28rem] font-black leading-none text-black/[0.045]" aria-hidden="true">✳</div>
          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em]">04 / Get in touch</p>
              <h2 id="contact-title" className="font-display mt-5 max-w-3xl text-[clamp(3.2rem,6vw,6.5rem)] font-black leading-[0.95] tracking-[-0.065em]">
                Have a challenge? <span className="text-violet-700">Let&apos;s talk.</span>
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#37313c] sm:text-lg">
                I&apos;m open to internships, collaborations, and interesting software problems. Tell me what you&apos;re working on.
              </p>
              <a
                href="mailto:Chon_sri2009@hotmail.com"
                className="group font-display mt-9 inline-flex max-w-full items-center gap-2 break-all border-b-2 border-[#191621] pb-2 text-[clamp(1.2rem,3vw,2.4rem)] font-bold tracking-tight transition hover:gap-4 focus-visible:gap-4"
              >
                <Mail className="hidden size-6 shrink-0 sm:block" aria-hidden="true" />
                Chon_sri2009@hotmail.com
                <ArrowUpRight className="size-6 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <address className="not-italic lg:justify-self-end">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4f4854]">Elsewhere on the internet</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="https://github.com/Chon-sri2009/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-[#191621]/25 px-5 py-3 text-sm font-bold transition hover:-translate-y-1 hover:bg-[#191621] hover:text-white focus-visible:-translate-y-1" aria-label="GitHub profile (opens in a new tab)">
                  <GitBranch className="size-4" aria-hidden="true" /> GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a href="https://www.linkedin.com/in/chonlapol-srichayech-40a802381/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-[#191621]/25 px-5 py-3 text-sm font-bold transition hover:-translate-y-1 hover:bg-[#191621] hover:text-white focus-visible:-translate-y-1" aria-label="LinkedIn profile (opens in a new tab)">
                  <BriefcaseBusiness className="size-4" aria-hidden="true" /> LinkedIn <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </address>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
