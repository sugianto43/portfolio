import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="container">
        <FadeIn>
          <SectionHeading
            eyebrow="~/skills"
            title="Tools I reach for"
            description="A toolkit built for shipping enterprise UI: fast to build with, predictable at scale."
          />
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <FadeIn key={group.category} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-wide text-accent">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-muted px-3 py-1.5 text-sm text-foreground/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
