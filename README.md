# Chonlapol Srichayech — Portfolio

A personal portfolio for Mr.Chonlapol Srichayech, focused on IT Software Solutions for Business and his third-place result at the 2026 WorldSkills Thailand Regional Competition.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` builds a static version of the site and deploys it whenever `main` changes. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**. The workflow uses the repository name as the base path, so images and JavaScript load correctly from the GitHub Pages project URL.

To check the production build locally, set `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/Parfait-Portfolio` before running `npm run build`. The static site is written to `out/`.
