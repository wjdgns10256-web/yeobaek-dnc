"use client";

import { useEffect, useRef, useState } from "react";

// 비전(/about/vision) 전용 모션 — 화면 중앙의 큰 심볼을 기준으로, 4개의 비전 카드가
// 심볼과 맞닿은 모서리를 기점으로 하나씩 확대되며 나타납니다. 실시간 위치 계산 없이
// CSS transform-origin만으로 구현해 끊김 없이 부드럽게 재생되며, 카드들이 중앙 심볼로부터
// 뻗어나오는(=심볼로 모이는) 느낌을 줍니다.
const ORIGINS = ["100% 100%", "0% 100%", "100% 0%", "0% 0%"];

export default function VisionReveal({ items }) {
  const wrapRef = useRef(null);
  const [step, setStep] = useState(-1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReduced(true);
      setStep(items.length);
      return undefined;
    }

    const timers = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.unobserve(el);
        timers.push(setTimeout(() => setStep(0), 200));
        items.forEach((_, i) => {
          timers.push(setTimeout(() => setStep(i + 1), 750 + i * 320));
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [items]);

  return (
    <div ref={wrapRef} className="relative mt-16 py-10 sm:mt-20 sm:py-16">
      <div className="grid grid-cols-2 gap-6 sm:gap-16 lg:gap-40">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`vision-card flex min-h-[128px] flex-col justify-center rounded-2xl p-5 sm:min-h-[180px] sm:rounded-3xl sm:p-8 lg:min-h-[220px] lg:p-10 ${
              reduced || step > i ? "vision-card-in" : "vision-card-hidden"
            }`}
            style={reduced ? undefined : { transformOrigin: ORIGINS[i] }}
          >
            <h3 className="text-base font-bold text-white sm:text-xl">{item.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/65 sm:mt-4 sm:text-base">{item.desc}</p>
          </div>
        ))}
      </div>

      <div
        className={`vision-hub absolute left-1/2 top-1/2 z-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-ink-900 shadow-2xl shadow-black/50 sm:h-36 sm:w-36 lg:h-48 lg:w-48 ${
          reduced || step >= 0 ? "vision-hub-in" : "vision-hub-hidden"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/mark-white.png" alt="여백디앤씨" className="h-9 w-auto sm:h-16 lg:h-20" />
      </div>
    </div>
  );
}
