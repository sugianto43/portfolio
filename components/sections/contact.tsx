import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center sm:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-dot-pattern [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,black,transparent)]"
            />
            <div className="relative">
              <div className="mb-4 font-mono text-xs text-accent">
                ~/contact
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Let&apos;s work together
              </h2>
              <p className="mx-auto mt-4 max-w-md text-balance leading-relaxed text-muted-foreground">
                Open to new roles and freelance projects. The fastest way to
                reach me is email.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button variant="accent" asChild>
                  <a href={`mailto:${siteConfig.email}`}>
                    <Mail className="h-4 w-4" />
                    {siteConfig.email}
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={siteConfig.github} target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-10 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
              >
                say hello
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
