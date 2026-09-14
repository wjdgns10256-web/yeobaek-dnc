"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { aboutPages } from "@/lib/about-data";
import { services } from "@/lib/services-data";
import { projectCategories } from "@/lib/projects-data";
import { faqs } from "@/lib/faq-data";

const navItems = [
  {
    href: "/about",
    label: "회사소개",
    children: aboutPages.map((p) => ({ href: `/about/${p.slug}`, label: p.label })),
  },
  {
    href: "/services",
    label: "사업분야",
    children: services.map((s) => ({ href: `/services/${s.id}`, label: s.title })),
  },
  {
    href: "/projects",
    label: "시공사례",
    children: projectCategories
      .filter((c) => c.key !== "all")
      .map((c) => ({ href: `/projects/${c.key}`, label: c.label })),
  },
  {
    href: "/faq",
    label: "FAQ",
    children: faqs.slice(0, 5).map((f) => ({ href: "/faq", label: f.q })),
  },
  {
    href: "/#contact",
    label: "문의",
    children: [
      { href: siteConfig.phoneHref, label: `전화 상담 · ${siteConfig.phone}` },
      { href: "/#contact", label: "온라인 문의" },
    ],
  },
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
    <Fragment>
    <header
      className={`fixed inset-x-0 top-0 z-[65] transition-colors duration-300 ${
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
            <div key={item.href} className="group relative py-2">
              <Link
                href={item.href}
                className="relative text-sm font-medium text-white/80 transition-colors hover:text-accent"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>

              {item.children && item.children.length > 0 && (
                <div className="pointer-events-none absolute left-1/2 top-full w-64 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-xl shadow-black/40 backdrop-blur-xl">
                    <ul className="py-2">
                      {item.children.map((child) => (
                        <li key={child.href + child.label}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2.5 text-sm leading-snug text-white/65 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
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
    </header>

      {/* 국보디자인 참고 — 전체화면 오버레이 + 배경 블러 모바일 메뉴.
          header 밖(형제)으로 빼둔 이유: header가 스크롤 시 backdrop-blur를
          갖게 되는데, backdrop-filter는 자손 fixed 요소의 containing block을
          만들어버려 이 오버레이가 header 높이만큼만 덮이는 버그가 있었습니다. */}
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
          className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 max-w-none opacity-[0.06]"
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
            className="mt-10 rounded-full bg-accent-700 px-4 py-3.5 text-center text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-accent-600"
            onClick={() => setMenuOpen(false)}
          >
            전화 문의 {siteConfig.phone}
          </a>
        </div>
      </div>
    </Fragment>
  );
}
