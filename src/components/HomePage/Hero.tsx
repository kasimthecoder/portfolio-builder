"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function HomeHeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background pt-20">
      <Separator className="absolute top-0 inset-x-0" />

      <div className="flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
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

        <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-4 text-foreground">
          Build a stunning{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            portfolio
          </span>
          . Without writing a single line of{" "}
          <span className="bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
            code
          </span>
          .
        </h1>

        <Separator className="my-5 w-10 mx-auto bg-foreground/20" />

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Drag, drop, and customize from{" "}
          <span className="font-semibold text-foreground">
            ready‑to‑use components
          </span>
          . Launch your professional portfolio in{" "}
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-semibold">
            minutes — not weeks
          </span>
          .{" "}
          <span className="inline-flex items-center gap-1">
            AI‑powered features are{" "}
            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm rounded-full font-medium">
              coming soon
            </span>
          </span>
          .
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <button>✨ Start now — it's free</button>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="transition-all duration-300"
          >
            <button>▶ Watch demo</button>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          No credit card required • Free forever plan
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity duration-300">
        <div className="w-px h-7 bg-foreground/40 animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
          scroll
        </span>
      </div>

      <Separator className="absolute bottom-0 inset-x-0" />
    </section>
  );
}
