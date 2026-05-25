"use client";

import { SkillsExperienceProps } from "@/types/skills.types";
import { MapPin, Calendar, ArrowUpRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ─── Types ─────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  featured?: boolean;
}

export interface Experience {
  id?: string | number;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  type?: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
  startDate: string; // "YYYY-MM"
  endDate?: string; // "YYYY-MM" or omit if current
  current?: boolean;
  description?: string;
  skills?: string[];
}

export interface SkillsExperienceSectionProps {
  title?: string;
  subtitle?: string;
  skills?: Skill[];
  experience?: Experience[];
  /** "default" shows full cards | "compact" shows list rows */
  variant?: "default" | "compact";
}

// ─── Constants ──────────────────────────────────────────────────────────────
const LEVEL_PCT: Record<string, number> = {
  Beginner: 25,
  Intermediate: 55,
  Advanced: 78,
  Expert: 95,
};

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "bg-blue-500/15  text-blue-400  border-blue-500/30",
  Backend: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Languages: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Database: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  DevOps: "bg-rose-500/15  text-rose-400  border-rose-500/30",
  Design: "bg-pink-500/15  text-pink-400  border-pink-500/30",
  Other: "bg-white/10     text-white/50  border-white/20",
};

// ─── Helpers ────────────────────────────────────────────────────────────────
function fmtDate(d: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  return new Date(Number(y), Number(m) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function calcDuration(start: string, end?: string) {
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  const mo =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (mo < 12) return `${mo}mo`;
  const y = Math.floor(mo / 12);
  const r = mo % 12;
  return r ? `${y}y ${r}mo` : `${y}y`;
}

// ─── Default data ────────────────────────────────────────────────────────────
const DEFAULT_SKILLS: Skill[] = [
  { name: "React", category: "Frontend", level: "Expert", featured: true },
  {
    name: "TypeScript",
    category: "Languages",
    level: "Advanced",
    featured: true,
  },
  { name: "Next.js", category: "Frontend", level: "Advanced", featured: true },
  { name: "Node.js", category: "Backend", level: "Advanced", featured: false },
  {
    name: "PostgreSQL",
    category: "Database",
    level: "Intermediate",
    featured: false,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Expert",
    featured: false,
  },
  {
    name: "Python",
    category: "Languages",
    level: "Intermediate",
    featured: false,
  },
  {
    name: "Docker",
    category: "DevOps",
    level: "Intermediate",
    featured: false,
  },
  { name: "Prisma", category: "Database", level: "Advanced", featured: false },
  { name: "Figma", category: "Design", level: "Intermediate", featured: false },
];

const DEFAULT_EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "Acme Corp",
    companyUrl: "https://acme.com",
    location: "Remote",
    type: "Full-time",
    startDate: "2022-06",
    current: true,
    description:
      "Led frontend architecture for a SaaS platform serving 50k+ users. Migrated legacy codebase to Next.js 13 with App Router, cutting TTFB by 40%. Mentored 3 junior engineers and owned the design system.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Bright Labs",
    location: "Bangalore, IN",
    type: "Full-time",
    startDate: "2020-03",
    endDate: "2022-05",
    description:
      "Built and shipped 12 client-facing product features. Owned the component library, improving cross-team consistency. Reduced bundle size by 30% via code-splitting and tree-shaking.",
    skills: ["React", "Redux", "Node.js", "PostgreSQL"],
  },
];

