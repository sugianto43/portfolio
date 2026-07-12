import { GraduationCap, BadgeCheck, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { about } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container">
        <FadeIn>
          <SectionHeading
            eyebrow="~/about"
            title="A frontend engineer who likes production problems"
            description={about.summary}
          />
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          <FadeIn delay={0.05} className="md:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                career highlights
              </div>
              <ul className="grid gap-3 sm:grid-cols-3">
                {about.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs text-accent">
                <GraduationCap className="h-3.5 w-3.5" />
                education
              </div>
              <p className="text-sm font-medium text-foreground">
                {about.education.degree}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {about.education.note}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="md:col-span-2">
            <div className="h-full rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs text-accent">
                <BadgeCheck className="h-3.5 w-3.5" />
                certifications
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {about.certifications.map((c) => (
                  <li
                    key={c}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
