import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Section, SectionsState } from "../../types/types";

// Helper to persist sections
const saveSections = (sections: Section[]) => {
  localStorage.setItem("sections", JSON.stringify(sections));
};

// Helper to load sections safely
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
  },
});

export const { addSection, updateSection, deleteSection, changeFullSections } =
  sectionSlice.actions;

export default sectionSlice.reducer;
