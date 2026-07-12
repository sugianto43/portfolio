import type { Experience, SkillGroup, SocialLink } from "@/types";

export const siteConfig = {
  name: "Sugianto",
  title: "Frontend Engineer",
  subtitle:
    "Building modern, scalable web and mobile applications using React, Next.js, and React Native.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sugianto.dev",
  email: "antho9922@gmail.com",
  github: "https://github.com/sugianto43",
  linkedin: "https://linkedin.com/in/sugianto43",
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: siteConfig.github, icon: "github" },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: "mail" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  summary:
    "I'm a frontend engineer with over four years of experience shipping enterprise web and mobile products across finance, education, and banking. I care about the parts of a UI that are easy to overlook: state that stays correct across pages, forms that handle real-world input, and interfaces that hold up in production under actual users. Most of my work lives inside React and React Native codebases, turning operational complexity into dashboards and tools that teams rely on every day.",
  highlights: [
    "4+ years building production React, Next.js, and React Native applications",
    "Shipped 8 internal enterprise applications currently used in daily operations at BFI Finance",
    "Worked across the full stack of frontend concerns: SSR, state management, testing, and API integration",
  ],
  education: {
    degree: "Bachelor of Mathematics — State University of Makassar (2010–2015)",
    note: "Also completed the Front-End Developer Bootcamp at Glints Academy (Nov 2020–Feb 2021).",
  },
  certifications: [
    "Front-End Web Developer Bootcamp — Glints Academy",
    "Basic Programming — Dicoding Indonesia",
  ],
};

export const experiences: Experience[] = [
  {
    company: "BFI Finance",
    companyNote: "via Avows Technologies",
    role: "UI Engineer",
    period: "Aug 2022 — Present",
    current: true,
    highlights: [
      "React.js",
      "React Native",
      "Enterprise applications",
      "REST API",
      "Agile",
    ],
    projects: [
      "Sales Management System",
      "Supervisor Dashboard",
      "Customer Monitoring",
      "Branch Operations Dashboard",
      "Reporting Dashboard",
      "Sales Mobile App",
      "Surveyor Mobile App",
      "Internal Employee Mobile App",
    ],
  },
  {
    company: "PT Lingkar Indonesia Mengajar",
    role: "Frontend Developer",
    period: "Feb 2022 — Aug 2022",
    highlights: ["React.js", "REST API", "Responsive UI"],
    projects: [
      "Learning Management System",
      "Student Portal",
      "School Administration",
      "Educational Dashboard",
    ],
  },
  {
    company: "PT Infosys Solusi Terpadu",
    role: "Junior Frontend Developer",
    period: "Mar 2021 — Feb 2022",
    highlights: ["JavaScript", "REST API"],
    projects: ["Web Banking System"],
    client: "Bank Victoria",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "React Native", "Vue.js", "Nuxt.js"],
  },
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    category: "State Management",
    skills: ["Redux", "Redux Toolkit", "React Query", "Zustand", "Vuex", "Pinia"],
  },
  {
    category: "UI",
    skills: ["Tailwind CSS", "Material UI", "Ant Design", "shadcn/ui", "Vuetify"],
  },
  {
    category: "Tools",
    skills: ["Git", "Postman", "Figma", "REST API"],
  },
];
