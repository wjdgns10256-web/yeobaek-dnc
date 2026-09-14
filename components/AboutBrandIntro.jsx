"use client";

import { useEffect, useRef, useState } from "react";

// 회사소개(/about) 상단 배너 — 로고 이미지가 실제로 로드되고, 이 배너가 스크롤로
// 화면에 들어왔을 때(사이트 전반의 Reveal 컴포넌트와 동일한 스크롤 리빌 방식)
// 모션을 시작합니다. 로딩 모션 → 심볼 상단/좌측에 치수선이 재는 듯 그어지며 →
// 심볼이 좌측 상단부터 조금씩 채워지듯 완성되는 모션(clip-path 원형 와이프) →
// 완성되는 순간 배경이 살짝 어두워지며 심볼 뒤에서 스포트라이트가 번지듯
// 퍼져 시선을 심볼로 모으는 순서로 재생됩니다.
// 모션 최소화(prefers-reduced-motion) 환경에서는 애니메이션 없이 완성된 상태만 보여줍니다.
//
// 뒤로가기/앞으로가기 등으로 브라우저가 페이지를 bfcache에서 그대로 복원하면
// (진짜 새로고침이 아니라 이전 JS 상태를 그대로 재사용) React state가 이미
// true인 채로 남아있어 CSS 애니메이션이 재생되지 않고 완성된 상태만 보일 수
// 있습니다. pageshow 이벤트의 event.persisted로 이 경우를 감지해 상태를
// 초기화하고, 이미지 로드/화면 노출 체크를 처음부터 다시 수행해 모션이
// 매번 처음부터 다시 재생되도록 합니다.
export default function AboutBrandIntro() {
  const ref = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [replayToken, setReplayToken] = useState(0);
  const ready = imgLoaded && inView;

  useEffect(() => {
    function onPageShow(e) {
      if (!e.persisted) return;
      setImgLoaded(false);
      setInView(false);
      setReplayToken((t) => t + 1);
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

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
  }, [replayToken]);

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
  }, [replayToken]);

  return (
    <div
      ref={ref}
      className={`relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-ink-950 sm:h-[52vh] ${
        ready ? "brand-intro-ready" : ""
      }`}
    >
      <div className="brand-intro-bg-glow" />
      <div className="brand-intro-bg-grid" />
      <div className="brand-intro-bg-vignette" />
      <div className="brand-intro">
        <div className="brand-intro-loading">
          <div className="brand-intro-loading-brackets">
            <span />
            <span />
          </div>
          <div className="brand-intro-loading-bar">
            <span />
          </div>
        </div>

        <span className="brand-intro-spotlight" aria-hidden="true" />

        <div className="brand-intro-mark-wrap">
          {/* 가로 치수선 — 심볼의 너비를 재는 듯한 장식 모션 */}
          <div className="brand-intro-dim brand-intro-dim-h" aria-hidden="true">
            <span className="brand-intro-dim-tick" />
            <span className="brand-intro-dim-line" />
            <span className="brand-intro-dim-tick" />
          </div>
          {/* 세로 치수선 — 심볼의 높이를 재는 듯한 장식 모션 */}
          <div className="brand-intro-dim brand-intro-dim-v" aria-hidden="true">
            <span className="brand-intro-dim-tick" />
            <span className="brand-intro-dim-line" />
            <span className="brand-intro-dim-tick" />
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/mark-white.png" alt="여백디앤씨" className="brand-intro-mark" />
        </div>
      </div>
    </div>
  );
}
