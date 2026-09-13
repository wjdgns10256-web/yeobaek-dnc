// 회사소개(/about) 상단 배너 — 심볼이 만들어진 그리드 가이드가 나타났다가
// 심볼이 자리를 잡으면 그리드가 사라지는 브랜드 리빌 모션입니다.
// 사진 없이 심볼 + 디자인 그리드만으로 구성했고, 방문할 때마다(페이지 진입 시) 재생됩니다.
// 모션 최소화(prefers-reduced-motion) 환경에서는 애니메이션 없이 완성된 상태만 보여줍니다.
export default function AboutBrandIntro() {
  return (
    <div className="relative h-[36vh] min-h-[260px] w-full overflow-hidden bg-ink-950 sm:h-[44vh]">
      <div className="brand-intro">
        <svg
          className="brand-intro-grid"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#ffffff" strokeOpacity="0.35" strokeDasharray="2 5">
            <line x1="80" y1="0" x2="80" y2="400" />
            <line x1="320" y1="0" x2="320" y2="400" />
            <line x1="0" y1="80" x2="400" y2="80" />
            <line x1="0" y1="320" x2="400" y2="320" />
          </g>
          <rect x="80" y="80" width="240" height="240" rx="54" stroke="#ffffff" strokeOpacity="0.55" />
          <circle cx="200" cy="200" r="118" stroke="#ffffff" strokeOpacity="0.3" />
          <g
            fill="#ffffff"
            fillOpacity="0.55"
            fontSize="11"
            letterSpacing="1"
            fontFamily="'Pretendard Variable','Apple SD Gothic Neo',sans-serif"
          >
            <text x="40" y="16" textAnchor="middle">0.2X</text>
            <text x="200" y="16" textAnchor="middle">X</text>
            <text x="360" y="16" textAnchor="middle">0.2X</text>
            <text x="388" y="44" textAnchor="middle" transform="rotate(90 388 44)">0.5Y</text>
            <text x="388" y="204" textAnchor="middle" transform="rotate(90 388 204)">Y</text>
            <text x="388" y="364" textAnchor="middle" transform="rotate(90 388 364)">0.5Y</text>
          </g>
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/mark-white.png" alt="여백디앤씨" className="brand-intro-mark" />
      </div>
    </div>
  );
}
