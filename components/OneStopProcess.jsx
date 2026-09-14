import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import BrandMark from "./BrandMark";

const phases = [
  {
    no: "01",
    eyebrow: "Document",
    title: "서류와 인허가부터 확실하게",
    desc: "현장 실측을 바탕으로 항목별 견적을 산출하고, 해체계획서 작성·멸실신고·안전관리계획 수립까지 착공 전 필요한 인허가 서류를 빠짐없이 준비합니다. 계약 전 무엇에 얼마가 드는지 투명하게 안내해 드립니다.",
  },
  {
    no: "02",
    eyebrow: "Execution",
    title: "현장에 맞는 공법으로 안전하게",
    desc: "구조물 해체, 마감재 철거, 구조체 절단 등 현장 특성에 맞는 공법과 장비를 투입합니다. 작업자와 인근 주민의 안전을 최우선으로 분진·소음을 관리하며, 진행 상황을 사진으로 공유해 드립니다.",
  },
  {
    no: "03",
    eyebrow: "Settlement",
    title: "정산까지 투명하게, 마무리까지 책임지고",
    desc: "폐기물은 분리 배출을 원칙으로 하며, 허가받은 처리업체 위탁 내역을 정리해 드립니다. 현장 정리 상태를 함께 확인하고 항목별 정산 내역을 전달하며, 끝까지 책임지고 마무리합니다.",
  },
];

// 홈 화면 하단 — 서류·인허가부터 실제 시공, 정산·마무리까지 여백디앤씨가
// 처음부터 끝까지 책임지는 원스톱 진행 과정을 단계별로 소개합니다.
// 각 단계 옆의 이미지 영역(ImageSlot)은 실제 현장 사진으로 교체하면 됩니다 —
// public/images/home/process-01.jpg ~ process-03.jpg 경로에 파일을 넣고
// 아래 ImageSlot의 placeholder 대신 <img src="..."> 로 바꿔주세요.
function ImageSlot({ label }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.015]">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/25">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs tracking-wide">{label}</span>
      </div>
    </div>
  );
}

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
              서류와 인허가, 실제 시공, 정산과 마무리까지 — 처음부터 끝까지 여백디앤씨가 직접 책임집니다.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-24">
          {phases.map((phase, i) => {
            const imageFirst = i % 2 === 1;
            return (
              <div
                key={phase.no}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={imageFirst ? "lg:order-2" : ""}>
                  <span className="text-sm font-bold tracking-[0.2em] text-accent">
                    STEP {phase.no} · {phase.eyebrow}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {phase.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-loose text-white/60">{phase.desc}</p>
                </Reveal>
                <Reveal delay={100} className={imageFirst ? "lg:order-1" : ""}>
                  <ImageSlot label={`${phase.eyebrow} 현장 사진`} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
