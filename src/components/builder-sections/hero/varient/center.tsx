"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HeroProps } from "@/types/hero.types";

export default function CenterHeroSection({
  title,
  subtitle,
  colors,
  buttons,
}: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background">
      <Separator className="absolute top-0 inset-x-0" />

      <div className="flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        <Badge
          variant="secondary"
          className="mb-8 gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest bg-muted/50 hover:bg-muted/70"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
          </span>
          Welcome
        </Badge>

        <h1
          className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] mb-4 text-foreground"
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: colors?.title,
          }}
        >
          {title}
        </h1>

        <Separator className="my-5 w-10 mx-auto bg-foreground/20" />

        <p
          className="text-[15px] leading-relaxed max-w-md font-light mb-8 text-muted-foreground"
          style={{ color: colors?.subtitle }}
        >
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {buttons?.primary?.visibility && (
            <Button
              asChild
              variant={buttons.primary.variant || "default"}
              size="default"
            >
              <a href={buttons.primary.link}>{buttons.primary.text}</a>
            </Button>
          )}
          {buttons?.secondary?.visibility && (
            <Button
              asChild
              variant={buttons.secondary.variant || "outline"}
              size="default"
            >
              <a href={buttons.secondary.link}>{buttons.secondary.text}</a>
            </Button>
          )}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-px h-7 bg-foreground/30 animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-medium">
          scroll
        </span>
      </div>

      <Separator className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
