"use client";

import {
  updateContactSection,
  updateContactTheme,
} from "@/store/slices/sectionsSlice";
import {
  ContactProps,
  ContactTheme,
  SocialPlatform,
} from "@/types/contact.types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// ── Constants ─────────────────────────────────────────────────────────────────

const BUTTON_VARIANTS = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;

const PLATFORMS: SocialPlatform[] = [
  "github",
  "twitter",
  "linkedin",
  "instagram",
  "youtube",
  "dribbble",
  "behance",
  "custom",
];

const THEMES: { value: ContactTheme; label: string; description: string }[] = [
  {
    value: "editorial",
    label: "Editorial",
    description: "Serif heading, thin separator, muted tones",
  },
  //   {
  //     value: "bold",
  //     label: "Bold",
  //     description: "High-contrast, large sans heading, solid fill",
  //   },
  //   {
  //     value: "minimal",
  //     label: "Minimal",
  //     description: "Maximum whitespace, fine-line accents",
  //   },
  //   {
  //     value: "warm",
  //     label: "Warm",
  //     description: "Soft card wrapping the form, rounded, cozy",
  //   },
];

// ── Default props ─────────────────────────────────────────────────────────────

const defaultProps: ContactProps = {
  badgeText: "Available for work",
  badgeVisible: true,
  heading: "Let's talk",
  subtitle:
    "Have a project in mind or just want to say hello? Drop me a note and I'll get back to you within 24 hours.",
  theme: "editorial",
  showScrollIndicator: true,
  colors: { heading: "", subtitle: "", badge: "" },
  form: {
    nameField: {
      visible: true,
      label: "Name",
      placeholder: "Your name",
      required: true,
    },
    emailField: {
      visible: true,
      label: "Email",
      placeholder: "you@example.com",
      required: true,
    },
    subjectField: {
      visible: false,
      label: "Subject",
      placeholder: "What's this about?",
      required: false,
    },
    messageField: {
      visible: true,
      label: "Message",
      placeholder: "Tell me what's on your mind…",
      required: true,
    },
    submitButton: { text: "Send message", variant: "default" },
    alternateButton: {
      visible: true,
      text: "Email directly instead",
      href: "mailto:hello@example.com",
      variant: "outline",
    },
  },
  socialLinks: [],
  socialRowLabel: "Or find me on",
  socialRowVisible: true,
};

// ── Form ──────────────────────────────────────────────────────────────────────

