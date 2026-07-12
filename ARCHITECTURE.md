# Architecture

Technical reference for how this portfolio is structured and why. Read this before adding a component, page, or dependency.

## Stack

Next.js (App Router) · React · TypeScript (strict) · Tailwind CSS · Framer Motion · Lucide React · next-themes · pnpm · Vitest + React Testing Library · Vercel (hosting, Analytics, Speed Insights) · GitHub Actions

## Folder Structure

```
app/
  layout.tsx            # fonts, ThemeProvider, Navbar/Footer, skip-link, JSON-LD, Analytics/SpeedInsights
  page.tsx               # composes sections; below-the-fold ones are dynamic imports
  globals.css            # CSS variables (theme tokens), base styles, reduced-motion query
  error.tsx              # route-level error boundary (client component)
  global-error.tsx       # root-layout-level fallback (own <html>/<body>, inline styles)
  not-found.tsx           # styled 404
  loading.tsx             # route-level loading state
  sitemap.ts             # MetadataRoute.Sitemap
  robots.ts              # MetadataRoute.Robots
  manifest.ts             # MetadataRoute.Manifest
  icon.tsx                # generated favicon (next/og)
  opengraph-image.tsx    # generated OG image (next/og)

components/
  ui/         # generic, content-agnostic primitives — no imports from lib/data
  layout/     # structural chrome, one instance per app (Navbar, MobileNav, Footer)
  sections/   # page content, composed only from app/page.tsx (Hero, About, ...)
  common/     # cross-cutting components reused by 2+ of the above, or non-visual providers
  motion/     # animation primitives (currently just FadeIn)

lib/
  data.ts     # all site content: siteConfig, socials, navLinks, about, experiences, skillGroups
  utils.ts    # cn() — clsx + tailwind-merge

types/
  index.ts    # shared content shape types (Experience, SkillGroup, SocialLink)

.github/workflows/ci.yml   # install -> typecheck -> lint -> test -> build -> deploy
vitest.config.ts / vitest.setup.ts
```

## Component Rules

- **Single responsibility per file.** A section renders one part of the page; a `ui/` component renders one control.
- **Typed props via `interface`**, not inline object types, so they're easy to extend and read in isolation.
- **Reusable API over one-off markup.** If the same JSX shape shows up in two files, it belongs in `common/`, not copy-pasted. (`SocialLinks`, `ResumeDownloadButton` exist because the alternative was three-plus divergent copies of the same markup.)
- **`ui/` never imports content.** Primitives like `Button` take props; they don't know about `siteConfig` or `lib/data`. `sections/` and `common/` are where content and UI meet.
- **`"use client"` only on the leaf that needs it** — components using hooks, `framer-motion`, or browser APIs. Server Components stay the default everywhere else.

## Styling Strategy

Tailwind utility classes only — no inline `style` attributes. Class-level composition uses `cva` (see `components/ui/button.tsx`) for variant-based components, and `cn()` (`clsx` + `tailwind-merge`) for conditional/overridable class strings. Theme colors are Tailwind tokens (`bg-background`, `text-foreground`, `border-border`, `bg-accent`, ...) mapped to CSS custom properties in `globals.css`, never raw hex values in components.

## Theme Architecture

`next-themes` with the `class` strategy: `<html class="dark">` toggles a block of CSS variables in `globals.css` (`:root` for light, `.dark` for dark). `defaultTheme="system"` plus `enableSystem` gives light/dark/system out of the box, and next-themes persists the choice to `localStorage` automatically — no custom persistence code needed. `ThemeProvider` (`components/common/theme-provider.tsx`) wraps the app once in `app/layout.tsx`; `ThemeToggle` (`components/ui/theme-toggle.tsx`) reads/writes it and guards against hydration mismatch with a `mounted` flag.

## Routing Architecture

Single route (`/`) — a portfolio's content doesn't need separate pages, and anchor-linked sections (`#about`, `#experience`, ...) give instant in-page navigation instead of full page loads. "Routing architecture" here means using the App Router's file conventions for everything that isn't page content: `sitemap.ts`, `robots.ts`, and `opengraph-image.tsx` are all routes, just not ones that render visible pages. If the site ever needs a second real page (e.g. a blog), it gets its own `app/<route>/page.tsx` rather than forcing more anchor sections onto `/`.

