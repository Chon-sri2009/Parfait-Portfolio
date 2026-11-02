import SiteFooter from "@/components/SiteFooter";

export default function LabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-clip">
      <div className="px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40 lg:px-12">
        <div className="mx-auto max-w-[1440px]">{children}</div>
      </div>
      <SiteFooter topHref="#main-content" />
    </main>
  );
}
