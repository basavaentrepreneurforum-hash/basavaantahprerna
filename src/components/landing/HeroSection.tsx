"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const overlay = el.querySelector(".hero-overlay") as HTMLElement;
      if (overlay) {
        overlay.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* Background base */}
      <div className="absolute inset-0 bg-obsidian" />

      {/* Prominent Cinematic Image Background */}
      <div
        className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-60 transition-opacity duration-1000"
      />

      {/* Lighter Gradient Overlays to seamlessly blend the image edges, without hiding it */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/20 to-obsidian" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-obsidian/60" />

      {/* Gold accent glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.15)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.12)_0%,transparent_50%)] pointer-events-none" />

      {/* Subtle cinematic grain texture overlay */}
      <div className="hero-overlay absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-champagne/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-champagne/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto pt-24 md:pt-0">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block w-8 h-px bg-champagne/40" />
          <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-[0.2em] font-data drop-shadow-md">
            Veerashaiva Lingayat Community
          </span>
          <span className="block w-8 h-px bg-champagne/40" />
        </div>

        {/* Hero Headline Background Glow to isolate Text from bright image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(13,13,18,0.85)_0%,rgba(13,13,18,0.4)_40%,transparent_70%)] pointer-events-none -z-10" />

        {/* Hero Headline */}
        <h1 className="text-[#FFFFFF] text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 [text-shadow:0_4px_30px_rgba(0,0,0,0.8),0_2px_10px_rgba(0,0,0,1)]">
          Community meets
          <br />
          <span className="font-drama text-champagne text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_0_15px_rgba(201,168,76,0.4)]">
            Purpose.
          </span>
        </h1>

        {/* Basavanna Quote */}
        <blockquote className="mt-8 mb-10 max-w-xl mx-auto rounded-xl bg-[rgba(13,13,18,0.6)] backdrop-blur-md p-6 border border-[#C9A84C]/20 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
          <p className="font-drama text-[#FAF8F5] text-lg md:text-xl leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
            &ldquo;The rich will make temples for Shiva. What shall I, a poor
            man, do? My legs are pillars, the body the shrine, the head a cupola
            of gold.&rdquo;
          </p>
          <footer className="mt-3 text-champagne/50 text-xs uppercase tracking-[0.15em] font-semibold">
            — Basavanna, 12th Century Social Reformer
          </footer>
        </blockquote>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-sm mx-auto sm:max-w-none">
          <Link
            href="/get-listed"
            className="btn btn-primary w-full sm:w-auto text-sm px-6 py-3.5"
          >
            Get Listed — ₹199
          </Link>
          <Link
            href="/explore"
            className="btn btn-outline w-full sm:w-auto text-sm px-6 py-3.5"
          >
            Explore Businesses
          </Link>
        </div>

        {/* Stats teaser */}
        <div className="mt-12 flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-8 md:gap-12 w-full max-w-md mx-auto sm:max-w-none">
          <div className="text-center w-[40%] sm:w-auto">
            <span className="block text-champagne font-data text-xl md:text-2xl font-bold">500+</span>
            <span className="block text-[#FAF8F5]/60 text-[9px] md:text-xs uppercase tracking-wider mt-1">
              Professionals
            </span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="text-center w-[40%] sm:w-auto">
            <span className="block text-champagne font-data text-xl md:text-2xl font-bold">50+</span>
            <span className="block text-[#FAF8F5]/60 text-[9px] md:text-xs uppercase tracking-wider mt-1">
              Professions
            </span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="w-full sm:hidden h-px bg-white/10 my-1" />
          <div className="text-center w-full sm:w-auto">
            <span className="block text-champagne font-data text-xl md:text-2xl font-bold">1</span>
            <span className="block text-[#FAF8F5]/60 text-[9px] md:text-xs uppercase tracking-wider mt-1">
              Community
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-medium">
          Scroll
        </span>
        <div className="w-5 h-8 border border-ivory/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-champagne/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
