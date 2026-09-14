"use client";

import { useEffect, useRef, useState } from "react";

// 지그재그 섹션의 이미지 자리가 화면에 들어오는 정도(IntersectionObserver의
// intersectionRatio)에 맞춰 연속적으로 투명도·스케일이 변하도록 합니다.
// 단순히 나타났다 사라지는 게 아니라, 스크롤하는 만큼 점점 또렷해지는
// 느낌을 주기 위한 용도입니다.
export default function ScrollFadeImage({ children, className = "" }) {
  const ref = useRef(null);
  const [ratio, setRatio] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    if (mq.matches) {
      setRatio(1);
      return undefined;
    }

    const el = ref.current;
    if (!el) return undefined;

    const steps = Array.from({ length: 41 }, (_, i) => i / 40);
    const io = new IntersectionObserver(([entry]) => setRatio(entry.intersectionRatio), {
      threshold: steps,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const eased = reduced ? 1 : Math.min(ratio * 1.7, 1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: eased,
        transform: reduced ? undefined : `scale(${0.9 + eased * 0.1}) translateY(${(1 - eased) * 28}px)`,
      }}
    >
      {children}
    </div>
  );
}
