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
  changeFullSections,
  selectSectionById,
} from "@/store/slices/sectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DragableSections from "./DragableSections";
import HeroForm from "./hero/HeroForm";
import ProjectsForm from "./projects/ProjectsForm";
import { Portfolio } from "./builder/BuilderClient";
import {
  defaultHeroSection,
  defaultProjectsSection,
} from "@/data/defaultSections";
import { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { deletePortfolio, savePortfolio } from "@/app/actions/portfolio";
import { Badge } from "./ui/badge";
import {
  ExternalLink,
  Globe,
  Loader2,
  Pencil,
  Save,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export function AppSidebar({ portfolio }: { portfolio: Portfolio }) {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const [isContentSame, setIsContentSame] = useState(true);
  const sections = useSelector((state: any) => state.sections.sections);
  useEffect(() => {
    dispatch(changeFullSections(portfolio.sections));
  }, [portfolio]);

  useEffect(() => {
    setIsContentSame(
      JSON.stringify(sections) === JSON.stringify(portfolio.sections),
    );
  }, [sections]);
  const selectedSectionId = useSelector(
    (state: any) => state.selectedSection.id,
  );
  const selectedSection = useSelector(selectSectionById(selectedSectionId));

  function handleAddSection(type: string) {
    if (type === "hero") dispatch(addSection(defaultHeroSection));
    if (type === "projects") dispatch(addSection(defaultProjectsSection));
  }

  function handleSave() {
    startTransition(async () => {
      const result = await savePortfolio({ sections });
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Portfolio saved!");
    });
  }
  function handleDelete() {
    startTransition(async () => {
      await deletePortfolio();
    });
  }

  return (
    <Sidebar variant="floating" className="z-50">
      <SidebarHeader className="p-0 mt-8">
        <div className="px-3 pt-4 pb-3 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-0.5 min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                Portfolio
              </p>
              <p className="text-sm font-semibold truncate leading-tight">
                {portfolio.portfolioName}
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="/settings/portfolio">
                <Pencil className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-muted/50 border">
            <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground truncate flex-1">
              {portfolio.portfolioDomain}.portfolio.com
            </span>
            <Link
              href={`https://${portfolio.portfolioDomain}.portfolio.com`}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="flex-1 h-8 text-xs"
              onClick={handleSave}
              disabled={isPending || isContentSame}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save changes
                </>
              )}
            </Button>
            <Badge
              variant="secondary"
              className="text-xs h-8 px-2.5 font-normal shrink-0"
            >
              {sections.length} section{sections.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 text-xs text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
                disabled={isPending}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Delete portfolio
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete portfolio?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete{" "}
                  <span className="font-medium text-foreground">
                    {portfolio.portfolioDomain}.portfolio.com
                  </span>{" "}
                  and all its content. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Yes, delete portfolio
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <SidebarGroup />

        <section className="px-3 py-3">
          <Select
            value="add-section"
            onValueChange={(v) => handleAddSection(v)}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Add Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hero">Hero</SelectItem>
              <SelectItem value="projects">Projects</SelectItem>
              <SelectItem value="add-section" className="hidden">
                Add Section
              </SelectItem>
            </SelectContent>
          </Select>
        </section>

        <DragableSections sections={sections} />

        <Separator />

        <div>
          {selectedSection?.type === "hero" && <HeroForm />}
          {selectedSection?.type === "projects" && <ProjectsForm />}
        </div>

        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
