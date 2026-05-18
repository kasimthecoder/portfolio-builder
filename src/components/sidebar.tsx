"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { addSection, updateSection } from "@/store/slices/sectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  HeroProps,
  HeroSection,
  Section,
  SectionsState,
} from "@/store/slices/types";
import HeroForm from "./hero/HeroForm";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DeleteButton from "./DeleteButton";
import DragableSections from "./DragableSections";

export function AppSidebar() {
  const dispatch = useDispatch();

  const sections = useSelector((state: any) => state.sections.sections);
  const selectedSection = useSelector((state: any) => state.selectedSection.id);

  const heroSection: HeroSection = {
    id: crypto.randomUUID(),
    type: "hero",
    props: {
      title: "New Hero Section",
      subtitle: "Frontend Developer",
      variant: "centered",
      colors: { title: "#ffffff", subtitle: "#d1d5db", background: "#0f172a" },
      buttons: {
        primary: {
          text: "Get Started",
          variant: "default",
          visibility: true,
          link: "#",
        },
        secondary: {
          text: "Learn More",
          variant: "ghost",
          visibility: true,
          link: "#",
        },
      },
    } satisfies HeroProps,
  };

  function handleAddSection(type: string) {
    if (type === "hero") {
      dispatch(addSection(heroSection));
    }
  }

  return (
    <Sidebar variant="floating">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />

        {/* ── Layout ────────────────────────────────────────────────────── */}
        <section className="mt-2 mx-auto pt-8 pb-2">
          <div className="flex flex-col gap-1.5">
            <Select
              value={"Add Section"}
              defaultValue="Add Section"
              onValueChange={(v) => handleAddSection(v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hero">Hero</SelectItem>
                {/* <SelectItem value="Projects">Project</SelectItem> */}
                <SelectItem value="Add Section" className="hidden">
                  Add Section
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
        <DragableSections sections={sections} />

        <Separator />
        <div>
          <DeleteButton className="m-4" />
          <HeroForm />
        </div>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
