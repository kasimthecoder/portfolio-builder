export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Languages"
  | "Database"
  | "DevOps"
  | "Design"
  | "Other";

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance"
  | "Internship";

export type ExperienceVariant = "default" | "compact";

export interface Skill {
  name: string;
  category: SkillCategory | string;
  level: SkillLevel;
  featured?: boolean;
}

export interface Experience {
  id?: string | number;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  type?: EmploymentType;
  /** Format: "YYYY-MM" */
  startDate: string;
  /** Format: "YYYY-MM" — omit or leave empty if current */
  endDate?: string;
  current?: boolean;
  description?: string;
  skills?: string[];
}

export interface SkillsExperienceProps {
  title?: string;
  subtitle?: string;
  skills?: Skill[];
  experience?: Experience[];
  variant?: ExperienceVariant;
}

export interface SkillsExperienceSection {
  id: string;
  type: "skills-experience";
  props: SkillsExperienceProps;
}
