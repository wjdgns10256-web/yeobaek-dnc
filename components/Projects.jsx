import Link from "next/link";
import { projects, projectCategories } from "@/lib/projects-data";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

const categories = projectCategories.filter((cat) => cat.key !== "all");

export default function Projects() {
  const countByCategory = {};
  for (const p of projects) countByCategory[p.category] = (countByCategory[p.category] || 0) + 1;

  return (
    <section id="projects" className="bg-ink-950 pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="section-pad relative mx-auto max-w-content overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/mark-white.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 opacity-[0.05] sm:-right-6 sm:-top-14 sm:h-60 sm:w-60"
        />
        <div className="relative max-w-xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Projects</p>
          </Reveal>
          <SplitReveal
            text="시공사례"
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          />
          <Reveal delay={100}>
            <p className="mt-5 leading-loose text-white/65">
              1998년부터 이어온 현장 이력 {projects.length}건을 카테고리별로 정리했습니다.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const first = projects.find((p) => p.category === cat.key);
            return (
              <Reveal key={cat.key} delay={i * 100}>
                <Link
                  href={`/projects/${cat.key}`}
                  className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900"
                >
                  {first && (
                    <img
                      src={first.image}
                      alt={cat.label}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <p className="text-xl font-bold text-white">{cat.label}</p>
                      <p className="mt-1 text-sm text-white/60">{countByCategory[cat.key] ?? 0}건</p>
                    </div>
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-accent-700">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
