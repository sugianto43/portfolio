// Single source of truth for the security headers, shared by next.config.mjs
// (Node/Vercel headers()) and scripts/generate-htaccess.mjs (Apache equivalent
// for static hosts). Edit here — public/.htaccess is generated, not hand-written.

export const cacheableAssetExtensions = [
  "png",
  "jpg",
  "jpeg",
  "svg",
  "webp",
  "avif",
  "woff2",
  "woff",
];

export function buildCsp(isDev) {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com${isDev ? " ws://localhost:* ws://127.0.0.1:*" : ""}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

export function buildSecurityHeaders(isDev) {
  return [
    { key: "Content-Security-Policy", value: buildCsp(isDev) },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    { key: "X-XSS-Protection", value: "1; mode=block" },
  ];
}
