import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { experiences } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20">
      <div className="container">
        <FadeIn>
          <SectionHeading
            eyebrow="~/experience"
            title="Where I've worked"
            description="Four years, three teams, one thread running through them: enterprise applications that real people rely on every day."
          />
        </FadeIn>

        <ol className="relative border-l border-border pl-8">
          {experiences.map((exp, i) => (
            <FadeIn key={exp.company} delay={i * 0.08}>
              <li className="relative pb-14 last:pb-0">
                <span
                  className={`absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-background ${
                    exp.current ? "bg-accent" : "bg-muted-foreground"
                  }`}
                  aria-hidden="true"
                />

                <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.company}
                  </h3>
                  {exp.companyNote && (
                    <span className="text-sm text-muted-foreground">
                      {exp.companyNote}
                    </span>
                  )}
                  {exp.current && (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
                      current
                    </span>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                  <span>{exp.role}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-tabular">{exp.period}</span>
                  {exp.client && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>client: {exp.client}</span>
                    </>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {exp.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                    projects shipped
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {exp.projects.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
