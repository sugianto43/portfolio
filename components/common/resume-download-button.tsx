import { Download } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";

interface ResumeDownloadButtonProps extends Omit<ButtonProps, "asChild"> {
  label?: string;
}

export function ResumeDownloadButton({
  label = "Download Resume",
  variant = "accent",
  ...props
}: ResumeDownloadButtonProps) {
  return (
    <Button variant={variant} asChild {...props}>
      <a href={siteConfig.resumeUrl} download>
        <Download className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}
