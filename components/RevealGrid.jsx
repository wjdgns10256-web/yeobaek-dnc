"use client";

import { useEffect, useRef, useState } from "react";

// Services/Projects 허브 카드 그리드용 — 단일 IntersectionObserver로 그리드가
// 뷰포트에 들어오는 순간만 감지하고, 실제 스태거 타이밍은 각 카드의 --card-i
// CSS 커스텀 프로퍼티 + transition-delay가 처리합니다 (about 하위 페이지의
// NumberCardGrid/OrgChartReveal과 동일한 패턴).
export default function RevealGrid({ children, className = "" }) {
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`hub-grid ${visible ? "hub-grid-in" : ""} ${className}`}>
      {children}
    </div>
  );
}
