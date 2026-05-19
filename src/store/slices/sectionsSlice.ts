import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Section, SectionsState } from "../../types/types";
import { ProjectsSection, ProjectCard } from "@/types/projects.types";

const saveSections = (sections: Section[]) => {
  localStorage.setItem("sections", JSON.stringify(sections));
};

const loadSections = (): Section[] => {
  try {
    const stored = localStorage.getItem("sections");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: SectionsState = {
  sections: loadSections(),
};

export const sectionSlice = createSlice({
  name: "section",
  initialState,

  reducers: {
    addSection(state, action: PayloadAction<Section>) {
      state.sections.push(action.payload);
      saveSections(state.sections as Section[]);
    },

    updateSection(
      state,
      action: PayloadAction<{ id: string; props: Record<string, any> }>,
    ) {
      const section = state.sections.find((s) => s.id === action.payload.id);
      if (section) {
        section.props = { ...section.props, ...action.payload.props };
        saveSections(state.sections as Section[]);
      }
    },

    deleteSection(state, action: PayloadAction<{ id: string }>) {
      state.sections = state.sections.filter((s) => s.id !== action.payload.id);
      saveSections(state.sections as Section[]);
    },

    changeFullSections(state, action: PayloadAction<Section[]>) {
      state.sections = action.payload;
      saveSections(action.payload);
    },

    addProjectCard(
      state,
      action: PayloadAction<{ sectionId: string; project: ProjectCard }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "projects",
      ) as ProjectsSection | undefined;

      if (section && "projects" in section.props) {
        section.props.projects.push(action.payload.project);
        saveSections(state.sections as Section[]);
      }
    },

    updateProjectCard(
      state,
      action: PayloadAction<{
        sectionId: string;
        projectId: string;
        updates: Partial<ProjectCard>;
      }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "projects",
      ) as ProjectsSection | undefined;

      if (section && "projects" in section.props) {
        const project = section.props.projects.find(
          (p) => p.id === action.payload.projectId,
        );
        if (project) {
          Object.assign(project, action.payload.updates);
          saveSections(state.sections as Section[]);
        }
      }
    },

    deleteProjectCard(
      state,
      action: PayloadAction<{ sectionId: string; projectId: string }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "projects",
      ) as ProjectsSection | undefined;

      if (section && "projects" in section.props) {
        section.props.projects = section.props.projects.filter(
          (p) => p.id !== action.payload.projectId,
        );
        saveSections(state.sections as Section[]);
      }
    },

    reorderProjects(
      state,
      action: PayloadAction<{
        sectionId: string;
        startIndex: number;
        endIndex: number;
      }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "projects",
      ) as ProjectsSection | undefined;

      if (section && "projects" in section.props) {
        const projects = section.props.projects;
        const [removed] = projects.splice(action.payload.startIndex, 1);
        projects.splice(action.payload.endIndex, 0, removed);
        saveSections(state.sections as Section[]);
      }
    },

    updateAllProjects(
      state,
      action: PayloadAction<{ sectionId: string; projects: ProjectCard[] }>,
    ) {
      const section = state.sections.find(
        (s) => s.id === action.payload.sectionId && s.type === "projects",
      ) as ProjectsSection | undefined;

      if (section && "projects" in section.props) {
        section.props.projects = action.payload.projects;
        saveSections(state.sections as Section[]);
      }
    },
  },
});

export const {
  addSection,
  updateSection,
  deleteSection,
  changeFullSections,
  addProjectCard,
  updateProjectCard,
  deleteProjectCard,
  reorderProjects,
  updateAllProjects,
} = sectionSlice.actions;

// Selectors
export const selectSectionById =
  (id: string) => (state: { sections: SectionsState }) =>
    state.sections.sections.find((s) => s.id === id);

export default sectionSlice.reducer;
