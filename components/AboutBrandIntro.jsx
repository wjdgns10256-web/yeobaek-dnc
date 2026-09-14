"use client";

import { useEffect, useState } from "react";

// 회사소개(/about) 상단 배너 — 로고 이미지가 실제로 로드된 뒤에만 모션을 시작합니다
// (이미지가 늦게 뜨면서 애니메이션이 끊겨 보이는 문제 방지). 로딩 모션 → 점 하나가
// 나타나 좌우로 선이 되어 뻗는 스캔 모션 → 디자인 그리드 → 심볼이 페이드인되며
// 완성되는 순서로 재생되고, 방문할 때마다(페이지 진입 시) 다시 재생됩니다.
// 모션 최소화(prefers-reduced-motion) 환경에서는 애니메이션 없이 완성된 상태만 보여줍니다.
export default function AboutBrandIntro() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let rafId;
    const markReady = () => {
      if (!cancelled) setReady(true);
    };

    const img = new window.Image();
    img.onload = markReady;
    img.onerror = markReady;
    img.src = "/logo/mark-white.png";
    // 캐시로 인해 src 설정과 동시에 이미 로드가 끝난 경우, effect 안에서 곧바로
    // setState하지 않도록 다음 프레임으로 미룹니다.
    if (img.complete) rafId = requestAnimationFrame(markReady);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-ink-950 sm:h-[52vh]">
      <div className="brand-intro-bg-glow" />
      <div className="brand-intro-bg-grid" />
      <div className="brand-intro-bg-vignette" />
      <div className={`brand-intro ${ready ? "brand-intro-ready" : ""}`}>
        <div className="brand-intro-loading">
          <div className="brand-intro-loading-brackets">
            <span />
            <span />
          </div>
          <div className="brand-intro-loading-bar">
            <span />
          </div>
        </div>

        <div className="brand-intro-scan" aria-hidden="true">
          <span className="brand-intro-scan-line" />
          <span className="brand-intro-scan-dot" />
        </div>

        <svg
          className="brand-intro-grid"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="60" y="60" width="280" height="280" rx="64" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="140" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1.5" />
        </svg>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/mark-white.png" alt="여백디앤씨" className="brand-intro-mark" />
      </div>
    </div>
  );
}
