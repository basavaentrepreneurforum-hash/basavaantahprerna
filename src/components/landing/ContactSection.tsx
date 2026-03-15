"use client";

import { useEffect, useRef } from "react";

export default function ContactSection() {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-ivory relative overflow-hidden"
    >
      <div className="container-narrow mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 animate-on-scroll">
          <span className="text-champagne text-xs font-semibold uppercase tracking-[0.2em] font-data">
            Get in Touch
          </span>
          <h2 className="text-slate text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            We&apos;d Love to
            <br />
            <span className="font-drama text-champagne">Hear From You.</span>
          </h2>
          <hr className="gold-line gold-line-center mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Details */}
          <div className="animate-on-scroll space-y-6">
            {/* Phone */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center flex-shrink-0 group-hover:bg-champagne/20 transition-colors">
                <span className="text-champagne text-lg">☎</span>
              </div>
              <div>
                <h4 className="text-slate text-sm font-semibold mb-0.5">
                  Phone
                </h4>
                <a
                  href="tel:+919876543210"
                  className="text-slate-muted text-sm no-underline hover:text-champagne transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center flex-shrink-0 group-hover:bg-champagne/20 transition-colors">
                <span className="text-champagne text-lg">✉</span>
              </div>
              <div>
                <h4 className="text-slate text-sm font-semibold mb-0.5">
                  Email
                </h4>
                <a
                  href="mailto:contact@basavaantahprerna.in"
                  className="text-slate-muted text-sm no-underline hover:text-champagne transition-colors"
                >
                  contact@basavaantahprerna.in
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center flex-shrink-0 group-hover:bg-champagne/20 transition-colors">
                <span className="text-champagne text-lg">📍</span>
              </div>
              <div>
                <h4 className="text-slate text-sm font-semibold mb-0.5">
                  Address
                </h4>
                <p className="text-slate-muted text-sm m-0 leading-relaxed">
                  123, Community Center Road,
                  <br />
                  Basavanagudi, Bengaluru,
                  <br />
                  Karnataka 560004, India
                </p>
              </div>
            </div>

            {/* Working hours */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center flex-shrink-0 group-hover:bg-champagne/20 transition-colors">
                <span className="text-champagne text-lg">🕐</span>
              </div>
              <div>
                <h4 className="text-slate text-sm font-semibold mb-0.5">
                  Hours
                </h4>
                <p className="text-slate-muted text-sm m-0">
                  Mon – Sat: 9:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="animate-on-scroll">
            <div className="rounded-xl overflow-hidden border border-slate/[0.06] shadow-sm h-72 md:h-full min-h-[280px]">
              <iframe
                title="Basava Antah Prerna Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5959!2d77.5696!3d12.9416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzI5LjgiTiA3N8KwMzQnMTAuNiJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
