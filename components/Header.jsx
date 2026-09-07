"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "#about", label: "회사소개" },
  { href: "#services", label: "사업분야" },
  { href: "#projects", label: "시공사례" },
  { href: "#contact", label: "문의" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="section-pad mx-auto flex max-w-content items-center justify-between py-4">
        <a
          href="#top"
          className={`text-lg font-bold tracking-tight transition-colors ${
            scrolled ? "text-ink" : "text-white"
          }`}
        >
          여백디앤씨
          <span
            className={`ml-2 hidden text-xs font-normal tracking-[0.2em] sm:inline ${
              scrolled ? "text-ink-500" : "text-white/70"
            }`}
          >
            YEOBAEK D&amp;C
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                scrolled ? "text-ink-800" : "text-white/90"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.phoneHref}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            전화 문의
          </a>
        </nav>

        <button
          type="button"
          aria-label="메뉴 열기"
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full md:hidden ${
            scrolled ? "text-ink" : "text-white"
          }`}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-ink-100 bg-white md:hidden">
          <div className="section-pad mx-auto flex max-w-content flex-col py-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-ink-50 py-3 text-sm font-medium text-ink-800 last:border-none"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={siteConfig.phoneHref}
              className="mt-3 mb-2 rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
            >
              전화 문의 {siteConfig.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
