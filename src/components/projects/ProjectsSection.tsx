import { HeroProps } from "@/types/hero.types";
import { ProjectsProps } from "@/types/projects.types";
import React from "react";
import ProjectsSectionDefault from "./varient/deafult";
// import CenterHeroSection from "./varient/center";

const ProjectsSection = (props: ProjectsProps) => {
  return (
    <div className="overflow-hidden max-w-screen z-10">
      {props.variant === "default" ? <ProjectsSectionDefault {...props} /> : ""}
    </div>
  );
};

export default ProjectsSection;
