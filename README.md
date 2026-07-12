# Sugianto — Portfolio

A production-ready personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion, deployed on Vercel with a GitHub Actions CI/CD pipeline.

For the architecture rationale (why things are organized this way — component rules, theming, SEO, performance, accessibility, coding standards), see [ARCHITECTURE.md](./ARCHITECTURE.md). For the pre-launch checklist, see [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md).

## Stack

Next.js 15 (App Router, React 19) · TypeScript (strict) · Tailwind CSS · Framer Motion · next-themes · Vitest + React Testing Library · Vercel (hosting, Analytics, Speed Insights) · GitHub Actions

## Installation

Requires Node 20+ and [pnpm](https://pnpm.io/) (`corepack enable` will pick up the version pinned in `package.json`).

```bash
git clone <your-repo-url>
cd portfolio
pnpm install
```

Copy the env template and fill in what applies (everything in it has a working default, so this is optional for local dev):

```bash
cp .env.example .env.local
```

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Edits under `app/` and `components/` hot-reload; content lives in one place, `lib/data.ts` (name, roles, experience, skills, socials) — edit that file rather than the components.

## Build

```bash
pnpm build   # production build (also runs during CI and on Vercel)
pnpm start   # serve the production build locally, at :3000
```

## Scripts

| Script              | What it does                                  |
| ------------------- | ---------------------------------------------- |
| `pnpm dev`          | Start the Next.js dev server                   |
| `pnpm build`        | Production build                               |
| `pnpm start`        | Serve the production build                     |
| `pnpm lint`         | ESLint (`next lint`)                           |
| `pnpm typecheck`    | `tsc --noEmit`                                 |
| `pnpm test`         | Run the Vitest suite once (CI mode)            |
| `pnpm test:watch`   | Run Vitest in watch mode                       |

## Deployment

This repo deploys to Vercel two ways, both wired to the same GitHub Actions pipeline (`.github/workflows/ci.yml`): every push/PR runs install → typecheck → lint → test → build, and only on success does it deploy — a preview for pull requests, production for pushes to `main`.

### One-time setup

1. **Push this repo to GitHub** (this project was prepared but not pushed — do this from your machine):
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```
2. **Create the Vercel project and link it locally** (needed once, to get your org/project IDs):
   ```bash
   npm i -g vercel
   vercel login
   vercel link
   ```
   This writes `.vercel/project.json` (gitignored) containing `orgId` and `projectId`.
3. **Add three GitHub Actions secrets** (repo → Settings → Secrets and variables → Actions):
   - `VERCEL_TOKEN` — from [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` — `orgId` from `.vercel/project.json`
   - `VERCEL_PROJECT_ID` — `projectId` from `.vercel/project.json`
4. **Set environment variables in Vercel** (Project Settings → Environment Variables) — see `.env.example` for what to set (`NEXT_PUBLIC_SITE_URL` at minimum, once you have a real domain).

From here, every PR gets a preview deployment and every merge to `main` deploys to production — no manual `vercel deploy` needed.

### Before your first production deploy

- Drop your resume PDF at `public/resume.pdf` (download buttons already point at `/resume.pdf`).
- Set `NEXT_PUBLIC_SITE_URL` to your real domain (used by metadata, canonical URLs, the sitemap, robots.txt, and the OG image).
- Update `siteConfig` in `lib/data.ts` with your real GitHub/LinkedIn/email.
- Run through [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md).

## Folder Structure

```
app/
  layout.tsx            # fonts, ThemeProvider, Navbar/Footer, skip-link, JSON-LD, Analytics
  page.tsx               # composes sections (below-the-fold ones are dynamic imports)
  globals.css             # design tokens (CSS variables) + base styles
  error.tsx / global-error.tsx / not-found.tsx / loading.tsx
  sitemap.ts / robots.ts / manifest.ts / icon.tsx / opengraph-image.tsx

components/
  ui/          # generic primitives (Button, SectionHeading, ThemeToggle, BackToTop)
  layout/      # Navbar, MobileNav, Footer
  sections/    # Hero, About, Experience, Skills, Contact
  common/      # cross-cutting components (SocialLinks, ResumeDownloadButton, ThemeProvider)
  motion/      # FadeIn — shared scroll-reveal wrapper

lib/
  data.ts      # all site content (single source of truth)
  utils.ts     # cn() class-merging helper

types/
  index.ts     # shared content types

.github/workflows/ci.yml   # install -> typecheck -> lint -> test -> build -> deploy
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the reasoning behind this layout.

## Troubleshooting

**`pnpm dev` shows 404s for `_next/static/*` chunks in the browser.**
Usually means a stale `.next/` cache from mixing `pnpm build` and `pnpm dev` in the same folder at the same time (they use incompatible internal formats). Stop all running dev/build processes, delete `.next/`, and restart `pnpm dev`.

**Port 3000 already in use.**
Next will automatically fall back to 3001+ and print the actual URL — check the terminal output. To force 3000, stop whatever else is listening on it first (`lsof -i :3000`).

**GitHub Actions `deploy-preview`/`deploy-production` job fails with a Vercel auth error.**
The three secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) aren't set, or the token expired. Re-run the one-time setup steps above.

**CSP blocks something in the browser console.**
Check `next.config.mjs`'s `headers()` — the CSP intentionally allows `'unsafe-inline'` for scripts/styles (required by Next's RSC streaming and Framer Motion's inline style animations) but is otherwise locked to `'self'` plus the specific Vercel Analytics/Speed Insights domains. If you add a new third-party script or embed, you'll need to extend the relevant `-src` directive.

**Tests fail with a module resolution error for `@/...` imports.**
Confirm `vitest.config.ts`'s `resolve.alias` still points `@` at the repo root — it mirrors the `@/*` path in `tsconfig.json`.

**`pnpm install` fails on a fresh clone.**
Confirm your Node version is 20+ (`node -v`) and that pnpm is available (`corepack enable`, then retry).
