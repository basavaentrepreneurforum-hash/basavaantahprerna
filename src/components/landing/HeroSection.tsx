"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stats, setStats] = useState<{
    professionals: number;
    professions: number;
    communities: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch(() => { });
  }, []);

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
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* Background base */}
      <div className="absolute inset-0 bg-obsidian" />

      {/* Prominent Cinematic Image Background */}
      <div
        className="absolute inset-0 bg-[url('/images/hero-bg-mobile.jpg')] md:bg-[url('/images/hero-bg.jpg')] bg-cover bg-center md:bg-[50%_45%] bg-no-repeat opacity-60 transition-opacity duration-1000"
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
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto pt-24 md:pt-0 w-full">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block w-8 h-px bg-champagne/40" />
          <span className="text-[#C9A84C] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] font-data drop-shadow-md">
            Hindu Veerashaiva Lingayat Entrepreneur Forum
          </span>
          <span className="block w-8 h-px bg-champagne/40" />
        </div>

        {/* Hero Headline Background Glow to isolate Text from bright image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(13,13,18,0.85)_0%,rgba(13,13,18,0.4)_40%,transparent_70%)] pointer-events-none -z-10" />

        {/* Philosopher Images */}
        <div className="mt-8 md:mt-4 flex items-center justify-center mb-6">
          <div className="flex gap-4 sm:gap-6 md:gap-8 items-end">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-obsidian/80 ring-2 ring-champagne/30 overflow-hidden shadow-[0_0_20px_rgba(201,168,76,0.3)] relative z-10 transition-transform duration-500 hover:scale-110 hover:z-40 mx-auto">
              <img src="/images/philosopher1.jpg" alt="Philosopher 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-[3px] border-obsidian/80 ring-2 ring-champagne/40 overflow-hidden shadow-[0_0_30px_rgba(201,168,76,0.4)] relative z-30 -translate-y-2 transition-transform duration-500 hover:scale-110 hover:z-40 mx-auto">
              <img src="/images/philosopher2.jpg" alt="Philosopher 2" className="w-full h-full object-center object-cover" />
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] border-obsidian/80 ring-2 ring-champagne/30 overflow-hidden shadow-[0_0_20px_rgba(201,168,76,0.3)] relative z-20 transition-transform duration-500 hover:scale-110 hover:z-40 mx-auto">
              <img src="/images/philosopher3.jpg" alt="Philosopher 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Basavanna Quote */}
        <blockquote className="max-w-xl mx-auto rounded-xl bg-white/[0.03] backdrop-blur-xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <p className="font-drama text-[#FAF8F5] text-lg md:text-xl leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
            &ldquo;Working hands are better than praying lips.<br />
            Kudala Sangamadeva.&rdquo;
          </p>
          <footer className="mt-3 text-champagne/50 text-xs uppercase tracking-[0.15em] font-semibold">
            — Basavanna
          </footer>
        </blockquote>

        {/* CTAs */}
        <div className="mt-[100px] md:mt-10 mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-sm mx-auto sm:max-w-none">
          {/* Mobile: transparent outline */}
          <div className="w-full sm:w-auto md:hidden">
            <Link
              href="/get-listed"
              className="btn btn-outline w-full text-sm px-6 py-3.5"
            >
              Get Listed — ₹199
            </Link>
          </div>
          {/* Desktop: golden primary */}
          <div className="w-full sm:w-auto hidden md:block">
            <Link
              href="/get-listed"
              className="btn btn-primary w-full text-sm px-6 py-3.5"
            >
              Get Listed — ₹199
            </Link>
          </div>
          <Link
            href="/explore"
            className="btn btn-outline w-full sm:w-auto text-sm px-6 py-3.5"
          >
            Explore Businesses
          </Link>
        </div>

        {/* Distinct Family Counselling Callout */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/get-listed?profession=Family+Counselling"
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-champagne/30 hover:bg-champagne/5 transition-all duration-500 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-champagne/10 text-champagne border border-champagne/20 group-hover:scale-110 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
            </div>
            <span className="relative text-sm font-medium text-white/80 group-hover:text-champagne transition-colors duration-300">
              Offer Family Counselling
            </span>
            <span className="relative text-champagne/50 group-hover:text-champagne group-hover:translate-x-1 transition-all duration-300">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Stats teaser */}
        <div className="mt-12 flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-8 md:gap-12 w-full max-w-md mx-auto sm:max-w-none">
          <div className="text-center w-[40%] sm:w-auto">
            <span className="block text-champagne font-data text-xl md:text-2xl font-bold">
              {stats ? `${stats.professionals}+` : "—"}
            </span>
            <span className="block text-[#FAF8F5]/60 text-[9px] md:text-xs uppercase tracking-wider mt-1">
              Professionals
            </span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="text-center w-[40%] sm:w-auto">
            <span className="block text-champagne font-data text-xl md:text-2xl font-bold">
              {stats ? `${stats.professions}+` : "—"}
            </span>
            <span className="block text-[#FAF8F5]/60 text-[9px] md:text-xs uppercase tracking-wider mt-1">
              Professions
            </span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="w-full sm:hidden h-px bg-white/10 my-1" />
          <div className="text-center w-full sm:w-auto">
            <span className="block text-champagne font-data text-xl md:text-2xl font-bold">
              {stats ? stats.communities : "—"}
            </span>
            <span className="block text-[#FAF8F5]/60 text-[9px] md:text-xs uppercase tracking-wider mt-1">
              Community
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50">
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
