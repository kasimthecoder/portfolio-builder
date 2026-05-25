"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContactProps } from "@/types/contact.types";
import { socialIcon } from "@/components/builder-sections/contact/socialIcon";

export default function WarmContact(props: ContactProps) {
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
      {/* Warm tinted background */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-amber-50/40 dark:bg-amber-950/10">
        <div className="w-full max-w-lg mx-auto px-6 py-20">
          {/* Badge */}
          {badgeVisible && (
            <div className="flex justify-center mb-8">
              <Badge
                variant="secondary"
                className="gap-2 rounded-full px-4 py-1.5 text-xs font-medium bg-amber-100/80 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-0 hover:bg-amber-100"
                style={colors?.badge ? { color: colors.badge } : undefined}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
                </span>
                {badgeText}
              </Badge>
            </div>
          )}

          {/* Heading */}
          <h2
            className="text-center text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-3"
            style={colors?.heading ? { color: colors.heading } : undefined}
          >
            {heading}
          </h2>

          {/* Decorative dots */}
          <div className="flex justify-center gap-1.5 mb-5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full bg-amber-400/60 dark:bg-amber-500/40"
              />
            ))}
          </div>

          <p
            className="text-center text-[15px] leading-relaxed text-muted-foreground mb-10 max-w-sm mx-auto"
            style={colors?.subtitle ? { color: colors.subtitle } : undefined}
          >
            {subtitle}
          </p>

          {/* Form card */}
          <Card className="shadow-sm border border-amber-200/60 dark:border-amber-800/30 bg-background/80 rounded-2xl">
            <CardContent className="p-7 sm:p-9">
              {submitted ? (
                <div className="flex flex-col items-center gap-5 py-10 text-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                    ✓
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground mb-1">
                      Message sent!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Thanks for reaching out. I'll reply within 24 hours.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-foreground"
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
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {form.nameField.visible && (
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="wm-name"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          {form.nameField.label}
                          {form.nameField.required && (
                            <span className="text-amber-500 ml-0.5">*</span>
                          )}
                        </Label>
                        <Input
                          id="wm-name"
                          required={form.nameField.required}
                          placeholder={form.nameField.placeholder}
                          value={fields.name}
                          onChange={(e) =>
                            setFields((s) => ({ ...s, name: e.target.value }))
                          }
                          className="rounded-xl border-border/50 bg-muted/20 focus-visible:ring-amber-300/50 focus-visible:border-amber-300 placeholder:text-muted-foreground/30 dark:focus-visible:ring-amber-700/50"
                        />
                      </div>
                    )}
                    {form.emailField.visible && (
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="wm-email"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          {form.emailField.label}
                          {form.emailField.required && (
                            <span className="text-amber-500 ml-0.5">*</span>
                          )}
                        </Label>
                        <Input
                          id="wm-email"
                          type="email"
                          required={form.emailField.required}
                          placeholder={form.emailField.placeholder}
                          value={fields.email}
                          onChange={(e) =>
                            setFields((s) => ({ ...s, email: e.target.value }))
                          }
                          className="rounded-xl border-border/50 bg-muted/20 focus-visible:ring-amber-300/50 focus-visible:border-amber-300 placeholder:text-muted-foreground/30 dark:focus-visible:ring-amber-700/50"
                        />
                      </div>
                    )}
                  </div>

                  {form.subjectField.visible && (
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="wm-subject"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        {form.subjectField.label}
                        {form.subjectField.required && (
                          <span className="text-amber-500 ml-0.5">*</span>
                        )}
                      </Label>
                      <Input
                        id="wm-subject"
                        required={form.subjectField.required}
                        placeholder={form.subjectField.placeholder}
                        value={fields.subject}
                        onChange={(e) =>
                          setFields((s) => ({ ...s, subject: e.target.value }))
                        }
                        className="rounded-xl border-border/50 bg-muted/20 focus-visible:ring-amber-300/50 focus-visible:border-amber-300 placeholder:text-muted-foreground/30 dark:focus-visible:ring-amber-700/50"
                      />
                    </div>
                  )}

                  {form.messageField.visible && (
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="wm-message"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        {form.messageField.label}
                        {form.messageField.required && (
                          <span className="text-amber-500 ml-0.5">*</span>
                        )}
                      </Label>
                      <Textarea
                        id="wm-message"
                        required={form.messageField.required}
                        placeholder={form.messageField.placeholder}
                        rows={5}
                        value={fields.message}
                        onChange={(e) =>
                          setFields((s) => ({ ...s, message: e.target.value }))
                        }
                        className="resize-none rounded-xl border-border/50 bg-muted/20 focus-visible:ring-amber-300/50 focus-visible:border-amber-300 placeholder:text-muted-foreground/30 dark:focus-visible:ring-amber-700/50"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Button
                      type="submit"
                      variant={form.submitButton.variant}
                      disabled={loading}
                      className="rounded-xl px-6 flex-1 sm:flex-none"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-3.5 w-3.5 rounded-full border-2 border-background border-t-transparent animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        form.submitButton.text
                      )}
                    </Button>
                    {form.alternateButton.visible && (
                      <Button
                        type="button"
                        variant={form.alternateButton.variant}
                        asChild
                        className="rounded-xl text-sm flex-1 sm:flex-none"
                      >
                        <a href={form.alternateButton.href}>
                          {form.alternateButton.text}
                        </a>
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Social links */}
          {socialRowVisible && socialLinks.some((l) => l.visible) && (
            <div className="mt-10 flex flex-col items-center gap-4">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground/50">
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
                          className="h-9 w-9 rounded-full text-muted-foreground/50 hover:text-foreground hover:bg-amber-100/50 dark:hover:bg-amber-900/20"
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
