import { siteConfig } from "@/lib/data";
import { BackToTop } from "@/components/ui/back-to-top";
import { SocialLinks } from "@/components/common/social-links";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js
          &amp; Tailwind CSS.
        </p>
        <SocialLinks variant="ghost" className="gap-1" />
      </div>
      <BackToTop />
    </footer>
  );
}
