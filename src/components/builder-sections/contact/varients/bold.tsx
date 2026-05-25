"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContactProps } from "@/types/contact.types";
import { socialIcon } from "@/components/builder-sections/contact/socialIcon";

export default function BoldContact(props: ContactProps) {
  const {
    badgeVisible,
    badgeText,
    heading,
    subtitle,
    showScrollIndicator,
    colors,
    form,
    socialLinks,
    socialRowVisible,
    socialRowLabel,
  } = props;

  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <TooltipProvider>
      <section className="relative w-full min-h-screen flex flex-col bg-foreground text-background">
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />

        <div className="flex flex-col lg:flex-row flex-1 min-h-screen">
          {/* Left panel — heading */}
          <div className="flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-20 lg:w-[45%] lg:border-r border-background/10">
            {badgeVisible && (
              <Badge
                className="self-start mb-8 gap-2 rounded-none px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-background/10 text-background hover:bg-background/15 border-0"
                style={colors?.badge ? { color: colors.badge } : undefined}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                {badgeText}
              </Badge>
            )}

            <h2
              className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8"
              style={colors?.heading ? { color: colors.heading } : undefined}
            >
              {heading}
            </h2>

            <p
              className="text-base leading-relaxed max-w-sm font-light text-background/60"
              style={colors?.subtitle ? { color: colors.subtitle } : undefined}
            >
              {subtitle}
            </p>

            {/* Social links */}
            {socialRowVisible && socialLinks.some((l) => l.visible) && (
              <div className="mt-12 flex flex-col gap-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-background/40 font-bold">
                  {socialRowLabel}
                </p>
                <div className="flex items-center gap-2">
                  {socialLinks
                    .filter((l) => l.visible)
                    .map((link) => (
                      <Tooltip key={link.href}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="h-9 w-9 rounded-none text-background/50 hover:text-background hover:bg-background/10"
                          >
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={link.label}
                            >
                              {socialIcon(link.platform)}
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p className="text-xs">{link.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Right panel — form */}
          <div className="flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-20 lg:flex-1">
            {submitted ? (
              <div className="flex flex-col gap-6">
                <span className="text-6xl font-black uppercase tracking-tighter text-background/20 select-none">
                  ✓
                </span>
                <p className="text-4xl font-black uppercase tracking-tighter text-background leading-tight">
                  Got it.
                </p>
                <p className="text-background/50 text-sm">
                  Thanks for reaching out. I'll be in touch soon.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="self-start rounded-none border-background/30 text-background hover:bg-background/10 text-xs uppercase tracking-widest"
                  onClick={() => {
                    setSubmitted(false);
                    setFields({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-md w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {form.nameField.visible && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="bd-name"
                        className="text-[10px] uppercase tracking-[0.15em] text-background/40 font-bold"
                      >
                        {form.nameField.label}
                      </Label>
                      <Input
                        id="bd-name"
                        required={form.nameField.required}
                        placeholder={form.nameField.placeholder}
                        value={fields.name}
                        onChange={(e) =>
                          setFields((s) => ({ ...s, name: e.target.value }))
                        }
                        className="rounded-none border-0 border-b border-background/20 bg-transparent text-background placeholder:text-background/25 focus-visible:ring-0 focus-visible:border-background/60 px-0 transition-colors"
                      />
                    </div>
                  )}
                  {form.emailField.visible && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="bd-email"
                        className="text-[10px] uppercase tracking-[0.15em] text-background/40 font-bold"
                      >
                        {form.emailField.label}
                      </Label>
                      <Input
                        id="bd-email"
                        type="email"
                        required={form.emailField.required}
                        placeholder={form.emailField.placeholder}
                        value={fields.email}
                        onChange={(e) =>
                          setFields((s) => ({ ...s, email: e.target.value }))
                        }
                        className="rounded-none border-0 border-b border-background/20 bg-transparent text-background placeholder:text-background/25 focus-visible:ring-0 focus-visible:border-background/60 px-0 transition-colors"
                      />
                    </div>
                  )}
                </div>

                {form.subjectField.visible && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="bd-subject"
                      className="text-[10px] uppercase tracking-[0.15em] text-background/40 font-bold"
                    >
                      {form.subjectField.label}
                    </Label>
                    <Input
                      id="bd-subject"
                      required={form.subjectField.required}
                      placeholder={form.subjectField.placeholder}
                      value={fields.subject}
                      onChange={(e) =>
                        setFields((s) => ({ ...s, subject: e.target.value }))
                      }
                      className="rounded-none border-0 border-b border-background/20 bg-transparent text-background placeholder:text-background/25 focus-visible:ring-0 focus-visible:border-background/60 px-0 transition-colors"
                    />
                  </div>
                )}

                {form.messageField.visible && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="bd-message"
                      className="text-[10px] uppercase tracking-[0.15em] text-background/40 font-bold"
                    >
                      {form.messageField.label}
                    </Label>
                    <Textarea
                      id="bd-message"
                      required={form.messageField.required}
                      placeholder={form.messageField.placeholder}
                      rows={5}
                      value={fields.message}
                      onChange={(e) =>
                        setFields((s) => ({ ...s, message: e.target.value }))
                      }
                      className="resize-none rounded-none border-0 border-b border-background/20 bg-transparent text-background placeholder:text-background/25 focus-visible:ring-0 focus-visible:border-background/60 px-0 transition-colors"
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-none bg-background text-foreground hover:bg-background/90 font-bold uppercase tracking-widest text-xs px-8 h-11"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      form.submitButton.text
                    )}
                  </Button>
                  {form.alternateButton.visible && (
                    <a
                      href={form.alternateButton.href}
                      className="text-xs uppercase tracking-widest text-background/40 hover:text-background transition-colors"
                    >
                      {form.alternateButton.text}
                    </a>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <div className="w-px h-7 bg-background/20 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-background/30 font-medium">
              scroll
            </span>
          </div>
        )}
      </section>
    </TooltipProvider>
  );
}
