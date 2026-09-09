import Link from "next/link";
import { IconShield, IconClock, IconDocument, IconSupport } from "./icons";
import { siteConfig } from "@/lib/site-config";
import { aboutPages } from "@/lib/about-data";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import ExpandableCard from "./ExpandableCard";

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
        <div className="max-w-xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">About</p>
          </Reveal>
          <SplitReveal
            text="오랜 손, 새로운 이름"
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          />

          <Reveal delay={150}>
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
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 100}>
              <ExpandableCard
                icon={<value.icon className="h-9 w-9 text-accent" />}
                title={value.title}
                description={value.description}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-wrap gap-2 border-t border-white/10 pt-8">
            {aboutPages.map((page) => (
              <Link
                key={page.slug}
                href={`/about/${page.slug}`}
                className="rounded-full bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
