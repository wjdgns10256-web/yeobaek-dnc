"use client";

import { useEffect, useRef, useState } from "react";

// 비전(/about/vision) 전용 모션 — 화면 중앙에 로고가 먼저 나타나고, 4개의 비전 카드가
// 사방(2x2)에서 하나씩 나타나며 각각 중앙 로고에서 뻗어나가는 점선으로 이어집니다.
// "여백의 비전은 이렇게 하나씩 생겨난다"는 느낌을 표현하기 위한 허브-스포크 다이어그램입니다.

// 사각형 중심에서 (dirX, dirY) 방향으로 뻗은 선이 사각형 테두리와 만나는 점을 구합니다.
function edgePoint(rect, dirX, dirY, wrapRect) {
  const cx = rect.left + rect.width / 2 - wrapRect.left;
  const cy = rect.top + rect.height / 2 - wrapRect.top;
  const halfW = rect.width / 2 || 1;
  const halfH = rect.height / 2 || 1;
  const scale = Math.min(Math.abs(halfW / (dirX || 1e-6)), Math.abs(halfH / (dirY || 1e-6)));
  return { x: cx + dirX * scale, y: cy + dirY * scale };
}

export default function VisionReveal({ items }) {
  const wrapRef = useRef(null);
  const hubRef = useRef(null);
  const cardRefs = useRef([]);
  const [step, setStep] = useState(-1);
  const [reduced, setReduced] = useState(false);
  const [lines, setLines] = useState([]);

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
          timers.push(setTimeout(() => setStep(i + 1), 850 + i * 420));
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [items.length]);

  useEffect(() => {
    function measure() {
      const wrap = wrapRef.current;
      const hub = hubRef.current;
      if (!wrap || !hub) return;
      const wrapRect = wrap.getBoundingClientRect();
      const hubRect = hub.getBoundingClientRect();
      const hcx = hubRect.left + hubRect.width / 2 - wrapRect.left;
      const hcy = hubRect.top + hubRect.height / 2 - wrapRect.top;

      const next = cardRefs.current.map((cardEl) => {
        if (!cardEl) return null;
        const r = cardEl.getBoundingClientRect();
        const ccx = r.left + r.width / 2 - wrapRect.left;
        const ccy = r.top + r.height / 2 - wrapRect.top;
        const dx = ccx - hcx;
        const dy = ccy - hcy;
        const p1 = edgePoint(hubRect, dx, dy, wrapRect);
        const p2 = edgePoint(r, -dx, -dy, wrapRect);
        return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
      });
      setLines(next);
    }

    measure();
    const raf = requestAnimationFrame(measure);
    // 카드의 등장 트랜지션(700ms)이 끝난 뒤 한 번 더 측정해 최종 위치 기준으로 선을 맞춥니다.
    const settle = setTimeout(measure, 760);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [step]);

  return (
    <div ref={wrapRef} className="relative mt-16 py-6 sm:mt-20 sm:py-10">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {lines.map((line, i) =>
          line && (reduced || step > i) ? (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#8fb8e8"
              strokeOpacity="0.65"
              strokeWidth="2"
              strokeDasharray="5 7"
              strokeLinecap="round"
              className={reduced ? "" : "vision-line-in"}
              style={reduced ? undefined : { transformOrigin: `${line.x1}px ${line.y1}px` }}
            />
          ) : null
        )}
      </svg>

      <div className="grid grid-cols-2 gap-6 sm:gap-16 lg:gap-40">
        {items.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`vision-card flex min-h-[128px] flex-col justify-center rounded-2xl p-5 sm:min-h-[180px] sm:rounded-3xl sm:p-8 lg:min-h-[220px] lg:p-10 ${
              reduced ? "" : step > i ? "vision-card-in" : "translate-y-6 opacity-0"
            }`}
          >
            <h3 className="text-base font-bold text-white sm:text-xl">{item.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/70 sm:mt-4 sm:text-base">{item.desc}</p>
          </div>
        ))}
      </div>

      <div
        ref={hubRef}
        className={`absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/15 bg-ink-900 shadow-xl shadow-black/40 sm:h-16 sm:w-16 lg:h-20 lg:w-20 ${
          reduced ? "" : step >= 0 ? "vision-hub-in" : "opacity-0"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/mark-white.png" alt="여백디앤씨" className="h-5 w-auto sm:h-7 lg:h-9" />
      </div>
    </div>
  );
}
