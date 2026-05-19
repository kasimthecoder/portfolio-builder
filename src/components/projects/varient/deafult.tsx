"use client";

import { ProjectsProps } from "@/types/projects.types";
import { ExternalLink, GitBranch, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  pending: {
    label: "Pending",
    className: "bg-white/10 text-white/50 border-white/20",
  },
};

export default function ProjectsSectionDefault({
  title,
  subtitle,
  variant = "default",
  columns = 3,
  projects = [],
}: ProjectsProps) {
  const colClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-28 px-6">
      <Separator className="absolute top-0 inset-x-0" />

      {/* Header Section - Matching Hero Design */}
      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto w-full">
        {/* Badge - Same as hero */}
        <Badge
          variant="outline"
          className="mb-8 gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Portfolio
        </Badge>

        {/* Title */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08] mb-4 text-foreground">
          {title || "Selected Work"}
        </h2>

        <Separator className="my-5 w-10 mx-auto" />

        {/* Subtitle */}
        {subtitle && (
          <p className="text-[15px] leading-relaxed max-w-md font-light mb-8 text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {/* Projects Grid */}
      <div
        className={`grid ${colClass} gap-6 max-w-6xl mx-auto w-full relative z-10`}
      >
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-16 text-muted-foreground/50">
            <p className="text-sm tracking-widest uppercase">No projects yet</p>
          </div>
        ) : variant === "compact" ? (
          <div className="col-span-full flex flex-col gap-0 divide-y divide-border border border-border rounded-xl overflow-hidden">
            {projects.map((project, index) => {
              const status = STATUS_CONFIG[project.status ?? "pending"];
              return (
                <div
                  key={project.id ?? `project-${index}`}
                  className="flex items-center gap-6 px-6 py-4 bg-background/50 hover:bg-muted/50 transition-colors duration-200 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium truncate text-foreground">
                        {project.title}
                      </span>
                      <span
                        className={`shrink-0 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="hidden sm:inline text-[10px] text-muted-foreground/60 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies &&
                      project.technologies.length > 3 && (
                        <span className="hidden sm:inline text-[10px] text-muted-foreground/40 font-mono">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground/60 hover:text-foreground transition-colors duration-150"
                      >
                        <GitBranch className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground/60 hover:text-foreground transition-colors duration-150"
                    >
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === "modern" ? (
          projects.map((project) => {
            const status = STATUS_CONFIG[project.status ?? "pending"];
            return (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                {project.image ? (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
                  </div>
                ) : (
                  <div className="h-44 bg-muted flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-muted-foreground/40" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base leading-snug text-foreground">
                      {project.title}
                    </h3>
                    <span
                      className={`shrink-0 mt-0.5 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono text-muted-foreground/60 px-2 py-0.5 rounded bg-muted border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-150"
                      >
                        <GitBranch className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-150"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Demo
                      </a>
                    )}
                    <div className="ml-auto">
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground/60 transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })
        ) : (
          projects.map((project, index) => {
            const status = STATUS_CONFIG[project.status ?? "pending"];
            return (
              <div
                key={project.id ?? `project-${index}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-border/80 transition-all duration-300"
              >
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-base leading-snug text-foreground">
                      {project.title}
                    </h3>
                    <span
                      className={`shrink-0 mt-0.5 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                    {project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono text-muted-foreground/60 px-2 py-0.5 rounded bg-muted border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-full px-4 text-xs font-semibold"
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project <ArrowUpRight className="w-3 h-3 ml-1" />
                      </a>
                    </Button>

                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground/60 hover:text-foreground hover:border-border/80 transition-all duration-200"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground/60 hover:text-foreground hover:border-border/80 transition-all duration-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Scroll indicator - Matching Hero */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-px h-7 bg-foreground/20 animate-[scaleY_1.8s_ease-in-out_infinite] origin-top" />
        <span className="text-[10px] uppercase tracking-widest text-foreground/40">
          projects
        </span>
      </div>

      <Separator className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
