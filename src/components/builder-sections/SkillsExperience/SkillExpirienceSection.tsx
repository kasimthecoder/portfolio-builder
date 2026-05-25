import React from "react";
import SkillsExperienceSectionDefault from "./varient/default";
import { SkillsExperienceProps } from "@/types/skills.types";

const SkillExpirienceSection = (props: SkillsExperienceProps) => {
  return (
    <div className="overflow-hidden max-w-screen">
      {props.variant === "default" ? (
        <SkillsExperienceSectionDefault {...props} />
      ) : (
        ""
      )}
    </div>
  );
};

export default SkillExpirienceSection;
