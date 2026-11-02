import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLabTool, labTools } from "@/components/lab/registry";

// Static export can only serve the tools known at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return labTools.map((tool) => ({ tool: tool.slug }));
}

export async function generateMetadata({ params }: PageProps<"/lab/[tool]">): Promise<Metadata> {
  const tool = getLabTool((await params).tool);
  return tool ? { title: `${tool.title} · Lab | Mr. Chonlapol Srichayech`, description: tool.summary } : {};
}

export default async function LabToolPage({ params }: PageProps<"/lab/[tool]">) {
  const tool = getLabTool((await params).tool);
  if (!tool) notFound();
  const { Component } = tool;

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol role="list" className="flex items-center gap-2 text-sm font-semibold text-muted">
          <li>
            <Link href="/lab" className="inline-flex min-h-6 items-center hover:text-violet-700 dark:hover:text-lime-300">
              Lab
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {tool.title}
          </li>
        </ol>
      </nav>

      {/* minmax(0, …) stops the scrollable tool list from stretching the column on phones. */}
      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <nav aria-label="Lab tools" className="lg:sticky lg:top-28 lg:self-start">
          <ul role="list" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {labTools.map((item) => {
              const Icon = item.icon;
              const current = item.slug === tool.slug;
              return (
                <li key={item.slug} className="shrink-0">
                  <Link
                    href={`/lab/${item.slug}`}
                    aria-current={current ? "page" : undefined}
                    className={`flex min-h-11 items-center gap-3 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors lg:rounded-2xl ${current ? "bg-ink text-white dark:bg-lime-300 dark:text-ink" : "border border-line text-muted hover:text-foreground lg:border-transparent"}`}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <article aria-labelledby="tool-title" className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-700 dark:text-lime-300">{tool.category}</p>
          <h1 id="tool-title" className="font-display mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.055em]">
            {tool.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{tool.summary}</p>
          <div className="mt-10">
            <Component />
          </div>
        </article>
      </div>
    </>
  );
}
