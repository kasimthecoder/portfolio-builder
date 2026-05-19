export interface ProjectsProps {
  title: string;
  subtitle?: string;
  variant: "default" | "modern" | "compact";
  projects: ProjectCard[];
  columns?: 2 | 3 | 4;
}

export interface ProjectCard {
  id?: string;
  image?: string;
  title: string;
  description: string;
  link: string;
  githubLink?: string | null;
  demoLink?: string;
  technologies?: string[];
  status: "in-progress" | "completed" | "pending";
}

export interface ProjectsSection {
  id: string;
  type: "projects";
  props: ProjectsProps;
}
