"use client";

import RenderComponents from "@/components/RenderComponents";
import { ModeToggle } from "@/components/theme-toggle";

const Home = () => {
  return (
    <div className="w-screen py-0 px-0 overflow-hidden">
      <ModeToggle />

      <RenderComponents />
    </div>
  );
};

export default Home;
