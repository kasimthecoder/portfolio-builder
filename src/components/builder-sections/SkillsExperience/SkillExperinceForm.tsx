"use client";

import { updateSection } from "@/store/slices/sectionsSlice";
import {
  Skill,
  Experience,
  SkillsExperienceProps,
  SkillLevel,
  SkillCategory,
  EmploymentType,
  ExperienceVariant,
} from "@/types/skills.types";
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
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";

const SKILL_LEVELS: SkillLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const SKILL_CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Languages",
  "Database",
  "DevOps",
  "Design",
  "Other",
];

const EMPLOYMENT_TYPES: EmploymentType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
];

const defaultProps: SkillsExperienceProps = {
  title: "",
  subtitle: "",
  variant: "default",
  skills: [],
  experience: [],
};

// ─── Sortable Skill Item ─────────────────────────────────────────────────────

const SortableSkillItem = ({
  skill,
  index,
  onEdit,
  onDelete,
}: {
  skill: Skill;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const { ref, handleRef, isDragging } = useSortable({
    id: skill.name + index,
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
        <p className="font-medium truncate">{skill.name}</p>
        <p className="text-xs text-muted-foreground">
          {skill.category} · {skill.level}
          {skill.featured && " · ★ Featured"}
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

// ─── Sortable Experience Item ────────────────────────────────────────────────

const SortableExperienceItem = ({
  exp,
  index,
  onEdit,
  onDelete,
}: {
  exp: Experience;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const { ref, handleRef, isDragging } = useSortable({
    id: exp.id ? String(exp.id) : `exp-${index}`,
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
        <p className="font-medium truncate">{exp.role}</p>
        <p className="text-xs text-muted-foreground truncate">
          {exp.company}
          {exp.current ? " · Current" : ""}
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

// ─── Skill Dialog Form ───────────────────────────────────────────────────────

const SkillFormDialog = ({
  skill,
  onSave,
  onCancel,
}: {
  skill: Skill | null;
  onSave: (skill: Skill) => void;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState<Skill>(
    skill ?? {
      name: "",
      category: "Frontend",
      level: "Intermediate",
      featured: false,
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim()) onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Skill name *</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. React, Figma, Docker…"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>Category</Label>
          <Select
            value={form.category}
            onValueChange={(v) =>
              setForm({ ...form, category: v as SkillCategory })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SKILL_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Level</Label>
          <Select
            value={form.level}
            onValueChange={(v) => setForm({ ...form, level: v as SkillLevel })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SKILL_LEVELS.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="featured"
          checked={form.featured ?? false}
          onCheckedChange={(v) => setForm({ ...form, featured: v })}
        />
        <Label htmlFor="featured" className="cursor-pointer">
          Feature on profile
        </Label>
      </div>

      <div className="flex gap-2 justify-end mt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Skill</Button>
      </div>
    </form>
  );
};

// ─── Experience Dialog Form ──────────────────────────────────────────────────

const ExperienceFormDialog = ({
  exp,
  onSave,
  onCancel,
}: {
  exp: Experience | null;
  onSave: (exp: Experience) => void;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState<Experience>(
    exp ?? {
      role: "",
      company: "",
      companyUrl: "",
      location: "",
      type: "Full-time",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      skills: [],
    },
  );

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills?.includes(s)) {
      setForm({ ...form, skills: [...(form.skills ?? []), s] });
    }
    setSkillInput("");
  };

  const removeSkill = (s: string) => {
    setForm({ ...form, skills: form.skills?.filter((x) => x !== s) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.role.trim() && form.company.trim() && form.startDate) {
      onSave(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Job title *</Label>
        <Input
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          placeholder="e.g. Senior Frontend Engineer"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>Company *</Label>
          <Input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company name"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Type</Label>
          <Select
            value={form.type}
            onValueChange={(v) =>
              setForm({ ...form, type: v as EmploymentType })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYMENT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Company URL</Label>
        <Input
          type="url"
          value={form.companyUrl ?? ""}
          onChange={(e) => setForm({ ...form, companyUrl: e.target.value })}
          placeholder="https://company.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Location</Label>
        <Input
          value={form.location ?? ""}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="City, Country or Remote"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label>Start date *</Label>
          <Input
            type="month"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>End date</Label>
          <Input
            type="month"
            value={form.endDate ?? ""}
            disabled={form.current}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="current"
          checked={form.current ?? false}
          onCheckedChange={(v) =>
            setForm({ ...form, current: v, endDate: v ? "" : form.endDate })
          }
        />
        <Label htmlFor="current" className="cursor-pointer">
          I currently work here
        </Label>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Description</Label>
        <Textarea
          value={form.description ?? ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Key responsibilities, achievements, impact…"
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Skills used</Label>
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="React, TypeScript, etc."
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addSkill())
            }
          />
          <Button type="button" size="sm" onClick={addSkill}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {form.skills?.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 bg-muted rounded-full text-xs flex items-center gap-1"
            >
              {s}
              <button
                type="button"
                onClick={() => removeSkill(s)}
                className="hover:text-destructive"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-end mt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Experience</Button>
      </div>
    </form>
  );
};

const SkillsExperienceForm = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state: any) => state.sections.sections);
  const selectedSectionId = useSelector(
    (state: any) => state.selectedSection.id,
  );

  const selectedSection = sections.find((s: any) => s.id === selectedSectionId);

  const [data, setData] = useState<SkillsExperienceProps>(
    selectedSection?.props ?? defaultProps,
  );

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);

  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isExpDialogOpen, setIsExpDialogOpen] = useState(false);

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

  // ── Skill handlers ──
  const handleAddSkill = (skill: Skill) => {
    const updated = [...(data.skills ?? []), skill];
    setData((prev) => ({ ...prev, skills: updated }));
    set("skills", updated);
    setIsSkillDialogOpen(false);
    setEditingSkill(null);
  };

  const handleUpdateSkill = (updated: Skill) => {
    const updatedSkills = (data.skills ?? []).map((s) =>
      s.name === editingSkill?.name && s.category === editingSkill?.category
        ? updated
        : s,
    );
    setData((prev) => ({ ...prev, skills: updatedSkills }));
    set("skills", updatedSkills);
    setIsSkillDialogOpen(false);
    setEditingSkill(null);
  };

  const handleDeleteSkill = (index: number) => {
    const updated = (data.skills ?? []).filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, skills: updated }));
    set("skills", updated);
  };

  const handleSkillDragEnd = (event: any) => {
    if (event.canceled) return;
    const { source } = event.operation;
    if (isSortable(source)) {
      const { initialIndex, index } = source;
      if (initialIndex !== index) {
        setData((prev) => {
          const next = [...(prev.skills ?? [])];
          const [removed] = next.splice(initialIndex, 1);
          next.splice(index, 0, removed);
          set("skills", next);
          return { ...prev, skills: next };
        });
      }
    }
  };

  // ── Experience handlers ──
  const handleAddExp = (exp: Experience) => {
    const newExp: Experience = { ...exp, id: exp.id ?? `exp-${Date.now()}` };
    const updated = [...(data.experience ?? []), newExp];
    setData((prev) => ({ ...prev, experience: updated }));
    set("experience", updated);
    setIsExpDialogOpen(false);
    setEditingExp(null);
  };

  const handleUpdateExp = (updated: Experience) => {
    const updatedList = (data.experience ?? []).map((e) =>
      e.id === editingExp?.id ? updated : e,
    );
    setData((prev) => ({ ...prev, experience: updatedList }));
    set("experience", updatedList);
    setIsExpDialogOpen(false);
    setEditingExp(null);
  };

  const handleDeleteExp = (id: string | number) => {
    const updated = (data.experience ?? []).filter((e) => e.id !== id);
    setData((prev) => ({ ...prev, experience: updated }));
    set("experience", updated);
  };

  const handleExpDragEnd = (event: any) => {
    if (event.canceled) return;
    const { source } = event.operation;
    if (isSortable(source)) {
      const { initialIndex, index } = source;
      if (initialIndex !== index) {
        setData((prev) => {
          const next = [...(prev.experience ?? [])];
          const [removed] = next.splice(initialIndex, 1);
          next.splice(index, 0, removed);
          set("experience", next);
          return { ...prev, experience: next };
        });
      }
    }
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
      {/* ── Content ── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Content
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label>Title</Label>
            <Input
              value={data.title ?? ""}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Skills & Experience"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Subtitle</Label>
            <Input
              value={data.subtitle ?? ""}
              onChange={(e) => set("subtitle", e.target.value)}
              placeholder="Optional subtitle"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Layout ── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Layout
        </p>
        <div className="flex flex-col gap-1.5">
          <Label>Experience variant</Label>
          <Select
            value={data.variant ?? "default"}
            onValueChange={(v) => set("variant", v as ExperienceVariant)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Cards</SelectItem>
              <SelectItem value="compact">Compact List</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <Separator />

      {/* ── Skills ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Skills ({data.skills?.length ?? 0})
          </p>
          <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => setEditingSkill(null)}>
                <Plus className="h-3 w-3 mr-1" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingSkill ? "Edit Skill" : "Add New Skill"}
                </DialogTitle>
              </DialogHeader>
              <SkillFormDialog
                skill={editingSkill}
                onSave={editingSkill ? handleUpdateSkill : handleAddSkill}
                onCancel={() => {
                  setIsSkillDialogOpen(false);
                  setEditingSkill(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {!data.skills || data.skills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
            <p className="text-sm">No skills yet</p>
            <p className="text-xs mt-1">Click "Add Skill" to get started</p>
          </div>
        ) : (
          <DragDropProvider onDragEnd={handleSkillDragEnd}>
            <div className="flex flex-col gap-2">
              {data.skills.map((skill, index) => (
                <SortableSkillItem
                  key={skill.name + index}
                  skill={skill}
                  index={index}
                  onEdit={() => {
                    setEditingSkill(skill);
                    setIsSkillDialogOpen(true);
                  }}
                  onDelete={() => handleDeleteSkill(index)}
                />
              ))}
            </div>
          </DragDropProvider>
        )}
      </section>

      <Separator />

      {/* ── Experience ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Experience ({data.experience?.length ?? 0})
          </p>
          <Dialog open={isExpDialogOpen} onOpenChange={setIsExpDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => setEditingExp(null)}>
                <Plus className="h-3 w-3 mr-1" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingExp ? "Edit Experience" : "Add New Experience"}
                </DialogTitle>
              </DialogHeader>
              <ExperienceFormDialog
                exp={editingExp}
                onSave={editingExp ? handleUpdateExp : handleAddExp}
                onCancel={() => {
                  setIsExpDialogOpen(false);
                  setEditingExp(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {!data.experience || data.experience.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
            <p className="text-sm">No experience yet</p>
            <p className="text-xs mt-1">Click "Add Role" to get started</p>
          </div>
        ) : (
          <DragDropProvider onDragEnd={handleExpDragEnd}>
            <div className="flex flex-col gap-2">
              {data.experience.map((exp, index) => (
                <SortableExperienceItem
                  key={exp.id ? String(exp.id) : `exp-${index}`}
                  exp={exp}
                  index={index}
                  onEdit={() => {
                    setEditingExp(exp);
                    setIsExpDialogOpen(true);
                  }}
                  onDelete={() =>
                    exp.id !== undefined && handleDeleteExp(exp.id)
                  }
                />
              ))}
            </div>
          </DragDropProvider>
        )}
      </section>
    </div>
  );
};

export default SkillsExperienceForm;
