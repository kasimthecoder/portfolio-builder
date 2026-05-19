"use client";

import { updateSection } from "@/store/slices/sectionsSlice";
import { HeroProps } from "@/types/hero.types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const defaultHeroProps: HeroProps = {
  title: "",
  subtitle: "",
  variant: "centered",
  colors: { title: "#ffffff", subtitle: "#d1d5db", background: "#0f172a" },
  buttons: {
    primary: { text: "", variant: "default", visibility: true, link: "#" },
    secondary: { text: "", variant: "ghost", visibility: true, link: "#" },
  },
};

const HeroForm = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state: any) => state.sections.sections);
  const selectedSectionId = useSelector(
    (state: any) => state.selectedSection.id,
  );

  const selectedSection = sections.find((s: any) => s.id === selectedSectionId);

  const [data, setData] = useState<HeroProps>(
    selectedSection?.props ?? defaultHeroProps,
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync when selected section changes
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

      // Debounce Redux dispatch — only fires 300ms after user stops typing
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (selectedSectionId) {
          dispatch(updateSection({ id: selectedSectionId, props: next }));
        }
      }, 600);

      return next;
    });
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
      {/* ── Content ───────────────────────────────────────────────────── */}
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
              placeholder="Hero title"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Subtitle</Label>
            <Input
              value={data.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              placeholder="Hero subtitle"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Layout ────────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Layout
        </p>
        <div className="flex flex-col gap-1.5">
          <Label>Variant</Label>
          <Select value={data.variant} onValueChange={(v) => set("variant", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="centered">Centered</SelectItem>
              <SelectItem value="leftImage">Left Image</SelectItem>
              <SelectItem value="rightImage">Right Image</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <Separator />

      {/* ── Colors ────────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Colors
        </p>
        <div className="flex flex-col gap-3">
          {(
            [
              ["Title color", "colors.title"],
              ["Subtitle color", "colors.subtitle"],
              ["Background", "colors.background"],
            ] as [string, string][]
          ).map(([label, path]) => (
            <div key={path} className="flex items-center justify-between">
              <Label>{label}</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={path.split(".").reduce((o: any, k) => o[k], data)}
                  onChange={(e) => set(path, e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-border bg-transparent"
                />
                <span className="text-xs text-muted-foreground font-mono">
                  {path.split(".").reduce((o: any, k) => o[k], data)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Primary button ────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Primary Button
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label>Visible</Label>
            <Switch
              checked={data.buttons.primary.visibility}
              onCheckedChange={(v) => set("buttons.primary.visibility", v)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Text</Label>
            <Input
              value={data.buttons.primary.text}
              onChange={(e) => set("buttons.primary.text", e.target.value)}
              placeholder="Button label"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Link</Label>
            <Input
              value={data.buttons.primary.link}
              onChange={(e) => set("buttons.primary.link", e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Style</Label>
            <Select
              value={data.buttons.primary.variant}
              onValueChange={(v: any) => set("buttons.primary.variant", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "default",
                  "outline",
                  "secondary",
                  "ghost",
                  "destructive",
                  "link",
                ].map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Secondary button ──────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Secondary Button
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label>Visible</Label>
            <Switch
              checked={data.buttons.secondary?.visibility ?? false}
              onCheckedChange={(v) => set("buttons.secondary.visibility", v)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Text</Label>
            <Input
              value={data.buttons.secondary?.text ?? ""}
              onChange={(e) => set("buttons.secondary.text", e.target.value)}
              placeholder="Button label"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Link</Label>
            <Input
              value={data.buttons.secondary?.link ?? ""}
              onChange={(e) => set("buttons.secondary.link", e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Style</Label>
            <Select
              value={data.buttons.secondary?.variant ?? "ghost"}
              onValueChange={(v: any) => set("buttons.secondary.variant", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "default",
                  "outline",
                  "secondary",
                  "ghost",
                  "destructive",
                  "link",
                ].map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroForm;
