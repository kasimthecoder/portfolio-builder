"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CTASection = () => {
  return (
    <section className="relative w-full py-24 flex flex-col items-center justify-center bg-background">
      <Separator className="absolute top-0 inset-x-0" />

      <div className="flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <Badge
          variant="secondary"
          className="mb-8 gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest bg-muted/50 hover:bg-muted/70"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
          </span>
          Join 5,000+ Creators
        </Badge>

        <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-4 text-foreground">
          Start building your{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            portfolio
          </span>
        </h2>

        <Separator className="my-5 w-10 mx-auto bg-foreground/20" />

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          No code. No complexity. Just beautiful portfolios in minutes.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Button
            asChild
            size="lg"
            className="shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <button>Start now — it's free</button>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="transition-all duration-300"
          >
            <button>Watch demo</button>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>No credit card</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>AI coming soon</span>
          </div>
        </div>
      </div>

      <Separator className="absolute bottom-0 inset-x-0" />
    </section>
  );
};

export default CTASection;
