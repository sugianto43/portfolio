import { Github, Linkedin, Mail } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { socials } from "@/lib/data";

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail };

const linkVariants = cva(
  "flex items-center justify-center rounded-full text-muted-foreground transition-colors",
  {
    variants: {
      variant: {
        bordered:
          "h-10 w-10 border border-border hover:border-accent hover:text-accent",
        ghost: "h-9 w-9 hover:bg-muted hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "bordered",
    },
  }
);

interface SocialLinksProps extends VariantProps<typeof linkVariants> {
  className?: string;
}

export function SocialLinks({ className, variant }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socials.map((s) => {
        const Icon = iconMap[s.icon];
        return (
          <a
            key={s.label}
            href={s.href}
            target={s.icon !== "mail" ? "_blank" : undefined}
            rel={s.icon !== "mail" ? "noreferrer" : undefined}
            aria-label={s.label}
            className={linkVariants({ variant })}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
