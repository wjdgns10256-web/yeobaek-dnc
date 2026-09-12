"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const lines = ["누군가에게는 없어지고 버려지는 것이지만,", "우리는 또 다른 시작과 준비라고 생각합니다."];

export default function IntroReveal() {
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

  // 문장이 한 줄씩 순서대로 나타나도록 구간을 배분하고, 마지막에 링크가 이어서 나타납니다.
  const lineWindow = 0.4;
  const lineStep = (1 - lineWindow) / lines.length;
  const lineProgress = (i) => {
    const start = i * lineStep;
    return Math.min(Math.max((progress - start) / lineWindow, 0), 1);
  };
  const ctaProgress = Math.min(Math.max((progress - 0.75) / 0.25, 0), 1);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-ink-950"
      style={{ height: reduced ? "100vh" : "240vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div className="mx-auto max-w-2xl space-y-4 text-center sm:space-y-5">
          {lines.map((line, i) => {
            const p = lineProgress(i);
            return (
              <p
                key={line}
                className="text-xl font-bold leading-snug tracking-tight text-white sm:text-3xl"
                style={{ opacity: p, transform: `translateY(${(1 - p) * 20}px)` }}
              >
                {line}
              </p>
            );
          })}
        </div>

        <Link
          href="/about"
          className="group mt-12 inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/5 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:border-accent hover:bg-accent-700 hover:text-white"
          style={{ opacity: ctaProgress, transform: `translateY(${(1 - ctaProgress) * 16}px)` }}
        >
          회사소개 더 보기
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
