import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-clip">
      <Hero />
      <Awards />
      <Projects />
      <Contact />

      <footer className="px-5 pb-10 pt-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 border-t border-black/10 pt-7 text-xs font-semibold text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} Mr.Chonlapol Srichayech. Made with intention.</p>
          <div className="flex flex-wrap items-center gap-5">
            <span>IT Software Solutions for Business</span>
            <a href="#home" className="transition hover:text-violet-700 dark:hover:text-lime-300">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
