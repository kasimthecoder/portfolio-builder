export interface Section {
  id: string;
  type: "hero" | "projects" | "skills-experience" | "contact";
  props: Record<string, any>;
}

export interface SectionsState {
  sections: Section[];
}
