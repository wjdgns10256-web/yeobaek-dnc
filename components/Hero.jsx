"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const words = siteConfig.slogan.split(" ");

export default function Hero() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setProgress(1);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    function onScroll() {
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      setProgress(scrolled / scrollable);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // 각 단어가 스크롤 진행도에 따라 순차적으로, 서로 겹치며 이어지듯 나타나도록 구간을 배분합니다.
  const wordWindow = 0.42;
  const wordStep = words.length > 1 ? (1 - wordWindow) / (words.length - 1) : 0;
  const wordProgress = (i) => {
    const start = i * wordStep;
    return Math.min(Math.max((progress - start) / wordWindow, 0), 1);
  };
  const subProgress = Math.min(Math.max((progress - 0.55) / 0.35, 0), 1);
  const ctaProgress = Math.min(Math.max((progress - 0.75) / 0.25, 0), 1);

  return (
    <section ref={sectionRef} className="relative bg-ink-950" style={{ height: reduced ? "100vh" : "160vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* 히어로 배경 이미지 — public/images/hero/hero-main.jpg 를 교체하면 반영됩니다 */}
        <img
          src="/images/hero/hero-main.jpg"
          alt="여백디앤씨 해체·철거 현장"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{ transform: `scale(1.1) translateY(${progress * 40}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

        <div id="top" className="section-pad relative z-10 mx-auto max-w-content text-center">
          <img
            src="/logo/mark-white.png"
            alt={siteConfig.companyName}
            className="mx-auto mb-8 h-10 w-auto opacity-90 sm:h-12"
            style={{ opacity: 0.9 * (0.3 + 0.7 * wordProgress(0)) }}
          />

          <h1 className="flex flex-wrap justify-center gap-x-3 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {words.map((word, i) => {
              const p = wordProgress(i);
              return (
                <span
                  key={word + i}
                  style={{
                    display: "inline-block",
                    opacity: p,
                    transform: `translateY(${(1 - p) * 24}px)`,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </h1>

          <p
            className="mx-auto mt-5 text-sm tracking-[0.15em] text-white/60 sm:text-base"
            style={{ opacity: subProgress, transform: `translateY(${(1 - subProgress) * 16}px)` }}
          >
            {siteConfig.heroTagline}
          </p>

          <div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ opacity: ctaProgress, transform: `translateY(${(1 - ctaProgress) * 16}px)` }}
          >
            <a
              href={siteConfig.phoneHref}
              className="w-full rounded-full bg-accent-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-900/30 transition-transform hover:scale-[1.02] hover:bg-accent-600 sm:w-auto"
            >
              전화 상담
            </a>
            <a
              href="#contact"
              className="w-full rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              문의하기
            </a>
          </div>
        </div>

        <a
          href="#about"
          aria-label="아래로 스크롤"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
          style={{ opacity: 1 - progress }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 4v14m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
