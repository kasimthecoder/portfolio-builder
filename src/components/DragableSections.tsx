"use client";
import { Section, SectionsState } from "@/store/slices/types";
import React, { useState } from "react";
import DragableSectionItem from "./DragableSectionItem";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useDispatch } from "react-redux";
import { changeFullSections } from "@/store/slices/sectionsSlice";

const DragableSections = ({ sections: initialSections }: SectionsState) => {
  const [sections, setSections] = useState<Section[]>(initialSections);

  const dispatch = useDispatch();

  // Re-sync if Redux sections change externally
  React.useEffect(() => {
    setSections(initialSections);
  }, [initialSections]);

  return (
    <div className="mx-2">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
          const reordered = move(sections, event);
          dispatch(changeFullSections(reordered));
        }}
      >
        {sections.map((section, index) => (
          <DragableSectionItem
            key={section.id}
            section={section}
            id={section.id}
            index={index}
          />
        ))}
      </DragDropProvider>
    </div>
  );
};

export default DragableSections;
