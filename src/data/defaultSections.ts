// src/data/defaultSections.ts
import { HeroSection } from "@/types/hero.types";
import { ProjectsSection } from "@/types/projects.types";
import { HeroProps } from "@/types/hero.types";
import {
  SkillsExperienceProps,
  SkillsExperienceSection,
} from "@/types/skills.types";

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

export const defaultSkillsExperienceSection: SkillsExperienceSection = {
  id: crypto.randomUUID(),
  type: "skills-experience",
  props: {
    title: "Skills & Experience",
    subtitle: "Technical expertise and professional journey",
    variant: "default",

    skills: [
      {
        name: "React",
        category: "Frontend",
        level: "Expert",
        featured: true,
      },
      {
        name: "TypeScript",
        category: "Languages",
        level: "Expert",
        featured: true,
      },
      {
        name: "Next.js",
        category: "Frontend",
        level: "Advanced",
        featured: true,
      },
      {
        name: "Node.js",
        category: "Backend",
        level: "Advanced",
        featured: false,
      },
      {
        name: "PostgreSQL",
        category: "Database",
        level: "Advanced",
        featured: false,
      },
      {
        name: "Python",
        category: "Languages",
        level: "Intermediate",
        featured: false,
      },
      {
        name: "Tailwind CSS",
        category: "Frontend",
        level: "Advanced",
        featured: false,
      },
      {
        name: "GraphQL",
        category: "Backend",
        level: "Intermediate",
        featured: false,
      },
      {
        name: "Docker",
        category: "DevOps",
        level: "Intermediate",
        featured: false,
      },
      {
        name: "AWS",
        category: "DevOps",
        level: "Intermediate",
        featured: false,
      },
      {
        name: "MongoDB",
        category: "Database",
        level: "Intermediate",
        featured: false,
      },
      {
        name: "Figma",
        category: "Design",
        level: "Beginner",
        featured: false,
      },
    ],

    experience: [
      {
        id: crypto.randomUUID(),
        role: "Senior Frontend Developer",
        company: "TechCorp Solutions",
        companyUrl: "https://techcorp.example.com",
        location: "San Francisco, CA",
        type: "Full-time",
        startDate: "2022-01",
        current: true,
        description:
          "Leading frontend development for enterprise React applications. Implementing component libraries, optimizing performance, and mentoring junior developers.",
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      },
      {
        id: crypto.randomUUID(),
        role: "Full Stack Developer",
        company: "InnovateLabs",
        companyUrl: "https://innovatelabs.example.com",
        location: "Austin, TX",
        type: "Full-time",
        startDate: "2019-06",
        endDate: "2021-12",
        description:
          "Developed and maintained full-stack applications using Node.js and React. Collaborated with design team to implement responsive UIs and RESTful APIs.",
        skills: ["Node.js", "React", "PostgreSQL", "MongoDB", "Express.js"],
      },
      {
        id: crypto.randomUUID(),
        role: "Frontend Developer",
        company: "CreativeAgency",
        location: "Los Angeles, CA",
        type: "Contract",
        startDate: "2018-03",
        endDate: "2019-05",
        description:
          "Built responsive landing pages and web applications for various clients. Implemented pixel-perfect designs and cross-browser compatibility.",
        skills: ["React", "TypeScript", "Figma", "Tailwind CSS"],
      },
      {
        id: crypto.randomUUID(),
        role: "Junior Web Developer",
        company: "StartupHub",
        location: "Remote",
        type: "Full-time",
        startDate: "2016-09",
        endDate: "2018-02",
        description:
          "Assisted in developing and maintaining company websites. Fixed bugs, implemented features, and participated in code reviews.",
        skills: ["JavaScript", "HTML/CSS", "React"],
      },
    ],
  },
};

export const compactSkillsExperienceSection: SkillsExperienceSection = {
  id: crypto.randomUUID(),
  type: "skills-experience",
  props: {
    title: "Core Skills & Recent Experience",
    subtitle: "Latest technical expertise",
    variant: "compact",

    skills: [
      {
        name: "React",
        category: "Frontend",
        level: "Expert",
        featured: true,
      },
      {
        name: "TypeScript",
        category: "Languages",
        level: "Expert",
        featured: true,
      },
      {
        name: "Node.js",
        category: "Backend",
        level: "Advanced",
        featured: true,
      },
      {
        name: "Next.js",
        category: "Frontend",
        level: "Advanced",
        featured: false,
      },
      {
        name: "PostgreSQL",
        category: "Database",
        level: "Advanced",
        featured: false,
      },
    ],

    experience: [
      {
        id: crypto.randomUUID(),
        role: "Senior Frontend Developer",
        company: "TechCorp Solutions",
        type: "Full-time",
        startDate: "2022-01",
        current: true,
        description:
          "Leading React and TypeScript development for enterprise applications",
        skills: ["React", "TypeScript", "Next.js"],
      },
      {
        id: crypto.randomUUID(),
        role: "Full Stack Developer",
        company: "InnovateLabs",
        type: "Full-time",
        startDate: "2019-06",
        endDate: "2021-12",
        description: "Full-stack development with Node.js and React",
        skills: ["Node.js", "React", "PostgreSQL"],
      },
    ],
  },
};

import { ContactSection } from "@/types/contact.types";

export const contactSectionSampleData: ContactSection = {
  id: crypto.randomUUID(),
  type: "contact",
  props: {
    theme: "editorial",
    badgeVisible: true,
    badgeText: "Available for work",

    // ── Content ──────────────────────────────────────────────────────────────
    heading: "Let's talk",
    subtitle:
      "Have a project in mind, a question, or just want to say hello? Drop me a note and I'll get back to you within 24 hours.",

    showScrollIndicator: true,

    // ── Colors ───────────────────────────────────────────────────────────────
    colors: {
      heading: "", // falls back to CSS foreground token
      subtitle: "", // falls back to muted-foreground token
      badge: "",
    },

    // ── Form ─────────────────────────────────────────────────────────────────
    form: {
      nameField: {
        visible: true,
        label: "Name",
        placeholder: "Your name",
        required: true,
      },
      emailField: {
        visible: true,
        label: "Email",
        placeholder: "you@example.com",
        required: true,
      },
      subjectField: {
        visible: false,
        label: "Subject",
        placeholder: "What's this about?",
        required: false,
      },
      messageField: {
        visible: true,
        label: "Message",
        placeholder: "Tell me what's on your mind…",
        required: true,
      },
      submitButton: {
        text: "Send message",
        variant: "default",
      },
      alternateButton: {
        visible: true,
        text: "Email directly instead",
        href: "mailto:hello@example.com",
        variant: "outline",
      },
    },

    // ── Social links ──────────────────────────────────────────────────────────
    socialRowVisible: true,
    socialRowLabel: "Or find me on",
    socialLinks: [
      {
        platform: "github",
        label: "GitHub",
        href: "https://github.com/yourusername",
        visible: true,
      },
      {
        platform: "twitter",
        label: "Twitter / X",
        href: "https://twitter.com/yourusername",
        visible: true,
      },
      {
        platform: "linkedin",
        label: "LinkedIn",
        href: "https://linkedin.com/in/yourusername",
        visible: true,
      },
      {
        platform: "dribbble",
        label: "Dribbble",
        href: "https://dribbble.com/yourusername",
        visible: false, // hidden by default, user can toggle on
      },
    ],
  },
};
