"use client";

import { useEffect, useRef, useState } from "react";

// 조직도 모션 — 대표 → 임원 → 부서 순서로, 마치 순서도가 위에서부터 그려지듯
// 박스가 나타나고 그 사이 선이 자라나며 완성됩니다. 구조가 고정돼 있어(대표 1,
// 임원 1, 부서 N) 위치를 실시간으로 계산할 필요 없이 transform-origin +
// transition-delay만으로 안전하게 구현했습니다.
export default function OrgChartReveal({ org }) {
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`org-reveal mt-12 flex flex-col items-center ${visible ? "org-reveal-in" : ""}`}>
      <div className="org-node org-node-ceo rounded-xl border border-accent/40 bg-accent-700/10 px-8 py-3 text-sm font-semibold text-white">
        {org.ceo}
      </div>
      <div className="org-vline org-vline-1 h-8 w-px bg-white/15" />
      <div className="org-node org-node-exec rounded-xl border border-white/15 bg-white/[0.04] px-8 py-3 text-sm font-semibold text-white">
        {org.executive}
      </div>
      <div className="org-vline org-vline-2 h-8 w-px bg-white/15" />
      <div className="relative w-full max-w-2xl">
        <div className="org-hline mx-auto h-px w-full max-w-xl bg-white/15" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {org.departments.map((dept, i) => (
            <div
              key={dept.name}
              className="org-dept-card rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              style={{ "--dept-i": i }}
            >
              <p className="text-sm font-semibold text-white">{dept.name}</p>
              <p className="mt-2 text-xs text-white/45">{dept.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
