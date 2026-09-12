"use client";

import { useEffect } from "react";

// 국보디자인 참고 — Lenis로 스크롤에 관성을 줘 사이트 전반의 스크롤 리빌 모션이
// 더 부드럽게 이어지도록 합니다. 실제 스크롤 위치(window.scrollY)는 그대로
// 갱신되므로 Hero/Reveal의 기존 scroll 리스너는 수정 없이 동작합니다.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis;
    let rafId;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
