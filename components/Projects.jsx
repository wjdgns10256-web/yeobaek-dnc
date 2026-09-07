"use client";

import { useMemo, useState } from "react";
import { projects, projectCategories } from "@/lib/projects-data";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import FullScreenDetail from "./FullScreenDetail";

export default function Projects() {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState(null);

  const countByCategory = useMemo(() => {
    const counts = { all: projects.length };
    for (const p of projects) counts[p.category] = (counts[p.category] || 0) + 1;
    return counts;
  }, []);

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  const categorySiblings = useMemo(() => {
    if (!selected) return [];
    return projects
      .filter((p) => p.category === selected.category)
      .map((p) => ({ key: p.id, label: p.title }));
  }, [selected]);

  return (
    <section id="projects" className="bg-ink-950 py-20 sm:py-28">
      <div className="section-pad mx-auto max-w-content">
        <div className="max-w-xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Projects</p>
          </Reveal>
          <SplitReveal
            text="시공사례"
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          />
        </div>

        <Reveal delay={100} className="mt-10 flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                active === cat.key
                  ? "bg-accent-700 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
              <span
                className={`text-xs ${active === cat.key ? "text-white/70" : "text-white/35"}`}
              >
                {countByCategory[cat.key] ?? 0}
              </span>
            </button>
          ))}
        </Reveal>

        {/* 이미지는 더미 placeholder입니다. public/images/projects 폴더의 파일을 실제 시공사진으로 교체하세요. */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={(i % 4) * 80}>
              <button
                type="button"
                onClick={() => setSelected(project)}
                className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-ink-900 text-left"
              >
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <span className="inline-block rounded-full bg-accent-700/90 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    {project.categoryLabel}
                  </span>
                </figcaption>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <FullScreenDetail
        item={
          selected && {
            ...selected,
            badge: selected.categoryLabel,
            description: `발주처 ${selected.client} · 참여기간 ${selected.period} · 시공사진은 준비되는 대로 업데이트됩니다.`,
          }
        }
        onClose={() => setSelected(null)}
        siblings={categorySiblings}
        activeKey={selected?.id}
        onSelectSibling={(sib) => setSelected(projects.find((p) => p.id === sib.key))}
      />
    </section>
  );
}
