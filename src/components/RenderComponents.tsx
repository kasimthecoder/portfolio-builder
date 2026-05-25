"use client";
import { changeSelectedSection } from "@/store/slices/selectedSectionSlice";
import { Section } from "@/types/types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./builder-sections/hero/HeroSection";
import { HeroProps } from "@/types/hero.types";
import ProjectsSection from "./builder-sections/projects/ProjectsSection";
import { ProjectsProps } from "@/types/projects.types";
import { Portfolio } from "./builder/BuilderClient";
import { changeFullSections } from "@/store/slices/sectionsSlice";
import SkillExpirienceSection from "./builder-sections/SkillsExperience/SkillExpirienceSection";
import { SkillsExperienceProps } from "@/types/skills.types";
import ContactSectionRender from "./builder-sections/contact/ContactSection";
import { ContactProps } from "@/types/contact.types";

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

  function handleSelectedSection(id: string) {
    if (!selectionClick) return;

    if (selectedSection.id === id) {
      dispatch(changeSelectedSection(""));
    } else {
      dispatch(changeSelectedSection(id));
    }
  }

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
          {section.type === "skills-experience" ? (
            <SkillExpirienceSection
              {...(section.props as SkillsExperienceProps)}
            />
          ) : (
            ""
          )}
          {section.type === "contact" ? (
            <ContactSectionRender
              {...(section.props as ContactProps)}
              userId={portfolio.userId}
            />
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
};

export default RenderComponents;
