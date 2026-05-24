// src/data/defaultSections.ts
import { HeroSection } from "@/types/hero.types";
import { ProjectsSection } from "@/types/projects.types";
import { HeroProps } from "@/types/hero.types";

export const defaultHeroSection: HeroSection = {
  id: crypto.randomUUID(),
  type: "hero",
  props: {
    title: "Building things people actually use",
    subtitle: "Frontend Developer",
    variant: "centered",
    colors: { title: "", subtitle: "", background: "" },
    buttons: {
      primary: {
        text: "Get Started",
        variant: "default",
        visibility: true,
        link: "#",
      },
      secondary: {
        text: "Learn More",
        variant: "ghost",
        visibility: true,
        link: "#",
      },
    },
  } satisfies HeroProps,
};

export const defaultProjectsSection: ProjectsSection = {
  id: crypto.randomUUID(),
  type: "projects",
  props: {
    title: "Featured projects",
    subtitle: "A selection of work that I'm most proud of",
    variant: "default",
    columns: 3,
    projects: [
      {
        id: crypto.randomUUID(),
        title: "Design System",
        description: "Scalable component library and design tokens",
        link: "#",
        githubLink: "#",
        status: "completed",
        technologies: ["React", "Storybook", "Styled Components"],
      },
      {
        id: crypto.randomUUID(),
        title: "Analytics Dashboard",
        description: "Real-time data visualization platform",
        link: "#",
        status: "in-progress",
        technologies: ["Vue", "D3.js", "Express"],
      },
      {
        id: crypto.randomUUID(),
        title: "Mobile App",
        description: "Cross-platform mobile experience",
        link: "#",
        githubLink: "#",
        status: "pending",
        technologies: ["React Native", "Firebase", "Redux"],
      },
    ],
  },
};
