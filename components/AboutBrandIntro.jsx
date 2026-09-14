"use client";

import { useEffect, useRef, useState } from "react";

// 회사소개(/about) 상단 배너 — 로고 이미지가 실제로 로드되고, 이 배너가 스크롤로
// 화면에 들어왔을 때(사이트 전반의 Reveal 컴포넌트와 동일한 스크롤 리빌 방식)
// 모션을 시작합니다. 로딩 모션 → 심볼이 좌측 상단부터 조금씩 채워지듯
// 완성되는 모션(clip-path 원형 와이프) 순서로 재생됩니다.
// 모션 최소화(prefers-reduced-motion) 환경에서는 애니메이션 없이 완성된 상태만 보여줍니다.
export default function AboutBrandIntro() {
  const ref = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ready = imgLoaded && inView;

  useEffect(() => {
    let cancelled = false;
    let rafId;
    const markLoaded = () => {
      if (!cancelled) setImgLoaded(true);
    };

    const img = new window.Image();
    img.onload = markLoaded;
    img.onerror = markLoaded;
    img.src = "/logo/mark-white.png";
    // 캐시로 인해 src 설정과 동시에 이미 로드가 끝난 경우, effect 안에서 곧바로
    // setState하지 않도록 다음 프레임으로 미룹니다.
    if (img.complete) rafId = requestAnimationFrame(markLoaded);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-ink-950 sm:h-[52vh]">
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

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/mark-white.png" alt="여백디앤씨" className="brand-intro-mark" />
      </div>
    </div>
  );
}
