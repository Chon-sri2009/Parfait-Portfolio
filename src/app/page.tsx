import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero />
      <Projects />
      <Awards />
      <Contact />
      
      <footer className="py-8 text-center bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          © {new Date().getFullYear()} Enterprise Solutions. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
