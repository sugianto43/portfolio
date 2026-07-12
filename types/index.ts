export interface ExperienceProject {
  name: string;
}

export interface Experience {
  company: string;
  companyNote?: string;
  role: string;
  period: string;
  current?: boolean;
  highlights: string[];
  projects: string[];
  client?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}
