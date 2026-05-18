import { HeroProps } from "@/store/slices/types";
import React from "react";
import CenterHeroSection from "./varient/center";

const HeroSection = (props: HeroProps) => {
  return (
    <div className="overflow-hidden max-w-screen">
      {props.variant === "centered" ? <CenterHeroSection {...props} /> : ""}
    </div>
  );
};

export default HeroSection;