// ─── Skill Chip ─────────────────────────────────────────────────────────────
function SkillChip({ skill }: { skill: Skill }) {
  const colClass = CATEGORY_COLORS[skill.category] ?? CATEGORY_COLORS.Other;
  const pct = LEVEL_PCT[skill.level];

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 hover:border-border/80 transition-all duration-300">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-semibold text-sm text-foreground truncate">
              {skill.name}
            </span>
            {skill.featured && (
              <span className="text-amber-400 text-xs leading-none">★</span>
            )}
          </div>
          <span
            className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${colClass}`}
          >
            {skill.category}
          </span>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground/50 mt-0.5 shrink-0">
          {skill.level}
        </span>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="h-px w-full bg-border overflow-hidden rounded-full">
          <div
            className="h-full bg-foreground/30 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground/40 font-mono">
          <span>proficiency</span>
          <span>{pct}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Experience Card (default) ───────────────────────────────────────────────
function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-border/80 transition-all duration-300">
      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-snug text-foreground mb-1">
              {exp.role}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  {exp.company}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {exp.company}
                </span>
              )}
              {exp.type && (
                <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-white/5 text-white/40 border-white/15">
                  {exp.type}
                </span>
              )}
            </div>
          </div>

          {/* Current badge */}
          {exp.current && (
            <span className="shrink-0 mt-0.5 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
              Current
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-xs text-muted-foreground/60">
          {exp.startDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {fmtDate(exp.startDate)} –{" "}
              {exp.current ? "Present" : fmtDate(exp.endDate ?? "")}
              <span className="ml-1 px-1.5 py-0.5 rounded bg-muted font-mono">
                {calcDuration(
                  exp.startDate,
                  exp.current ? undefined : exp.endDate,
                )}
              </span>
            </span>
          )}
          {exp.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </span>
          )}
        </div>

        {/* Description */}
        {exp.description && (
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
            {exp.description}
          </p>
        )}

        {/* Skill tags */}
        {exp.skills && exp.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
            {exp.skills.map((s) => (
              <span
                key={s}
                className="text-[11px] font-mono text-muted-foreground/60 px-2 py-0.5 rounded bg-muted border border-border"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Experience Row (compact) ────────────────────────────────────────────────
function ExperienceRow({ exp }: { exp: Experience }) {
  return (
    <div className="flex items-center gap-6 px-6 py-4 bg-background/50 hover:bg-muted/50 transition-colors duration-200 group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-medium truncate text-foreground">
            {exp.role}
          </span>
          {exp.current && (
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
              Current
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>{exp.company}</span>
          {exp.location && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground/50">
              <MapPin className="w-3 h-3" /> {exp.location}
            </span>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground/50 font-mono">
        <Calendar className="w-3 h-3" />
        {fmtDate(exp.startDate)} –{" "}
        {exp.current ? "Present" : fmtDate(exp.endDate ?? "")}
      </div>

      {/* Skills preview */}
      <div className="hidden lg:flex items-center gap-1.5 shrink-0">
        {exp.skills?.slice(0, 3).map((s) => (
          <span
            key={s}
            className="text-[10px] text-muted-foreground/50 font-mono"
          >
            {s}
          </span>
        ))}
        {(exp.skills?.length ?? 0) > 3 && (
          <span className="text-[10px] text-muted-foreground/30 font-mono">
            +{(exp.skills?.length ?? 0) - 3}
          </span>
        )}
      </div>

      <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0" />
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export default function SkillsExperienceSectionDefault({
  title,
  subtitle,
  skills = DEFAULT_SKILLS,
  experience = DEFAULT_EXPERIENCE,
  variant = "default",
}: SkillsExperienceSectionProps) {
  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    acc[s.category] = [...(acc[s.category] ?? []), s];
    return acc;
  }, {});

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-28 px-6">
      <Separator className="absolute top-0 inset-x-0" />

      {/* ── Section Header ── */}
      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto w-full">
        <Badge
          variant="outline"
          className="mb-8 gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Expertise
        </Badge>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08] mb-4 text-foreground">
          {title || "Skills & Experience"}
        </h2>

        <Separator className="my-5 w-10 mx-auto" />

        {subtitle && (
          <p className="text-[15px] leading-relaxed max-w-md font-light mb-8 text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Skills ── */}
      <div className="w-full max-w-6xl mx-auto mb-20">
        {/* Skills sub-header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
            Skills
          </span>
          <Separator className="flex-1" />
          <span className="text-xs font-mono text-muted-foreground/30">
            {skills.length} total
          </span>
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground/30">
            <p className="text-sm tracking-widest uppercase">
              No skills listed
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, catSkills]) => (
              <div key={category}>
                {/* Category label */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                      CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other
                    }`}
                  >
                    {category}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[10px] font-mono text-muted-foreground/30">
                    {catSkills.length}
                  </span>
                </div>

                {/* Chips grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {catSkills.map((s) => (
                    <SkillChip key={s.name} skill={s} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Experience ── */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Experience sub-header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
            Experience
          </span>
          <Separator className="flex-1" />
          <span className="text-xs font-mono text-muted-foreground/30">
            {experience.length} positions
          </span>
        </div>

        {experience.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground/30">
            <p className="text-sm tracking-widest uppercase">
              No experience listed
            </p>
          </div>
        ) : variant === "compact" ? (
          <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
            {experience.map((exp, i) => (
              <ExperienceRow key={exp.id ?? `exp-${i}`} exp={exp} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {experience.map((exp, i) => (
              <ExperienceCard key={exp.id ?? `exp-${i}`} exp={exp} />
            ))}
          </div>
        )}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-px h-7 bg-foreground/20 animate-[scaleY_1.8s_ease-in-out_infinite] origin-top" />
        <span className="text-[10px] uppercase tracking-widest text-foreground/40">
          expertise
        </span>
      </div>

      <Separator className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
