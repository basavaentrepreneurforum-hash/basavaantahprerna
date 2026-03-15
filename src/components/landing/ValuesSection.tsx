"use client";

import { useEffect, useRef } from "react";

const values = [
  {
    icon: "🛡️",
    title: "Verified Contacts",
    description:
      "Every business listing is manually reviewed and verified before being published. We ensure authenticity so you connect with real professionals you can trust.",
  },
  {
    icon: "🤝",
    title: "Community First",
    description:
      "Rooted in Basavanna's vision of collective progress. When one entrepreneur grows, the entire community grows with them. Support local, support your own.",
  },
  {
    icon: "⚖️",
    title: "Ethics & Genuinity",
    description:
      "We stand for transparent dealings and honest representation. No inflated claims, no false promises — just genuine professionals offering genuine services.",
  },
  {
    icon: "📈",
    title: "Business Growth",
    description:
      "Get discovered by thousands of community members actively looking for services. Your ₹199 listing opens doors to a dedicated network of like-minded people.",
  },
];

export default function ValuesSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = cardsRef.current?.querySelectorAll(".animate-on-scroll");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="values"
      className="section-padding bg-ivory relative overflow-hidden"
    >
      {/* Subtle bg accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

      <div className="container-narrow mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-champagne text-xs font-semibold uppercase tracking-[0.2em] font-data">
            Why Choose Us
          </span>
          <h2 className="text-slate text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            Built on Values That<br className="hidden sm:block" />
            <span className="font-drama text-champagne"> Matter.</span>
          </h2>
          <hr className="gold-line gold-line-center mt-5" />
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto"
        >
          {values.map((value, i) => (
            <div
              key={i}
              className="animate-on-scroll group bg-white rounded-xl p-6 md:p-7 border border-slate/[0.04] hover:border-champagne/20 transition-all duration-300 hover:shadow-lg"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-slate text-lg font-bold tracking-tight mb-2">
                {value.title}
              </h3>
              <p className="text-slate-muted text-sm leading-relaxed m-0">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