## Asset Organization

- **Fonts**: `next/font/google` (Inter, JetBrains Mono) in `app/layout.tsx` — self-hosted at build time, `display: "swap"`, exposed as CSS variables consumed by `tailwind.config.ts`. Never load fonts via a `<link>` tag.
- **Downloadable files**: `public/` (currently just `resume.pdf`, linked via `siteConfig.resumeUrl`).
- **Images**: none yet in the content itself; if a photo/avatar is added, it goes through `next/image` for automatic AVIF/WebP + responsive sizing (already configured in `next.config.mjs`). The one generated image (`app/opengraph-image.tsx`) uses `next/og`'s `ImageResponse` instead of a static file, so it never goes stale relative to `siteConfig`.

## Animation Architecture

`components/motion/fade-in.tsx` is the one scroll-reveal primitive used across every section (`whileInView`, fires once, respects a `delay` prop for staggering list items). One-off entrance choreography (the Hero's staggered heading/subtitle/buttons) is defined locally in that section file as plain Framer Motion `variants` — it's not reused elsewhere, so it doesn't need to live in `motion/`. Anything used by 2+ components should move into `motion/`. Global reduced-motion support is handled once, in `globals.css`, via `prefers-reduced-motion`.

## State Management Strategy

No global state library, and none is needed: all content is static (`lib/data.ts`), and the only stateful UI is local (`MobileNav` open/close, `Navbar` scroll position, `BackToTop` visibility, theme via `next-themes`). Reach for a state library only if the site starts fetching/mutating dynamic data (e.g. a CMS) — not before.

## SEO Architecture

- `app/layout.tsx` exports the Next.js `Metadata` object (title, description, Open Graph, Twitter card, robots directives, canonical `alternates.url`) built from `siteConfig`, so copy only needs to change in one place.
- `app/sitemap.ts` / `app/robots.ts` / `app/manifest.ts` use the App Router's typed route conventions (`MetadataRoute.Sitemap` / `MetadataRoute.Robots` / `MetadataRoute.Manifest`) rather than static files, so they can't drift from `siteConfig.url`.
- `app/opengraph-image.tsx` and `app/icon.tsx` generate the social preview image and favicon at request time via `next/og`'s `ImageResponse`, from the same `siteConfig` — no hand-designed static assets to keep in sync.
- A `Person` JSON-LD block is injected in `app/layout.tsx` (`sameAs` linking GitHub/LinkedIn) for richer search results.
- `siteConfig.url` reads `process.env.NEXT_PUBLIC_SITE_URL` (falling back to a hardcoded default) — every one of the above derives from it, so pointing the site at a real domain is a single env var change (see `.env.example`).

## Performance Decisions

- Fonts are self-hosted with `swap` (no layout-shift-causing FOIT, no third-party font request).
- `next.config.mjs` sets `experimental.optimizePackageImports` for `lucide-react` and `framer-motion` so only the icons/functions actually imported are bundled, and `compress: true` for gzip/brotli (Vercel's edge also compresses independently, but this keeps `pnpm start` consistent with production).
- `app/page.tsx` dynamically imports `Experience`, `Skills`, and `Contact` (all below the fold) via `next/dynamic`, splitting them into separate chunks while keeping default SSR — content still renders server-side for no-JS/SEO, only client hydration JS is deferred. `Hero` and `About` stay static imports since they're above/near the fold.
- Images (if/when added) go through `next/image` for automatic format negotiation and lazy loading.
- `next.config.mjs`'s `headers()` sets `Cache-Control: public, max-age=31536000, immutable` on `/_next/static/*` and hashed asset file types — safe because Next fingerprints these filenames on every build.
- Every route is statically generated at build time (no dynamic segments, no per-request data fetching) — confirmed by `pnpm build`'s route summary showing `○ (Static)` for all of them.

## Security Headers

`next.config.mjs`'s `headers()` applies to every route: `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/microphone/geolocation off), `Strict-Transport-Security`, and `X-XSS-Protection` (a legacy header, ignored by modern browsers in favor of CSP, kept for older UA compatibility).

The CSP is intentionally not maximally strict: `script-src` and `style-src` both need `'unsafe-inline'`. Next's App Router streams RSC payloads through inline `<script>self.__next_f.push(...)</script>` tags — block that and hydration breaks. Framer Motion animates via inline `style` attributes on DOM nodes — block that and every animation silently stops working. Removing `'unsafe-inline'` requires a nonce-based CSP wired through middleware (regenerating a nonce per request and threading it into every inline script/style), which is real complexity this static, no-user-content portfolio doesn't need yet. If that changes — user-generated content, third-party embeds beyond Vercel Analytics — revisit this.

`next.config.mjs` also branches on `NODE_ENV === "development"` to add `'unsafe-eval'` to `script-src` and `ws://localhost:*`/`ws://127.0.0.1:*` to `connect-src` — found by actually running `pnpm dev` against the configured CSP, not by inspection. Next's dev-mode webpack bundle wraps modules in `eval()` for Fast Refresh, and the HMR client holds open a websocket to the dev server; both get blocked by a strict CSP and silently break local development (page loads, but hot-reload and, in the eval case, hydration itself fail) while working fine in a real `pnpm build && pnpm start`. Verify any future CSP change against `pnpm dev` in a browser, not just `pnpm build`.

## Error Handling & Loading States

Standard App Router special files, not custom-built: `app/error.tsx` (route-level boundary, `"use client"`, gets `error`/`reset` props, styled with the site's normal Tailwind tokens since the root layout is still intact when this fires), `app/global-error.tsx` (fires only if the root layout itself throws — must render its own `<html>/<body>` and can't assume Tailwind/ThemeProvider survived, hence the one deliberate exception to "no inline styles" in this codebase), `app/not-found.tsx` (regular server component, renders inside the normal layout), and `app/loading.tsx` (a small spinner shown while a route segment is fetching/rendering).

## Testing Strategy

Vitest + React Testing Library, not Jest — lighter and faster, and there's no existing Jest config to match. `vitest.config.ts` runs in `jsdom`, aliases `@` to the repo root (mirroring `tsconfig.json`), and loads `vitest.setup.ts` for `@testing-library/jest-dom` matchers. Tests are colocated with the code they cover (`lib/utils.test.ts`, `components/ui/button.test.tsx`) rather than in a parallel `__tests__` tree, so a moved/deleted component can't leave an orphaned test behind unnoticed. Coverage today is intentionally thin (the `cn()` utility and the `Button` primitive) — it exists to prove the harness works and gate CI, not as a target to backfill toward; add tests where logic actually branches (not for every component that just renders props).

## CI/CD

`.github/workflows/ci.yml`: one `checks` job runs install → typecheck → lint → test → build on every push and PR; two deploy jobs (`deploy-preview` on PRs, `deploy-production` on push to `main`) run only `needs: checks`, using the Vercel CLI (`vercel pull` / `build` / `deploy`) authenticated via three repository secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` — see README's Deployment section for how to obtain them). Nothing deploys unless the checks job is green first.

## Accessibility

- Skip-to-content link as the first focusable element in `app/layout.tsx`.
- Global `:focus-visible` ring (`globals.css`) instead of suppressing outlines.
- `MobileNav` is a real dialog: `role="dialog"` + `aria-modal="true"` + `aria-label`, focus moves to the close button on open and returns to the trigger on close, and Escape closes it — not just an outside click.
- Icon-only buttons (`ThemeToggle`, mobile menu open/close, `BackToTop`) all carry `aria-label`.
- Semantic landmarks throughout: `<header>`, `<nav>`, `<main id="main">`, `<footer>`.

## Coding Standards

- Named exports for components (no default exports outside Next.js special files like `page.tsx`/`layout.tsx`/`sitemap.ts`, which the framework requires).
- Props typed with `interface ComponentNameProps`, colocated in the same file as the component.
- Use `cn()` for any conditional or overridable className — never string-concatenate classes.
- No inline `style` props; if a value must be dynamic (e.g. computed from data), prefer a Tailwind arbitrary-value class or a CSS variable over `style`. The one exception is `app/global-error.tsx` (see Error Handling & Loading States above) — document any new exception with a comment the same way.
- Content lives in `lib/data.ts` / `types/index.ts`, never hardcoded inside a component — components render data, they don't own it. Split `lib/data.ts` into `lib/data/*.ts` only once it grows large enough that a single file is actually hard to navigate (it isn't yet, at ~160 lines).
