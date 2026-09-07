import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950"
    >
      {/* 히어로 배경 이미지 — public/images/hero/hero-main.svg 를 실제 현장 사진으로 교체하세요 */}
      <img
        src="/images/hero/hero-main.svg"
        alt="여백디앤씨 해체·철거 현장"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

      <div className="section-pad relative z-10 mx-auto max-w-content text-center">
        <p className="mb-5 text-sm font-medium tracking-[0.3em] text-accent-200 sm:text-base">
          YEOBAEK D&amp;C · 건축물 해체 · 철거 전문
        </p>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          {siteConfig.slogan}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {siteConfig.subSlogan}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={siteConfig.phoneHref}
            className="w-full rounded-full bg-accent-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-900/30 transition-transform hover:scale-[1.02] hover:bg-accent-600 sm:w-auto"
          >
            전화로 상담하기 · {siteConfig.phone}
          </a>
          <a
            href="#contact"
            className="w-full rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            온라인 견적 문의
          </a>
        </div>
      </div>

      <a
        href="#about"
        aria-label="아래로 스크롤"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4v14m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
