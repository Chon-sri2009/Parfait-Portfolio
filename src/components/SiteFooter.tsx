import Link from "next/link";

export default function SiteFooter({ topHref }: { topHref: string }) {
  return (
    <footer className="px-5 pb-10 pt-7 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 border-t border-line pt-7 text-xs font-semibold text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mr.&nbsp;Chonlapol Srichayech. Made with intention.</p>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/lab" className="inline-flex min-h-6 items-center transition hover:text-violet-700 dark:hover:text-lime-300">
            Lab
          </Link>
          <span>IT Software Solutions for Business</span>
          <a href={topHref} className="inline-flex min-h-6 items-center transition hover:text-violet-700 dark:hover:text-lime-300">Back to top <span aria-hidden="true">&nbsp;↑</span></a>
        </div>
      </div>
    </footer>
  );
}
