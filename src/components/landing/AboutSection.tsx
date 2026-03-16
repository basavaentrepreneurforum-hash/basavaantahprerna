"use client";

import { useEffect, useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-obsidian relative overflow-hidden"
    >
      {/* Isolate Background Layers to fix z-index/mix-blend rendering bugs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Accent gradients */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne/15 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.03)_0%,transparent_60%)]" />

        {/* Centered Philosopher Background Image */}
        {/* <div 
          className="absolute inset-0 w-full h-full opacity-15 mix-blend-screen bg-[url('/images/philosopher.jpg')] bg-contain bg-center bg-no-repeat"
        /> */}

        {/* Blending gradients to fade the top and bottom effectively */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-obsidian" />
      </div>

      <div className="container-narrow mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 animate-on-scroll">
            <span className="text-champagne/60 text-xs font-semibold uppercase tracking-[0.2em] font-data">
              About Us
            </span>
            <h2 className="text-ivory text-3xl md:text-4xl font-bold mt-3 tracking-tight">
              A Bridge Between
              <br />
              <span className="font-drama text-champagne">
                Tradition & Enterprise.
              </span>
            </h2>
            <hr className="gold-line gold-line-center mt-5" />
          </div>

          {/* Content */}
          <div className="space-y-6 animate-on-scroll">
            <p className="text-ivory/60 text-base md:text-lg leading-relaxed text-center">
              Basava Antah Prerna is born from a simple yet powerful idea — when
              community members support each other&apos;s businesses, everyone
              prospers. Inspired by the teachings of Jagajyoti Basavanna, who
              championed equality and the dignity of work, we&apos;ve created a
              platform where Veerashaiva Lingayat professionals can showcase
              their expertise and connect with those who need their services.
            </p>

            <p className="text-ivory/50 text-base leading-relaxed text-center">
              Whether you&apos;re a lawyer in Dharwad, a saree artisan in
              Ilkal, a doctor in Bengaluru, or an engineer in Hubballi — this is
              your space. We verify every listing to ensure quality and trust,
              because our community deserves nothing less.
            </p>

            <p className="text-ivory/50 text-base leading-relaxed text-center">
              This platform is not just a directory. It&apos;s a movement — a
              digital manifestation of Basavanna&apos;s Anubhava Mantapa, where
              every professional has a voice and every skill is honoured.
            </p>
          </div>

          {/* Basavanna quote card */}
          <div className="animate-on-scroll mt-12 bg-obsidian-lighter/50 border border-champagne/10 rounded-xl p-6 md:p-8 text-center">
            <blockquote>
              <p className="font-drama text-champagne/70 text-lg md:text-xl leading-relaxed">
                &ldquo;Kayakave Kailasa&rdquo;
              </p>
              <p className="text-ivory/40 text-sm mt-2 italic">
                Work itself is heaven — the path to the divine is through honest
                labour and service.
              </p>
              <footer className="mt-4 text-champagne/40 text-xs uppercase tracking-[0.15em] font-semibold">
                — Basavanna
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
