import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroProps } from "@/store/slices/types";

export default function CenterHeroSection({
  title,
  subtitle,
  colors,
  buttons,
}: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="https://k8boaqmtfy4jtiib.public.blob.vercel-storage.com/stock/heroes-3-1.webp"
        alt=""
      />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-white/30" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-10 bg-white/30" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">
            Welcome
          </span>
          <div className="h-px w-10 bg-white/30" />
        </div>

        {/* Title — uses props.colors.title */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5"
          style={{ color: colors?.title || "#ffffff" }}
        >
          {title}
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center gap-2 mb-5">
          <div className="h-px w-12 bg-white/20" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="h-px w-12 bg-white/20" />
        </div>

        {/* Subtitle — uses props.colors.subtitle */}
        <p
          className="text-lg sm:text-xl font-light leading-relaxed max-w-xl mb-10"
          style={{ color: colors?.subtitle || "#d1d5db" }}
        >
          {subtitle}
        </p>

        {/* Buttons — uses props.buttons.primary / secondary */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {buttons?.primary?.visibility && (
            <Button
              asChild
              variant={buttons.primary.variant}
              size="lg"
              className="rounded-full px-10 h-12 text-sm font-semibold tracking-wide shadow-2xl shadow-black/50 hover:scale-105 transition-all duration-200"
            >
              <a href={buttons.primary.link}>{buttons.primary.text}</a>
            </Button>
          )}
          {buttons?.secondary?.visibility && (
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 h-12 text-sm font-semibold tracking-wide bg-white/10 border border-white/25 text-white backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-200"
            >
              <a
                href={buttons.secondary.link}
                className="flex items-center gap-2"
              >
                {buttons.secondary.text}
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
