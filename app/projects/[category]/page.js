import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectCategories } from "@/lib/projects-data";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";

const categories = projectCategories.filter((c) => c.key !== "all");

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.key }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = categories.find((c) => c.key === category);
  if (!cat) return {};
  return {
    title: `${cat.label} 시공사례 | ${siteConfig.companyName}`,
    description: `여백디앤씨의 ${cat.label} 시공 참여 이력입니다.`,
  };
}

export default async function ProjectCategoryPage({ params }) {
  const { category } = await params;
  const cat = categories.find((c) => c.key === category);
  if (!cat) notFound();

  const items = projects.filter((p) => p.category === cat.key);
  const others = categories.filter((c) => c.key !== cat.key);

  return (
    <main className="bg-ink-950 pt-28 pb-24 sm:pt-32">
      <div className="section-pad mx-auto max-w-content">
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-accent-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            시공사례 전체보기
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Projects</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {cat.label} 시공사례
          </h1>
          <p className="mt-4 text-sm text-white/50">
            총 {items.length}건 · 시공사진은 준비되는 대로 업데이트됩니다.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-6 flex flex-wrap gap-2">
            {others.map((c) => (
              <Link
                key={c.key}
                href={`/projects/${c.key}`}
                className="rounded-full bg-white/5 px-5 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 divide-y divide-white/10 border-t border-white/10">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 8) * 40}>
              <div className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="flex-none text-sm text-white/45">
                  {item.client} · {item.period}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.phoneHref}
              className="rounded-full bg-accent-700 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-accent-600"
            >
              전화로 상담하기 · {siteConfig.phone}
            </a>
            <Link
              href="/#contact"
              className="rounded-full border border-white/40 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              온라인 문의
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
