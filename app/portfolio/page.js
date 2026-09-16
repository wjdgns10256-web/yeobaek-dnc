import Link from "next/link";
import { projects, projectCategories } from "@/lib/projects-data";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import BrandMark from "@/components/BrandMark";
import PhoneLink from "@/components/PhoneLink";

export const metadata = {
  title: `시공사례 전체보기 | ${siteConfig.companyName}`,
  description: `여백디앤씨가 참여한 시공 현장 ${projects.length}건을 한 페이지에서 확인하세요.`,
};

const categoryLabels = Object.fromEntries(
  projectCategories.filter((c) => c.key !== "all").map((c) => [c.key, c.label])
);

// 명함 QR코드로 바로 들어오는 용도 — 카테고리 클릭 없이 전체 시공 이력을
// 한 화면에서 스크롤만으로 훑어볼 수 있도록 만든 별도의 간단한 페이지입니다.
export default function PortfolioPage() {
  const countByCategory = {};
  for (const p of projects) countByCategory[p.category] = (countByCategory[p.category] || 0) + 1;

  return (
    <main className="bg-ink-950 pb-24 pt-28 sm:pt-32">
      <div className="section-pad mx-auto max-w-content">
        <Reveal>
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Portfolio</p>
            <div className="relative mt-2 inline-block">
              <BrandMark />
              <h1 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
                시공사례 전체보기
              </h1>
            </div>
            <p className="mt-4 text-[15px] leading-loose text-white/65">
              1998년부터 이어온 현장 이력 {projects.length}건입니다.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-6 flex flex-wrap gap-2">
            {projectCategories
              .filter((c) => c.key !== "all")
              .map((c) => (
                <span
                  key={c.key}
                  className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50"
                >
                  {c.label} {countByCategory[c.key] ?? 0}건
                </span>
              ))}
          </div>
        </Reveal>

        <div className="mt-10 divide-y divide-white/10 border-t border-white/10">
          {projects.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 10) * 25}>
              <div className="flex flex-col gap-1.5 rounded-lg px-3 py-4 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-4">
                <p className="flex items-baseline gap-2.5">
                  <span className="flex-none rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-accent-200">
                    {categoryLabels[item.category]}
                  </span>
                  <span className="font-semibold text-white">{item.title}</span>
                </p>
                <p className="flex-none text-sm text-white/45">
                  {item.client} · {item.period}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <PhoneLink className="rounded-full bg-accent-700 px-8 py-4 text-center text-base font-semibold text-white transition-all hover:scale-[1.03] hover:bg-accent-600">
              전화로 상담하기 · {siteConfig.phone}
            </PhoneLink>
            <Link
              href="/"
              className="rounded-full border border-white/40 px-8 py-4 text-center text-base font-semibold text-white transition-all hover:scale-[1.03] hover:border-white/70 hover:bg-white/10"
            >
              여백디앤씨 홈페이지 보기
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
