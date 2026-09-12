"use client";

import { useEffect, useRef, useState } from "react";

export default function ParallaxBanner({ src, alt, className = "" }) {
  const ref = useRef(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const el = ref.current;
    if (!el) return;

    function onScroll() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const progress = Math.min(Math.max((center - vh / 2) / vh, -1), 1);
      setShift(progress * 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* image 경로 파일을 실제 사진으로 교체하면 됩니다 */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: `scale(1.15) translateY(${shift}%)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-black/20 to-black/10" />
      {/* 배너 중앙에 브랜드 심볼을 크게 배치 — mix-blend-overlay로 사진과 자연스럽게 어우러지게 처리 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/mark-white.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-auto max-w-[60%] -translate-x-1/2 -translate-y-1/2 opacity-75 mix-blend-overlay"
      />
    </div>
  );
}
