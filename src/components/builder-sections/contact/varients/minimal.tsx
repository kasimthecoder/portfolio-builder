"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContactProps } from "@/types/contact.types";
import { socialIcon } from "@/components/builder-sections/contact/socialIcon";

export default function MinimalContact(props: ContactProps) {
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
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="w-full max-w-xl mx-auto px-6 py-24">
          {/* Badge — plain text, no pill */}
          {badgeVisible && (
            <p
              className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-12 flex items-center gap-2"
              style={colors?.badge ? { color: colors.badge } : undefined}
            >
              <span className="relative flex h-1 w-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-600" />
              </span>
              {badgeText}
            </p>
          )}

          {/* Heading — large, light weight */}
          <h2
            className="text-[clamp(2.5rem,8vw,5rem)] font-extralight tracking-tight leading-none mb-6 text-foreground"
            style={colors?.heading ? { color: colors.heading } : undefined}
          >
            {heading}
          </h2>

          <p
            className="text-sm leading-relaxed text-muted-foreground mb-16 max-w-sm"
            style={colors?.subtitle ? { color: colors.subtitle } : undefined}
          >
            {subtitle}
          </p>

          {/* Hairline rule */}
          <div className="w-full h-px bg-border/40 mb-16" />

          {submitted ? (
            <div className="flex flex-col gap-4">
              <p className="text-4xl font-extralight text-foreground">
                Received.
              </p>
              <p className="text-sm text-muted-foreground">
                I'll be in touch soon.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFields({ name: "", email: "", subject: "", message: "" });
                }}
                className="self-start text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 hover:text-foreground transition-colors mt-2"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Inline label + input rows */}
              {form.nameField.visible && (
                <div className="flex items-baseline gap-4 border-b border-border/30 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 w-20 shrink-0">
                    {form.nameField.label}
                  </span>
                  <Input
                    required={form.nameField.required}
                    placeholder={form.nameField.placeholder}
                    value={fields.name}
                    onChange={(e) =>
                      setFields((s) => ({ ...s, name: e.target.value }))
                    }
                    className="border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0 placeholder:text-muted-foreground/25 rounded-none"
                  />
                </div>
              )}
              {form.emailField.visible && (
                <div className="flex items-baseline gap-4 border-b border-border/30 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 w-20 shrink-0">
                    {form.emailField.label}
                  </span>
                  <Input
                    type="email"
                    required={form.emailField.required}
                    placeholder={form.emailField.placeholder}
                    value={fields.email}
                    onChange={(e) =>
                      setFields((s) => ({ ...s, email: e.target.value }))
                    }
                    className="border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0 placeholder:text-muted-foreground/25 rounded-none"
                  />
                </div>
              )}
              {form.subjectField.visible && (
                <div className="flex items-baseline gap-4 border-b border-border/30 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 w-20 shrink-0">
                    {form.subjectField.label}
                  </span>
                  <Input
                    required={form.subjectField.required}
                    placeholder={form.subjectField.placeholder}
                    value={fields.subject}
                    onChange={(e) =>
                      setFields((s) => ({ ...s, subject: e.target.value }))
                    }
                    className="border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0 placeholder:text-muted-foreground/25 rounded-none"
                  />
                </div>
              )}
              {form.messageField.visible && (
                <div className="flex gap-4 border-b border-border/30 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 w-20 shrink-0 pt-1">
                    {form.messageField.label}
                  </span>
                  <Textarea
                    required={form.messageField.required}
                    placeholder={form.messageField.placeholder}
                    rows={4}
                    value={fields.message}
                    onChange={(e) =>
                      setFields((s) => ({ ...s, message: e.target.value }))
                    }
                    className="resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0 placeholder:text-muted-foreground/25 rounded-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-[10px] uppercase tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors disabled:opacity-40"
                >
                  {loading ? "Sending…" : `${form.submitButton.text} →`}
                </button>
                {form.alternateButton.visible && (
                  <a
                    href={form.alternateButton.href}
                    className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                  >
                    {form.alternateButton.text}
                  </a>
                )}
              </div>
            </form>
          )}

          {/* Social links */}
          {socialRowVisible && socialLinks.some((l) => l.visible) && (
            <div className="mt-20 flex flex-col gap-5">
              <div className="w-full h-px bg-border/40" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
                {socialRowLabel}
              </p>
              <div className="flex items-center gap-1">
                {socialLinks
                  .filter((l) => l.visible)
                  .map((link) => (
                    <Tooltip key={link.href}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 rounded-none text-muted-foreground/40 hover:text-foreground hover:bg-transparent"
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

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <div className="w-px h-7 bg-foreground/20 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-foreground/30 font-medium">
              scroll
            </span>
          </div>
        )}
      </section>
    </TooltipProvider>
  );
}
