import { configureStore } from "@reduxjs/toolkit";

import sectionReducer from "./slices/sectionsSlice";
import selectedSectionReducer from "./slices/selectedSectionSlice";

export const store = configureStore({
  reducer: {
    sections: sectionReducer,
    selectedSection: selectedSectionReducer,
  },
});