const ContactForm = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state: any) => state.sections.sections);
  const selectedSectionId = useSelector(
    (state: any) => state.selectedSection.id,
  );

  const selectedSection = sections.find((s: any) => s.id === selectedSectionId);

  const [data, setData] = useState<ContactProps>(
    selectedSection?.props ?? defaultProps,
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (selectedSection?.props) {
      setData({ ...defaultProps, ...selectedSection.props });
    }
  }, [selectedSectionId]);

  // Generic deep-setter with debounced dispatch
  const set = (path: string, value: any) => {
    setData((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let obj: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (selectedSectionId) {
          dispatch(
            updateContactSection({ id: selectedSectionId, props: next }),
          );
        }
      }, 600);

      return next;
    });
  };

  // Theme is dispatched immediately (no need to debounce a single enum swap)
  const setTheme = (theme: ContactTheme) => {
    set("theme", theme);
    if (selectedSectionId) {
      dispatch(updateContactTheme({ sectionId: selectedSectionId, theme }));
    }
  };

  const addLink = () =>
    set(`socialLinks.${data.socialLinks.length}`, {
      platform: "github",
      label: "GitHub",
      href: "https://github.com",
      visible: true,
    });

  const removeLink = (index: number) =>
    set(
      "socialLinks",
      data.socialLinks.filter((_, i) => i !== index),
    );

  if (!selectedSection) {
    return (
      <p className="text-sm text-muted-foreground px-4 py-6">
        Select a section to edit.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-5 text-sm">
      {/* ── Theme ─────────────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Theme
        </p>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map(({ value, label, description }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                "flex flex-col gap-0.5 rounded-md border px-3 py-2.5 text-left transition-colors",
                data.theme === value
                  ? "border-foreground bg-muted/60"
                  : "border-border/50 hover:border-border hover:bg-muted/30",
              )}
            >
              <span className="font-medium text-foreground text-xs">
                {label}
              </span>
              <span className="text-[11px] text-muted-foreground leading-snug">
                {description}
              </span>
            </button>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Badge ─────────────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Badge
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label>Show badge</Label>
            <Switch
              checked={data.badgeVisible}
              onCheckedChange={(v) => set("badgeVisible", v)}
            />
          </div>
          {data.badgeVisible && (
            <div className="flex flex-col gap-1.5">
              <Label>Badge text</Label>
              <Input
                value={data.badgeText}
                onChange={(e) => set("badgeText", e.target.value)}
                placeholder="Available for work"
              />
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Content
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label>Heading</Label>
            <Input
              value={data.heading}
              onChange={(e) => set("heading", e.target.value)}
              placeholder="Let's talk"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Subtitle</Label>
            <Input
              value={data.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              placeholder="Short description…"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Scroll indicator</Label>
            <Switch
              checked={data.showScrollIndicator}
              onCheckedChange={(v) => set("showScrollIndicator", v)}
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Colors ────────────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Colors
        </p>
        <div className="flex flex-col gap-3">
          {(
            [
              ["Heading", "colors.heading"],
              ["Subtitle", "colors.subtitle"],
              ["Badge", "colors.badge"],
            ] as [string, string][]
          ).map(([label, path]) => {
            const val = path
              .split(".")
              .reduce((o: any, k) => o?.[k], data) as string;
            return (
              <div key={path} className="flex items-center justify-between">
                <Label>{label}</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={val || "#000000"}
                    onChange={(e) => set(path, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border border-border bg-transparent"
                  />
                  <span className="text-xs text-muted-foreground font-mono w-16">
                    {val || "—"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* ── Form fields ───────────────────────────────────────────────────── */}
      {/* <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Form fields
        </p>
        <div className="flex flex-col gap-3">
          {(
            [
              ["Name field", "form.nameField"],
              ["Email field", "form.emailField"],
              ["Subject field", "form.subjectField"],
              ["Message field", "form.messageField"],
            ] as [string, string][]
          ).map(([title, path]) => {
            const field = path
              .split(".")
              .reduce(
                (o: any, k) => o?.[k],
                data,
              ) as ContactProps["form"]["nameField"];
            return (
              <div
                key={path}
                className="flex flex-col gap-2.5 rounded-md border border-border/60 p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-[13px]">
                    {title}
                  </span>
                  <Switch
                    checked={field.visible}
                    onCheckedChange={(v) => set(`${path}.visible`, v)}
                  />
                </div>
                {field.visible && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-muted-foreground">Label</Label>
                      <Input
                        value={field.label}
                        onChange={(e) => set(`${path}.label`, e.target.value)}
                        placeholder="Field label"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-muted-foreground">
                        Placeholder
                      </Label>
                      <Input
                        value={field.placeholder}
                        onChange={(e) =>
                          set(`${path}.placeholder`, e.target.value)
                        }
                        placeholder="Placeholder text"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-muted-foreground">Required</Label>
                      <Switch
                        checked={field.required}
                        onCheckedChange={(v) => set(`${path}.required`, v)}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Separator /> */}

      {/* ── Submit button ─────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Submit Button
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label>Text</Label>
            <Input
              value={data.form.submitButton.text}
              onChange={(e) => set("form.submitButton.text", e.target.value)}
              placeholder="Send message"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Style</Label>
            <Select
              value={data.form.submitButton.variant}
              onValueChange={(v: any) => set("form.submitButton.variant", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BUTTON_VARIANTS.map((v) => (
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

      {/* ── Alternate button ──────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Alternate Button
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label>Visible</Label>
            <Switch
              checked={data.form.alternateButton.visible}
              onCheckedChange={(v) => set("form.alternateButton.visible", v)}
            />
          </div>
          {data.form.alternateButton.visible && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label>Text</Label>
                <Input
                  value={data.form.alternateButton.text}
                  onChange={(e) =>
                    set("form.alternateButton.text", e.target.value)
                  }
                  placeholder="Email directly instead"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Link</Label>
                <Input
                  value={data.form.alternateButton.href}
                  onChange={(e) =>
                    set("form.alternateButton.href", e.target.value)
                  }
                  placeholder="mailto:..."
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Style</Label>
                <Select
                  value={data.form.alternateButton.variant}
                  onValueChange={(v: any) =>
                    set("form.alternateButton.variant", v)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BUTTON_VARIANTS.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </section>

      <Separator />

      {/* ── Social links ──────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Social Links
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label>Show social row</Label>
            <Switch
              checked={data.socialRowVisible}
              onCheckedChange={(v) => set("socialRowVisible", v)}
            />
          </div>
          {data.socialRowVisible && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label>Row label</Label>
                <Input
                  value={data.socialRowLabel}
                  onChange={(e) => set("socialRowLabel", e.target.value)}
                  placeholder="Or find me on"
                />
              </div>

              <div className="flex flex-col gap-2 mt-1">
                {data.socialLinks.map((link, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 rounded-md border border-border/60 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="capitalize text-xs">
                        {link.platform}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={link.visible}
                          onCheckedChange={(v) =>
                            set(`socialLinks.${i}.visible`, v)
                          }
                        />
                        <button
                          onClick={() => removeLink(i)}
                          className="text-muted-foreground hover:text-destructive transition-colors text-xs"
                          aria-label="Remove link"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-muted-foreground">Platform</Label>
                      <Select
                        value={link.platform}
                        onValueChange={(v: any) =>
                          set(`socialLinks.${i}.platform`, v)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PLATFORMS.map((p) => (
                            <SelectItem
                              key={p}
                              value={p}
                              className="capitalize"
                            >
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-muted-foreground">Label</Label>
                      <Input
                        value={link.label}
                        onChange={(e) =>
                          set(`socialLinks.${i}.label`, e.target.value)
                        }
                        placeholder="GitHub"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-muted-foreground">URL</Label>
                      <Input
                        value={link.href}
                        onChange={(e) =>
                          set(`socialLinks.${i}.href`, e.target.value)
                        }
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={addLink}
                  className="w-full mt-1 text-xs"
                >
                  + Add social link
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
