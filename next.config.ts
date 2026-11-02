import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild && {
    output: "export" as const,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    // Export /lab as lab/index.html (not lab.html beside a lab/ folder), which GitHub Pages serves reliably.
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
