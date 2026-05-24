"use client";

import RenderComponents from "@/components/RenderComponents";
import { AppSidebar } from "@/components/sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export interface Portfolio {
  _id: string;
  name: string;
  domain: string;
  [key: string]: any;
}

const BuilderClient = ({ portfolio }: { portfolio: Portfolio }) => {
  return (
    <div className="w-screen py-0 px-0 overflow-hidden">
      <ModeToggle />
      <AppSidebar portfolio={portfolio} />
      <SidebarTrigger className="fixed top-3 left-3 z-[99999]" />
      <RenderComponents portfolio={portfolio} />
    </div>
  );
};

export default BuilderClient;
