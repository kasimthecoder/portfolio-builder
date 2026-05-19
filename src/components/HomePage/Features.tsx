import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MousePointerClick, Zap, Sparkles } from "lucide-react";

const Features = () => {
  return (
    <section className="relative w-full py-24 flex flex-col items-center justify-center bg-background">
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
          Features
        </Badge>

        <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-4 text-foreground">
          Everything you need,{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            nothing you don't
          </span>
        </h2>

        <Separator className="my-5 w-10 mx-auto bg-foreground/20" />

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
          Build your portfolio in minutes with these powerful tools
        </p>

        <div className="grid md:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-muted/50 p-4 mb-4">
              <MousePointerClick className="h-8 w-8 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Drag & drop</h3>
            <p className="text-muted-foreground">
              No code. Just click and customize.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-muted/50 p-4 mb-4">
              <Zap className="h-8 w-8 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Launch fast</h3>
            <p className="text-muted-foreground">
              From zero to live in minutes.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-muted/50 p-4 mb-4">
              <Sparkles className="h-8 w-8 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI powered</h3>
            <p className="text-muted-foreground mb-3">
              Smarter features on the way.
            </p>
            <Badge variant="outline" className="text-xs">
              Coming soon
            </Badge>
          </div>
        </div>
      </div>

      <Separator className="absolute bottom-0 inset-x-0" />
    </section>
  );
};

export default Features;
