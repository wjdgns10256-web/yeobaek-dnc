import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import BrandMark from "./BrandMark";

const phases = [
  {
    no: "01",
    eyebrow: "Estimate",
    title: "견적",
    desc: "현장 실측을 바탕으로 항목별 견적을 산출합니다. 방문 견적은 무료이며, 폐기물량과 반출 동선까지 꼼꼼히 확인합니다.",
  },
  {
    no: "02",
    eyebrow: "Design",
    title: "설계",
    desc: "구조 안전성을 검토해 해체계획서를 작성합니다. 건물 구조와 주변 환경에 맞는 해체 순서와 공법을 설계합니다.",
  },
  {
    no: "03",
    eyebrow: "Permit",
    title: "대관",
    desc: "멸실신고, 해체 허가 등 관공서 인허가 절차를 대행합니다. 서류 준비부터 접수까지 번거로운 행정 업무를 책임집니다.",
  },
  {
    no: "04",
    eyebrow: "Execution",
    title: "실무",
    desc: "현장에 맞는 공법과 장비를 투입해 안전하게 시공합니다. 작업자와 인근 주민의 안전을 최우선으로 분진·소음을 관리합니다.",
  },
  {
    no: "05",
    eyebrow: "Communication",
    title: "응대",
    desc: "진행 상황을 사진과 함께 수시로 공유합니다. 궁금한 점이나 현장에서 생기는 변경 사항은 즉시 소통하며 진행합니다.",
  },
  {
    no: "06",
    eyebrow: "Settlement",
    title: "정산",
    desc: "폐기물 처리 내역과 항목별 정산 내역을 투명하게 전달합니다. 현장 정리 상태를 함께 확인하고 책임지고 마무리합니다.",
  },
];

// 홈 화면 하단 — 견적부터 정산까지 여백디앤씨가 처음부터 끝까지 책임지는
// 원스톱 진행 과정을 6단계로, 텍스트와 이미지가 좌우로 번갈아 배치되는
// 지그재그 레이아웃으로 소개합니다. 각 단계의 이미지 영역(ImageSlot)은
// 실제 현장 사진으로 교체하면 됩니다 — public/images/home/process-01.jpg ~
// process-06.jpg 경로에 파일을 넣고 아래 ImageSlot의 placeholder 대신
// <img src="..."> 로 바꿔주세요.
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
              견적부터 정산까지, 여섯 단계 모두 여백디앤씨가 직접 책임집니다.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-24">
          {phases.map((phase, i) => {
            const imageFirst = i % 2 === 1;
            return (
              <div key={phase.no} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <Reveal className={imageFirst ? "lg:order-2" : ""}>
                  <span className="text-sm font-bold tracking-[0.2em] text-accent">
                    STEP {phase.no} · {phase.eyebrow}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">{phase.title}</h3>
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
