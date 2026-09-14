import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import BrandMark from "./BrandMark";

const steps = [
  {
    no: "01",
    title: "현장 방문",
    desc: "실측, 폐기물량 산정, 반출 동선과 주차 조건을 확인합니다. 방문 견적은 무료입니다.",
  },
  {
    no: "02",
    title: "견적 · 계약",
    desc: "항목별 내역서를 드리고, 추가 비용이 생길 수 있는 조건을 계약 전에 명시합니다.",
  },
  {
    no: "03",
    title: "철거 · 반출",
    desc: "분리 배출을 원칙으로 하며, 진행 상황을 사진으로 공유해 드립니다.",
  },
  {
    no: "04",
    title: "정리 · 인계",
    desc: "현장 청소 후 함께 확인하고, 폐기물 처리 내역을 전달해 드립니다.",
  },
];

// 홈 화면 하단 — 현장 방문부터 정리·인계까지 여백디앤씨가 처음부터 끝까지
// 책임진다는 원스톱 진행 절차를 간략히 소개합니다.
export default function OneStopProcess() {
  return (
    <section className="border-t border-white/10 bg-ink-900 py-20 sm:py-28">
      <div className="section-pad mx-auto max-w-content">
        <div className="max-w-xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Process</p>
          </Reveal>
          <div className="relative mt-3 inline-block">
            <BrandMark />
            <SplitReveal
              text="철거공사 원스톱 시스템"
              as="h2"
              className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </div>
          <Reveal delay={100}>
            <p className="mt-5 leading-loose text-white/65">
              현장 방문부터 정리·인계까지, 처음부터 끝까지 여백디앤씨가 직접 책임집니다.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.no} delay={i * 100}>
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-accent/40">
                <span className="text-2xl font-extrabold tracking-tight text-accent">{step.no}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.desc}</p>
                {i < steps.length - 1 && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-white/20 sm:block lg:block"
                  >
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
