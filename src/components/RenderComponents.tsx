"use client";
import { changeSelectedSection } from "@/store/slices/selectedSectionSlice";
import { Section } from "@/types/types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./hero/HeroSection";
import { HeroProps } from "@/types/hero.types";
import ProjectsSection from "./projects/ProjectsSection";
import { ProjectsProps } from "@/types/projects.types";
import { Portfolio } from "./builder/BuilderClient";
import { changeFullSections } from "@/store/slices/sectionsSlice";

interface RenderComponentsProps {
  portfolio: Portfolio;
  selectionClick?: boolean;
}

const RenderComponents = ({
  portfolio,
  selectionClick = false,
}: RenderComponentsProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeFullSections(portfolio.sections));
  }, [portfolio, dispatch]);

  const sections = useSelector((state: any) => state.sections.sections);
  const selectedSection = useSelector((state: any) => state.selectedSection);

  console.log(sections);

  function handleSelectedSection(id: string) {
    if (!selectionClick) return; // Only handle clicks if selectionClick is true

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
          className={`${
            selectionClick && section.id === selectedSection.id
              ? "border-red-200 border"
              : ""
          } h-full ${selectionClick ? "cursor-pointer" : ""}`}
          onClick={() => handleSelectedSection(section.id)}
        >
          {section.type === "hero" ? (
            <HeroSection {...(section.props as HeroProps)} />
          ) : (
            ""
          )}
          {section.type === "projects" ? (
            <ProjectsSection {...(section.props as ProjectsProps)} />
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
};

export default RenderComponents;
