import { IconShield, IconClock, IconDocument, IconSupport } from "./icons";
import { siteConfig } from "@/lib/site-config";
import Reveal from "./Reveal";

const values = [
  {
    icon: IconShield,
    title: "안전관리",
    description:
      "안전관리계획 수립부터 현장 통제, 분진·소음 저감까지 — 작업자와 인근 주민 모두의 안전을 최우선으로 합니다.",
  },
  {
    icon: IconClock,
    title: "신속한 견적",
    description: "현장 실측 후 항목별 견적을 빠르게 제공해, 일정에 쫓기는 공사도 지체 없이 진행합니다.",
  },
  {
    icon: IconDocument,
    title: "정확한 서류처리",
    description: "멸실신고, 해체계획서, 폐기물 처리내역 등 인허가 서류를 꼼꼼히 준비해 드립니다.",
  },
  {
    icon: IconSupport,
    title: "사후관리",
    description: "공사 완료 후에도 현장 정리 상태와 인접 시설 피해 여부를 확인하며 끝까지 책임집니다.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-ink-950 py-20 sm:py-28">
      <div className="section-pad mx-auto max-w-content">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">About Us</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              여백디앤씨를 소개합니다
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 leading-loose text-white/65">
              여백디앤씨(餘白)는 {siteConfig.founded} 인천 미추홀구에서 출발한 건축물 해체·철거
              전문회사입니다. 대표 {siteConfig.ceo}을 비롯한 핵심 인력은{" "}
              {siteConfig.trackRecord.since}부터 다양한 현장에서 해체·철거 경험을 쌓아왔으며,
              새 법인은 그 경험을 그대로 이어받아 시작합니다. &lsquo;여백&rsquo;이라는 이름처럼,
              철거는 끝이 아니라 다음을 위한 여백을 만드는 과정이라 믿습니다.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-white">
                  {siteConfig.trackRecord.projects}
                </p>
                <p className="mt-1 text-xs tracking-wide text-white/45">참여 현장</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-white">
                  {siteConfig.trackRecord.since}
                </p>
                <p className="mt-1 text-xs tracking-wide text-white/45">현장 경력 시작</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-white">{siteConfig.founded}</p>
                <p className="mt-1 text-xs tracking-wide text-white/45">법인 설립</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-white/35">* {siteConfig.trackRecord.note}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 100}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.05]">
                <value.icon className="h-10 w-10 text-accent" />
                <h3 className="mt-5 text-lg font-bold text-white">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
