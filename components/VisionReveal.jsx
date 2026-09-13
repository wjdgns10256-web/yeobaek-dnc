"use client";

import { useEffect, useRef, useState } from "react";

// 비전(/about/vision) 전용 모션 — 중앙에 로고가 먼저 나타나고, 4개의 비전 카드가
// 왼쪽부터 순서대로 하나씩 나타나며 각각 중앙 로고와 점선으로 이어집니다.
// "여백의 비전은 이렇게 하나씩 생겨난다"는 느낌을 표현하기 위한 허브-스포크 다이어그램입니다.
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
        timers.push(setTimeout(() => setStep(0), 150));
        items.forEach((_, i) => {
          timers.push(setTimeout(() => setStep(i + 1), 750 + i * 380));
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
      const hx = hubRect.left + hubRect.width / 2 - wrapRect.left;
      const hy = hubRect.top + hubRect.height / 2 - wrapRect.top;

      const next = cardRefs.current.map((cardEl) => {
        if (!cardEl) return null;
        const r = cardEl.getBoundingClientRect();
        const cx = r.left + r.width / 2 - wrapRect.left;
        const cy = r.top - wrapRect.top;
        const dx = cx - hx;
        const dy = cy - hy;
        const dist = Math.hypot(dx, dy) || 1;
        const hubEdge = hubRect.width / 2 + 4;
        const x1 = hx + (dx / dist) * hubEdge;
        const y1 = hy + (dy / dist) * hubEdge;
        return { x1, y1, x2: cx, y2: cy - 6 };
      });
      setLines(next);
    }

    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, [step]);

  return (
    <div ref={wrapRef} className="relative mt-14">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {lines.map((line, i) =>
          line && (reduced || step > i) ? (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#7dd3fc"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeLinecap="round"
              className={reduced ? "" : "vision-line-in"}
              style={reduced ? undefined : { opacity: 0 }}
            />
          ) : null
        )}
      </svg>

      <div className="relative z-10 flex justify-center">
        <div
          ref={hubRef}
          className={`flex h-20 w-20 flex-none items-center justify-center rounded-2xl border border-white/15 bg-ink-900 sm:h-24 sm:w-24 ${
            reduced ? "" : step >= 0 ? "vision-hub-in" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/mark-white.png" alt="여백디앤씨" className="h-8 w-auto sm:h-9" />
        </div>
      </div>

      <div className="relative z-10 mt-12 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`rounded-2xl border border-sky-300/30 bg-sky-400/10 p-5 transition-all duration-500 sm:p-6 ${
              reduced ? "" : step > i ? "vision-card-in" : "translate-y-4 opacity-0"
            }`}
          >
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
