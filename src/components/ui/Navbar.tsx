"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isHome = pathname === "/";
  const shouldHaveBg = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = () => setProfileOpen(false);
    if (profileOpen) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [profileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        scrolled ? "pt-4 px-4 sm:px-6" : "pt-0 px-0"
      }`}
    >
      <div
        className={`w-full transition-all duration-500 relative ${
          isOpen ? "z-[100]" : "z-10"
        } ${
          shouldHaveBg
            ? "bg-obsidian/60 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_30px_rgba(0,0,0,0.5)] border border-white/[0.08]"
            : "bg-transparent border-transparent"
        } ${
          scrolled
            ? "rounded-2xl max-w-[72rem]"
            : "rounded-none border-x-0 border-t-0 max-w-none"
        }`}
      >
        <nav
          className={`container-narrow mx-auto flex items-center justify-between transition-all duration-500 relative ${
            isOpen ? "z-[100]" : "z-10"
          } ${scrolled ? "px-5 py-3 md:px-6" : "px-5 py-4 md:px-8"}`}
        >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-ivory no-underline"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-champagne text-xl font-bold tracking-tight">
            Basava
          </span>
          <span className="text-ivory text-xl font-light tracking-tight">
            Antah Prerna
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/#values"
            className="text-ivory/70 hover:text-champagne text-sm font-medium transition-colors no-underline"
          >
            Our Values
          </Link>
          <Link
            href="/#about"
            className="text-ivory/70 hover:text-champagne text-sm font-medium transition-colors no-underline"
          >
            About
          </Link>
          <Link
            href="/founder"
            className="text-ivory/70 hover:text-champagne text-sm font-medium transition-colors no-underline"
          >
            Founder
          </Link>
          <Link
            href="/#contact"
            className="text-ivory/70 hover:text-champagne text-sm font-medium transition-colors no-underline"
          >
            Contact
          </Link>
          <Link href="/explore" className="btn btn-outline text-xs py-2 px-4">
            Explore Businesses
          </Link>
          <Link href="/get-listed" className="btn btn-primary text-xs py-2 px-4">
            Get Listed
          </Link>

          {/* Authentication (desktop) */}
          {session ? (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen(!profileOpen);
                }}
                className="w-8 h-8 rounded-full border-2 border-champagne/30 overflow-hidden cursor-pointer bg-obsidian-lighter flex items-center justify-center hover:border-champagne/60 transition-colors"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-champagne text-xs font-bold">
                    {(session.user.firstName || "U")[0]}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-11 w-48 bg-obsidian-lighter border border-champagne/10 rounded-lg shadow-2xl py-2 z-50">
                  <div className="px-3 py-2 border-b border-champagne/5">
                    <p className="text-ivory text-xs font-medium truncate">
                      {session.user.firstName}
                    </p>
                    <p className="text-ivory/30 text-[10px] truncate">
                      {session.user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-ivory/60 text-xs hover:text-champagne hover:bg-champagne/5 transition-colors no-underline"
                  >
                    My Profile & Status
                  </Link>
                  {session.user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-3 py-2 text-ivory/60 text-xs hover:text-champagne hover:bg-champagne/5 transition-colors no-underline"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-3 py-2 text-ivory/40 text-xs hover:text-red-400 hover:bg-red-400/5 transition-colors cursor-pointer bg-transparent border-none"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-ivory/70 hover:text-champagne text-sm font-medium transition-colors no-underline ml-1"
            >
              Log in
            </Link>
          )}
        </div>

        {/* Mobile: Profile icon / Login + Hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          {session ? (
            <Link
              href="/profile"
              className="w-7 h-7 rounded-full border-2 border-champagne/30 overflow-hidden flex items-center justify-center bg-obsidian-lighter"
            >
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-champagne text-[10px] font-bold">
                  {(session.user.firstName || "U")[0]}
                </span>
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-ivory/70 hover:text-champagne text-sm font-medium transition-colors no-underline"
            >
              Log in
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 bg-transparent border-none cursor-pointer z-50"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span
              className={`block w-5 h-[1.5px] bg-ivory transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-ivory transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-ivory transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 w-screen h-[100dvh] bg-obsidian/98 backdrop-blur-lg flex flex-col items-center justify-center gap-6 transition-all duration-400 md:hidden z-[90] ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <Link
          href="/#values"
          onClick={() => setIsOpen(false)}
          className="text-ivory text-xl font-light tracking-wide no-underline hover:text-champagne transition-colors"
        >
          Our Values
        </Link>
        <Link
          href="/#about"
          onClick={() => setIsOpen(false)}
          className="text-ivory text-xl font-light tracking-wide no-underline hover:text-champagne transition-colors"
        >
          About
        </Link>
        <Link
          href="/founder"
          onClick={() => setIsOpen(false)}
          className="text-ivory text-xl font-light tracking-wide no-underline hover:text-champagne transition-colors"
        >
          Founder
        </Link>
        <Link
          href="/#contact"
          onClick={() => setIsOpen(false)}
          className="text-ivory text-xl font-light tracking-wide no-underline hover:text-champagne transition-colors"
        >
          Contact
        </Link>

        <div className="flex flex-col gap-3 mt-4 w-56">
          <Link
            href="/explore"
            onClick={() => setIsOpen(false)}
            className="btn btn-outline text-sm text-center"
          >
            Explore Businesses
          </Link>
          <Link
            href="/get-listed"
            onClick={() => setIsOpen(false)}
            className="btn btn-primary text-sm text-center"
          >
            Get Listed
          </Link>
        </div>

        {/* Mobile menu - session links */}
        {session && (
          <div className="mt-4 pt-4 border-t border-ivory/10 flex flex-col items-center gap-3">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="text-ivory/50 text-sm no-underline hover:text-champagne transition-colors"
            >
              My Profile
            </Link>
            {session.user.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="text-ivory/50 text-sm no-underline hover:text-champagne transition-colors"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="text-ivory/30 text-sm hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
