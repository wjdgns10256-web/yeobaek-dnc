// 회사소개(/about) 상단 배너 — 심볼이 만들어진 그리드 가이드가 나타났다가
// 심볼이 자리를 잡으면 그리드가 사라지는 브랜드 리빌 모션입니다.
// 사진 없이 심볼 + 디자인 그리드만으로 구성했고, 방문할 때마다(페이지 진입 시) 재생됩니다.
// 모션 최소화(prefers-reduced-motion) 환경에서는 애니메이션 없이 완성된 상태만 보여줍니다.
export default function AboutBrandIntro() {
  return (
    <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-ink-950 sm:h-[52vh]">
      <div className="brand-intro">
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
