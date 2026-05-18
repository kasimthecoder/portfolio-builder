import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedSectionState {
  id: string;
}

const initialState: SelectedSectionState = {
  id: "",
};

export const selectedSectionSlice = createSlice({
  name: "selectedSection",

  initialState,

  reducers: {
    changeSelectedSection(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },

    removeSelectedSection(state) {
      state.id = "";
    },
  },
});

export const { changeSelectedSection, removeSelectedSection } =
  selectedSectionSlice.actions;

export default selectedSectionSlice.reducer;
