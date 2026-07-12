import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.title}`,
    short_name: siteConfig.name,
    description: siteConfig.subtitle,
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c0e",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
