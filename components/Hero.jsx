"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { notifyPhoneCopy } from "@/lib/phone";

const words = siteConfig.slogan.split(" ");

export default function Hero() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // window는 서버에 없어 마운트 후에만 확인할 수 있어 effect에서 동기적으로 설정합니다 (hydration mismatch 방지).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    if (mq.matches) {
      setProgress(1);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    // 목표값(target)은 실제 스크롤 위치를 그대로 따라가지만, 화면에 보이는
    // progress는 매 프레임 목표값을 향해 서서히(lerp) 따라잡도록 해서 아무리
    // 빠르게 스크롤(플릭)해도 문구가 최소한의 시간 동안은 눈에 보이게 합니다.
    let target = 0;
    let current = 0;
    let rafId = null;

    function tick() {
      current += (target - current) * 0.045;
      if (Math.abs(target - current) < 0.0015) {
        current = target;
        rafId = null;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      setProgress(current);
    }

    // 첫 화면(Hero)에 머무는 동안은 모바일 터치 스크롤 민감도만 낮게 유지하고
    // (SmoothScroll에서 이미 낮게 시작함), 이 섹션을 벗어나면 원래대로 복구합니다.
    // 데스크탑 마우스 휠(wheelMultiplier)은 너무 느리다는 피드백에 따라 항상
    // 원래 속도(1)를 그대로 둡니다.
    function setScrollSensitivity(insideHero) {
      const lenis = window.__lenis;
      if (!lenis) return;
      lenis.options.touchMultiplier = insideHero ? 0.2 : 1;
    }

    function computeTarget() {
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      target = scrollable <= 0 ? 1 : Math.min(Math.max(-rect.top, 0), scrollable) / scrollable;
      setScrollSensitivity(target < 0.999);
      if (rafId === null) rafId = requestAnimationFrame(tick);
    }

    computeTarget();
    current = target;
    setProgress(current);

    window.addEventListener("scroll", computeTarget, { passive: true });
    window.addEventListener("resize", computeTarget);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", computeTarget);
      window.removeEventListener("resize", computeTarget);
      setScrollSensitivity(false);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ink-950" style={{ height: reduced ? "100vh" : "200vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* 히어로 배경 이미지 — public/images/hero/hero-main.jpg 를 교체하면 반영됩니다 */}
        <Image
          src="/images/hero/hero-main.jpg"
          alt="여백디앤씨 해체·철거 현장"
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover"
          style={{ transform: `scale(1.1) translateY(${progress * 40}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

        <div id="top" className="section-pad relative z-10 mx-auto max-w-content text-center">
          <img
            src="/logo/mark-white.png"
            alt={siteConfig.companyName}
            className="mx-auto mb-8 h-10 w-auto opacity-90 sm:h-12"
          />

          <h1 className="flex flex-wrap justify-center gap-x-3 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {words.map((word, i) => (
              <span key={word + i} style={{ display: "inline-block" }}>
                {word}
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-5 text-sm tracking-[0.15em] text-white/60 sm:text-base">
            {siteConfig.heroTagline}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={siteConfig.phoneHref}
              onClick={() => notifyPhoneCopy(siteConfig.phone)}
              className="w-full rounded-full bg-accent-700 px-8 py-4 text-center text-base font-semibold text-white shadow-lg shadow-accent-900/30 transition-transform hover:scale-[1.02] hover:bg-accent-600 sm:w-auto sm:min-w-[180px]"
            >
              전화 상담
            </a>
            <a
              href="#contact"
              className="w-full rounded-full border border-white/40 px-8 py-4 text-center text-base font-semibold text-white transition-all hover:scale-[1.02] hover:border-white/70 hover:bg-white/10 sm:w-auto sm:min-w-[180px]"
            >
              문의하기
            </a>
          </div>
        </div>

        <a
          href="#story"
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
