"use client";

import RenderComponents from "@/components/RenderComponents";
import { AppSidebar } from "@/components/sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Builder = () => {
  return (
    <div className="w-screen py-0 px-0 overflow-hidden">
      <ModeToggle />
      <AppSidebar />
      <SidebarTrigger className="fixed top-3 left-3 z-99999" />

      <RenderComponents />
    </div>
  );
};

export default Builder;
