import { changeSelectedSection } from "@/store/slices/selectedSectionSlice";
import { HeroProps, Section } from "@/types/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./hero/HeroSection";

const RenderComponents = () => {
  const dispatch = useDispatch();

  const sections = useSelector((state: any) => state.sections.sections);
  const selectedSection = useSelector((state: any) => state.selectedSection);

  console.log(sections);

  function handleSelectedSection(id: string) {
    if (selectedSection.id === id) {
      dispatch(changeSelectedSection(""));
    } else {
      dispatch(changeSelectedSection(id));
    }
  }
  console.log(selectedSection);
  return (
    <>
      {sections.map((section: Section) => (
        <div
          key={section.id}
          className={`${section.id === selectedSection.id ? "border-red-200 border" : ""} h-full`}
          onClick={() => handleSelectedSection(section.id)}
        >
          {section.type === "hero" ? (
            <HeroSection {...(section.props as HeroProps)} />
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
};

export default RenderComponents;
