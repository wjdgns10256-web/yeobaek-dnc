"use client";

import { useEffect, useRef, useState } from "react";

const lines = ["누군가에게는 없어지고 버려지는 것이지만,", "우리에게는 또 다른 시작과 준비입니다."];

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

    // 목표값(target)은 실제 스크롤 위치를 그대로 따라가지만, 화면에 보이는
    // progress는 매 프레임 목표값을 향해 서서히(lerp) 따라잡도록 해서 아무리
    // 빠르게 스크롤(플릭)해도 문장이 최소한의 시간 동안은 눈에 보이게 합니다.
    let target = 0;
    let current = 0;
    let rafId = null;

    function tick() {
      current += (target - current) * 0.045;
      if (Math.abs(target - current) < 0.0015) {
        current = target;
        rafId = null;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      setProgress(current);
    }

    function computeTarget() {
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      target = scrollable <= 0 ? 1 : Math.min(Math.max(-rect.top, 0), scrollable) / scrollable;
      if (rafId === null) rafId = requestAnimationFrame(tick);
    }

    computeTarget();
    current = target;
    setProgress(current);

    window.addEventListener("scroll", computeTarget, { passive: true });
    window.addEventListener("resize", computeTarget);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", computeTarget);
      window.removeEventListener("resize", computeTarget);
    };
  }, []);

  // 문장이 한 줄씩 순서대로 나타나도록 구간을 배분하고, 마지막에 링크가 이어서 나타납니다.
  const lineWindow = 0.4;
  const lineStep = (1 - lineWindow) / lines.length;
  const lineProgress = (i) => {
    const start = i * lineStep;
    return Math.min(Math.max((progress - start) / lineWindow, 0), 1);
  };
  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-ink-950"
      style={{ height: reduced ? "100vh" : "280vh" }}
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
      </div>
    </section>
  );
}
