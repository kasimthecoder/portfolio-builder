"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { sendEmail } from "@/app/actions/portfolio";

export default function EditorialContact(props: ContactProps) {
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
    userId,
  } = props;

  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendEmail({
        userId: userId || "",
        visitorName: fields.name,
        visitorEmail: fields.email,
        visitorMessage: fields.message,
      });

      setSubmitted(true);
      setFields({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
    }
  };
  return (
    <TooltipProvider>
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background">
        <Separator className="absolute top-0 inset-x-0" />

        <div className="flex flex-col items-center text-center px-6 w-full max-w-2xl mx-auto py-20">
          {/* Badge */}
          {badgeVisible && (
            <Badge
              variant="secondary"
              className="mb-8 gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest bg-muted/50 hover:bg-muted/70"
              style={colors?.badge ? { color: colors.badge } : undefined}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
              </span>
              {badgeText}
            </Badge>
          )}

          {/* Heading */}
          <h2
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] mb-4 text-foreground"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              ...(colors?.heading ? { color: colors.heading } : {}),
            }}
          >
            {heading}
          </h2>

          <Separator className="my-5 w-10 mx-auto bg-foreground/20" />

          <p
            className="text-[15px] leading-relaxed max-w-md font-light mb-10 text-muted-foreground"
            style={colors?.subtitle ? { color: colors.subtitle } : undefined}
          >
            {subtitle}
          </p>

          {/* Form */}
          <Card className="w-full text-left shadow-none border border-border/60 bg-background">
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <span className="text-4xl select-none">✦</span>
                  <p
                    className="text-2xl font-normal text-foreground"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    Message received
                  </p>
                  <Separator className="w-8 mx-auto bg-foreground/20" />
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Thanks for reaching out. I'll be in touch soon.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs uppercase tracking-widest"
                    onClick={() => {
                      setSubmitted(false);
                      setFields({
                        name: "",
                        email: "",
                        message: "",
                      });
                    }}
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {form.nameField.visible && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="ed-name"
                          className="text-xs uppercase tracking-widest text-muted-foreground"
                        >
                          {form.nameField.label}
                        </Label>
                        <Input
                          id="ed-name"
                          required={form.nameField.required}
                          placeholder={form.nameField.placeholder}
                          value={fields.name}
                          onChange={(e) =>
                            setFields((s) => ({ ...s, name: e.target.value }))
                          }
                          className="bg-muted/30 border-border/50 focus-visible:ring-1 focus-visible:ring-foreground/30 placeholder:text-muted-foreground/40"
                        />
                      </div>
                    )}
                    {form.emailField.visible && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="ed-email"
                          className="text-xs uppercase tracking-widest text-muted-foreground"
                        >
                          {form.emailField.label}
                        </Label>
                        <Input
                          id="ed-email"
                          type="email"
                          required={form.emailField.required}
                          placeholder={form.emailField.placeholder}
                          value={fields.email}
                          onChange={(e) =>
                            setFields((s) => ({ ...s, email: e.target.value }))
                          }
                          className="bg-muted/30 border-border/50 focus-visible:ring-1 focus-visible:ring-foreground/30 placeholder:text-muted-foreground/40"
                        />
                      </div>
                    )}
                  </div>

                  {form.messageField.visible && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="ed-message"
                        className="text-xs uppercase tracking-widest text-muted-foreground"
                      >
                        {form.messageField.label}
                      </Label>
                      <Textarea
                        id="ed-message"
                        required={form.messageField.required}
                        placeholder={form.messageField.placeholder}
                        rows={5}
                        value={fields.message}
                        onChange={(e) =>
                          setFields((s) => ({ ...s, message: e.target.value }))
                        }
                        className="resize-none bg-muted/30 border-border/50 focus-visible:ring-1 focus-visible:ring-foreground/30 placeholder:text-muted-foreground/40"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <Button
                      type="submit"
                      variant={form.submitButton.variant}
                      disabled={loading}
                      className="min-w-35"
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
                        className="text-sm"
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
              <Separator className="w-10 mx-auto bg-foreground/20" />
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground/60">
                {socialRowLabel}
              </p>
              <div className="flex items-center gap-3">
                {socialLinks
                  .filter((l) => l.visible)
                  .map((link) => (
                    <Tooltip key={link.href}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
            <div className="w-px h-7 bg-foreground/30 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-medium">
              scroll
            </span>
          </div>
        )}

        <Separator className="absolute bottom-0 inset-x-0" />
      </section>
    </TooltipProvider>
  );
}
