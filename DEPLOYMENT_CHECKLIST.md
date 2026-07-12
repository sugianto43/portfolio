# Deployment Checklist

Run through this before every production deploy (or trust the CI gate in `.github/workflows/ci.yml` for the first five, and do the rest manually — Lighthouse/accessibility/responsive/dark-mode checks aren't automated in this repo).

## Automated (CI gate)

- [ ] **Build success** — `pnpm build` exits 0.
- [ ] **TypeScript success** — `pnpm typecheck` exits 0 with no errors.
- [ ] **Lint success** — `pnpm lint` exits 0 with no warnings/errors.
- [ ] **Tests passing** — `pnpm test` exits 0, all suites green.

These four run automatically on every push/PR via `.github/workflows/ci.yml`; a red check on the PR means don't merge.

## Manual — Performance

- [ ] **Lighthouse > 95** on Performance, Accessibility, Best Practices, and SEO. Run against a production build, not `pnpm dev`:
  ```bash
  pnpm build && pnpm start
  npx lighthouse http://localhost:3000 --view
  ```
  or use Chrome DevTools → Lighthouse on the deployed preview URL.
- [ ] Check Vercel Speed Insights after the first real production traffic lands (Project → Speed Insights tab) — confirm Core Web Vitals are in the green.

## Manual — Accessibility validation

- [ ] Keyboard-only pass: Tab through the whole page (nav, mobile nav open/close/Escape, theme toggle, all links/buttons) — every interactive element should get a visible focus ring and be reachable in a sensible order.
- [ ] Screen reader spot-check (VoiceOver/NVDA): confirm the skip link, landmarks, and icon-only button labels (`ThemeToggle`, mobile menu open/close, `BackToTop`) read sensibly.
- [ ] Run axe DevTools or the Lighthouse accessibility audit and confirm no violations.

## Manual — SEO validation

- [ ] `curl -I https://<your-domain>` — confirm response headers are present (CSP, X-Frame-Options, etc. — see `next.config.mjs`).
- [ ] `/sitemap.xml` and `/robots.txt` resolve and reference the real production domain (not the placeholder).
- [ ] `/manifest.webmanifest` resolves and the icon renders.
- [ ] Paste the production URL into the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [Twitter Card Validator](https://cards-dev.twitter.com/validator) — confirm the OG image (`app/opengraph-image.tsx`) and metadata render correctly.
- [ ] Validate the Person JSON-LD block (view source, or paste into [Google's Rich Results Test](https://search.google.com/test/rich-results)).
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` is set to the real domain in Vercel — everything above (canonical URL, sitemap, OG, manifest) derives from it.

## Manual — Responsive validation

- [ ] 375px (mobile), 768px (tablet), 1280px+ (desktop) — no horizontal scroll, mobile nav drawer opens/closes correctly, all sections readable.
- [ ] Test on an actual iOS/Android device or Chrome DevTools device emulation, not just a resized desktop window.

## Manual — Dark mode validation

- [ ] Toggle light → dark → system in the navbar; confirm all sections re-theme correctly (no hardcoded colors leaking through).
- [ ] Reload the page after toggling — theme should persist (via `next-themes`' `localStorage` persistence).
- [ ] Check OS-level dark mode (system setting) is respected on first visit before any manual toggle.

## Pre-flight content check

- [ ] `public/resume.pdf` is your real, current resume.
- [ ] `lib/data.ts` — no placeholder/lorem-ipsum content, all links (GitHub/LinkedIn/email) are correct.
- [ ] `NEXT_PUBLIC_SITE_URL` set in Vercel to your real domain.
