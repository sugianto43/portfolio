import { buildSecurityHeaders, cacheableAssetExtensions } from "./lib/security-headers.mjs";

/** @type {import('next').NextConfig} */

// Next's App Router streams RSC payloads via inline `<script>self.__next_f.push(...)</script>`
// tags, so script-src needs 'unsafe-inline' or hydration breaks. Framer Motion animates via
// inline `style` attributes, so style-src needs it too. Tightening either requires a
// nonce-based CSP wired through middleware — not worth the complexity for a static portfolio
// with no user-generated content.
//
// 'unsafe-eval' is dev-only: Next's dev-mode webpack bundle wraps modules in eval() for Fast
// Refresh / sourcemaps. Production output never calls eval(), so it's omitted from the CSP
// that actually ships.
const isDev = process.env.NODE_ENV === "development";
// STATIC_EXPORT=true next build produces a plain out/ folder for static hosts
// (e.g. Hostinger shared hosting) that can't run a Node server. Those hosts can't
// apply the headers() below either — public/.htaccess carries the Apache equivalent,
// generated from lib/security-headers.mjs by `pnpm run build:static` (see
// scripts/generate-htaccess.mjs) so the two never drift out of sync.
const isStaticExport = process.env.STATIC_EXPORT === "true";
const securityHeaders = buildSecurityHeaders(isDev);
const cacheableAssetExtensionPattern = cacheableAssetExtensions.join("|");

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  ...(isStaticExport
    ? { output: "export", trailingSlash: true }
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: securityHeaders,
            },
            {
              source: "/_next/static/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
            {
              source: `/:path*.:ext(${cacheableAssetExtensionPattern})`,
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
