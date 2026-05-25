"use client";

import { updateSection } from "@/store/slices/sectionsSlice";
import { ProjectsProps, ProjectCard } from "@/types/projects.types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";

const defaultProjectsProps: ProjectsProps = {
  title: "",
  subtitle: "",
  variant: "default",
  columns: 3,
  projects: [],
};

// Sortable project card item for the list
const SortableProjectItem = ({
  project,
  index,
  onEdit,
  onDelete,
}: {
  project: ProjectCard;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const { ref, handleRef, isDragging } = useSortable({
    id: project.id ?? `project-${index}`,
    index,
  });

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border"
    >
      <div ref={handleRef} className="cursor-grab">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{project.title}</p>
        <p className="text-xs text-muted-foreground truncate">
          {project.description}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="h-3 w-3 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

const ProjectsForm = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state: any) => state.sections.sections);
  const selectedSectionId = useSelector(
    (state: any) => state.selectedSection.id,
  );

  const selectedSection = sections.find((s: any) => s.id === selectedSectionId);

  const [data, setData] = useState<ProjectsProps>(
    selectedSection?.props ?? defaultProjectsProps,
  );
  const [editingProject, setEditingProject] = useState<ProjectCard | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (selectedSection?.props) {
      setData(selectedSection.props);
    }
  }, [selectedSectionId]);

  const set = (path: string, value: any) => {
    setData((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let obj: any = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (selectedSectionId) {
          dispatch(updateSection({ id: selectedSectionId, props: next }));
        }
      }, 600);

      return next;
    });
  };

  const handleAddProject = (project: ProjectCard) => {
    const newProject = {
      ...project,
      id: project.id || `project-${Date.now()}`,
    };
    const updated = [...data.projects, newProject];
    setData((prev) => ({ ...prev, projects: updated }));
    set("projects", updated);
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  const handleUpdateProject = (updatedProject: ProjectCard) => {
    const updatedProjects = data.projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p,
    );
    setData((prev) => ({ ...prev, projects: updatedProjects }));
    set("projects", updatedProjects);
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = data.projects.filter((p) => p.id !== projectId);
    setData((prev) => ({ ...prev, projects: updatedProjects }));
    set("projects", updatedProjects);
  };

  const handleDragEnd = (event: any) => {
    if (event.canceled) return;

    const { source } = event.operation;

    if (isSortable(source)) {
      const { initialIndex, index } = source;

      if (initialIndex !== index) {
        setData((prev) => {
          const newProjects = [...prev.projects];
          const [removed] = newProjects.splice(initialIndex, 1);
          newProjects.splice(index, 0, removed);
          set("projects", newProjects);
          return { ...prev, projects: newProjects };
        });
      }
    }
  };

  const openEditDialog = (project: ProjectCard) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  if (!selectedSection) {
    return (
      <p className="text-sm text-muted-foreground px-4 py-6">
        Select a section to edit.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-5 text-sm">
      {/* Section Settings */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Content
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label>Title</Label>
            <Input
              value={data.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Projects section title"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Subtitle</Label>
            <Input
              value={data.subtitle || ""}
              onChange={(e) => set("subtitle", e.target.value)}
              placeholder="Optional subtitle"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* Layout Settings */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Layout
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label>Variant</Label>
            <Select
              value={data.variant}
              onValueChange={(v: any) => set("variant", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Grid</SelectItem>
                <SelectItem value="modern" disabled>
                  Modern Cards
                </SelectItem>
                <SelectItem value="compact" disabled>
                  Compact List
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Columns</Label>
            <Select
              value={String(data.columns || 3)}
              onValueChange={(v) => set("columns", parseInt(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 Columns</SelectItem>
                <SelectItem value="3">3 Columns</SelectItem>
                <SelectItem value="4">4 Columns</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <Separator />

      {/* Projects Management */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Projects ({data.projects.length})
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => setEditingProject(null)}>
                <Plus className="h-3 w-3 mr-1" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? "Edit Project" : "Add New Project"}
                </DialogTitle>
              </DialogHeader>
              <ProjectFormDialog
                project={editingProject}
                onSave={editingProject ? handleUpdateProject : handleAddProject}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingProject(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {data.projects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
            <p className="text-sm">No projects yet</p>
            <p className="text-xs mt-1">Click "Add Project" to get started</p>
          </div>
        ) : (
          <DragDropProvider onDragEnd={handleDragEnd}>
            <div className="flex flex-col gap-2">
              {data.projects.map((project, index) => (
                <SortableProjectItem
                  key={project.id || `project-${index}`}
                  project={project}
                  index={index}
                  onEdit={() => openEditDialog(project)}
                  onDelete={() => handleDeleteProject(project.id!)}
                />
              ))}
            </div>
          </DragDropProvider>
        )}
      </section>
    </div>
  );
};

// Project Form Dialog Component — unchanged
const ProjectFormDialog = ({
  project,
  onSave,
  onCancel,
}: {
  project: ProjectCard | null;
  onSave: (project: ProjectCard) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<ProjectCard>>(
    project || {
      title: "",
      description: "",
      link: "",
      githubLink: "",
      demoLink: "",
      status: "pending",
      technologies: [],
      image: "",
    },
  );

  const [techInput, setTechInput] = useState("");

  const addTechnology = () => {
    if (
      techInput.trim() &&
      !formData.technologies?.includes(techInput.trim())
    ) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((t) => t !== tech),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.link) {
      onSave({
        id: project?.id,
        title: formData.title,
        description: formData.description,
        link: formData.link,
        githubLink: formData.githubLink,
        demoLink: formData.demoLink,
        image: formData.image,
        status: formData.status as any,
        technologies: formData.technologies,
      } as ProjectCard);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Title *</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Project title"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Description *</Label>
        <Textarea
          value={formData.description}
          onChange={(e: any) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Project description"
          rows={3}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Project Link *</Label>
        <Input
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          placeholder="https://example.com/project"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>GitHub Link</Label>
        <Input
          value={formData.githubLink || ""}
          onChange={(e) =>
            setFormData({ ...formData, githubLink: e.target.value })
          }
          placeholder="https://github.com/username/repo"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Demo Link</Label>
        <Input
          value={formData.demoLink || ""}
          onChange={(e) =>
            setFormData({ ...formData, demoLink: e.target.value })
          }
          placeholder="https://demo.example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Image URL</Label>
        <Input
          value={formData.image || ""}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Status</Label>
        <Select
          value={formData.status}
          onValueChange={(v: any) => setFormData({ ...formData, status: v })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Technologies</Label>
        <div className="flex gap-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="React, TypeScript, etc."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTechnology())
            }
          />
          <Button type="button" onClick={addTechnology} size="sm">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {formData.technologies?.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-muted rounded-full text-xs flex items-center gap-1"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="hover:text-destructive"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-end mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Project</Button>
      </div>
    </form>
  );
};

export default ProjectsForm;
