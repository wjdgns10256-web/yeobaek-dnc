"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "/about", label: "회사소개" },
  { href: "/services", label: "사업분야" },
  { href: "/projects", label: "시공사례" },
  { href: "/faq", label: "FAQ" },
  { href: "/#contact", label: "문의" },
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-white/10 bg-ink-950/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="section-pad mx-auto flex max-w-content items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/mark-white.png" alt="" aria-hidden="true" className="h-7 w-auto" />
          <span className="text-lg font-bold tracking-tight text-white">
            여백디앤씨
            <span className="ml-2 hidden text-xs font-normal tracking-[0.2em] text-white/50 sm:inline">
              YEOBAEK D&amp;C
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-white/80 transition-colors hover:text-accent"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <a
            href={siteConfig.phoneHref}
            className="rounded-full bg-accent-700 px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-[1.04] hover:bg-accent-600"
          >
            전화 문의
          </a>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          className="relative z-[70] flex h-10 w-10 flex-none items-center justify-center rounded-full text-white md:hidden"
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

      {/* 국보디자인 참고 — 전체화면 오버레이 + 배경 블러 모바일 메뉴 */}
      <div
        className={`fixed inset-0 z-[60] overflow-hidden bg-ink-950/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/mark-white.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 opacity-[0.06]"
        />
        <div className="section-pad relative flex h-full flex-col overflow-y-auto pb-10 pt-24" data-lenis-prevent>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Menu</p>
          <nav className="mt-4 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/10 py-4 text-xl font-bold text-white transition-colors hover:text-accent-200"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={siteConfig.phoneHref}
            className="mt-10 rounded-full bg-accent-700 px-4 py-3.5 text-center text-sm font-semibold text-white"
            onClick={() => setMenuOpen(false)}
          >
            전화 문의 {siteConfig.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
