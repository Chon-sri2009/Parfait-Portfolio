import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-clip">
      <Hero />
      <Awards />
      <Projects />
      <Contact />
      <SiteFooter topHref="#home" />
    </main>
  );
}
