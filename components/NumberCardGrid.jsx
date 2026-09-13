"use client";

import { useEffect, useRef, useState } from "react";

// 번호가 매겨진 카드 그리드 공용 모션 — 화면에 들어오면 큰 번호가 살짝 회전하며
// 자리잡고 카드 본문이 뒤따라 올라오는 방식으로, 카드가 하나씩 순서대로
// "조립되는" 느낌을 줍니다. tags가 있으면 카드가 자리잡은 뒤 태그가 이어서
// 하나씩 나타납니다. (인재상 / 현장별 공법소개 / 회사소개 핵심가치에서 재사용)
export default function NumberCardGrid({ items, columns = "sm:grid-cols-2 lg:grid-cols-4" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`mt-8 grid grid-cols-1 gap-4 sm:gap-6 ${columns}`}>
      {items.map((item, i) => (
        <div
          key={item.title}
          className={`number-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 ${
            visible ? "number-card-in" : ""
          }`}
          style={{ "--card-i": i }}
        >
          <span className="number-card-badge text-sm font-bold tracking-wide text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
          {item.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag, ti) => (
                <span
                  key={tag}
                  className="number-card-tag rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/50"
                  style={{ "--tag-i": ti }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
