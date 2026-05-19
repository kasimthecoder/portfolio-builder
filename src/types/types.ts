export interface Section {
  id: string;
  type: "hero" | "projects";
  props: Record<string, any>;
}

export interface SectionsState {
  sections: Section[];
}
