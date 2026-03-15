import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian text-ivory/60 relative">
      <div className="container-narrow mx-auto px-5 md:px-8">
        {/* Gold separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />

        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-champagne text-lg font-bold tracking-tight">
                Basava
              </span>
              <span className="text-ivory text-lg font-light tracking-tight">
                Antah Prerna
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ivory/50 max-w-xs">
              Connecting Veerashaiva Lingayat professionals and entrepreneurs.
              Built on the values of Basavanna — equality, community, and
              collective progress.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-ivory/80 text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li>
                <Link
                  href="/#values"
                  className="text-ivory/50 hover:text-champagne text-sm transition-colors no-underline"
                >
                  Our Values
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-ivory/50 hover:text-champagne text-sm transition-colors no-underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-ivory/50 hover:text-champagne text-sm transition-colors no-underline"
                >
                  Explore Businesses
                </Link>
              </li>
              <li>
                <Link
                  href="/get-listed"
                  className="text-ivory/50 hover:text-champagne text-sm transition-colors no-underline"
                >
                  Get Listed
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Preview */}
          <div>
            <h4 className="text-ivory/80 text-sm font-semibold uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 list-none p-0 m-0 text-sm text-ivory/50">
              <li className="flex items-start gap-2">
                <span className="text-champagne/60 mt-0.5">✉</span>
                <span>contact@basavaantahprerna.in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-champagne/60 mt-0.5">☎</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-champagne/60 mt-0.5">⌖</span>
                <span>Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-ivory/5" />
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-ivory/30">
          <p className="m-0">
            © {currentYear} Basava Antah Prerna. All rights reserved.
          </p>
          <p className="m-0 font-drama text-ivory/20">
            &ldquo;Work is worship&rdquo; — Basavanna
          </p>
        </div>
      </div>
    </footer>
  );
}
