"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const ScreenshotSection = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imageSrc, setImageSrc] = useState("/screenshot-light.png");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setImageSrc(
        resolvedTheme === "dark"
          ? "/screenshot-dark.png"
          : "/screenshot-light.png",
      );
    }
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  return (
    <section
      id="screenshot"
      className="relative w-full py-24 flex flex-col items-center justify-center bg-background"
    >
      <Separator className="absolute top-0 inset-x-0" />

      <div className="flex flex-col items-center text-center px-6 max-w-6xl mx-auto">
        <Badge
          variant="secondary"
          className="mb-8 gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest bg-muted/50 hover:bg-muted/70"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
          </span>
          Preview
        </Badge>

        <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-4 text-foreground">
          See it in{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            action
          </span>
        </h2>

        <Separator className="my-5 w-10 mx-auto bg-foreground/20" />

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
          Drag, drop, and publish. No code required.
        </p>

        <Card className="w-full overflow-hidden shadow-2xl border-border">
          <CardContent className="p-0">
            <img
              key={imageSrc}
              src={imageSrc}
              alt="Portfolio builder editor interface"
              className="w-full h-auto transition-opacity duration-300"
            />
          </CardContent>
        </Card>
      </div>

      <Separator className="absolute bottom-0 inset-x-0" />
    </section>
  );
};

export default ScreenshotSection;
