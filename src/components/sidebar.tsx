"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  addSection,
  selectSectionById,
  updateSection,
} from "@/store/slices/sectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Section, SectionsState } from "@/types/types";
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
import { HeroProps, HeroSection } from "@/types/hero.types";
import { ProjectsSection } from "@/types/projects.types";
import ProjectsForm from "./projects/ProjectsForm";

export function AppSidebar() {
  const dispatch = useDispatch();

  const sections = useSelector((state: any) => state.sections.sections);
  const selectedSection = useSelector((state: any) => state.selectedSection.id);
  const sectionType = useSelector(selectSectionById(selectedSection));
  const heroSection: HeroSection = {
    id: crypto.randomUUID(),
    type: "hero",
    props: {
      title: "Building things people actually use",
      subtitle: "Frontend Developer",
      variant: "centered",
      colors: { title: "", subtitle: "", background: "" },
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

  const minimalProjects: ProjectsSection = {
    id: "work",
    type: "projects",
    props: {
      title: "Featured projects",
      subtitle: "A selection of work that I'm most proud of",
      variant: "default",
      columns: 3,
      projects: [
        {
          id: "example-1",
          title: "Design System",
          description: "Scalable component library and design tokens",
          link: "#",
          githubLink: "#",
          status: "completed",
          technologies: ["React", "Storybook", "Styled Components"],
        },
        {
          id: "example-2",
          title: "Analytics Dashboard",
          description: "Real-time data visualization platform",
          link: "#",
          status: "in-progress",
          technologies: ["Vue", "D3.js", "Express"],
        },
        {
          id: "example-3",
          title: "Mobile App",
          description: "Cross-platform mobile experience",
          link: "#",
          githubLink: "#",
          status: "pending",
          technologies: ["React Native", "Firebase", "Redux"],
        },
      ],
    },
  };

  function handleAddSection(type: string) {
    if (type === "hero") {
      dispatch(addSection(heroSection));
    }
    if (type === "projects") {
      dispatch(addSection(minimalProjects));
    }
    console.log(sections);
  }

  return (
    <Sidebar variant="floating" className="z-50">
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
                <SelectItem value="projects">Project</SelectItem>
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
          {sectionType?.type === "hero" ? <HeroForm /> : ""}
          {sectionType?.type === "projects" ? <ProjectsForm /> : ""}
        </div>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
