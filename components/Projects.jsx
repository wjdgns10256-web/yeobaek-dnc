"use client";

import { useEffect, useMemo, useState } from "react";
import { projects, projectCategories } from "@/lib/projects-data";
import Reveal from "./Reveal";

export default function Projects() {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState(null); // 상세 라이트박스로 볼 프로젝트

  const countByCategory = useMemo(() => {
    const counts = { all: projects.length };
    for (const p of projects) counts[p.category] = (counts[p.category] || 0) + 1;
    return counts;
  }, []);

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  useEffect(() => {
    if (!selected) return;
    function onKey(e) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="projects" className="bg-ink-950 py-20 sm:py-28">
      <div className="section-pad mx-auto max-w-content">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Projects</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">시공사례</h2>
          <p className="mt-5 leading-loose text-white/65">
            아래 이미지는 준비 중인 더미 이미지입니다. public/images/projects 폴더의 파일을 실제
            시공사진으로 교체하면 자동으로 반영됩니다. 카드를 클릭하면 상세 화면으로 볼 수
            있습니다.
          </p>
        </Reveal>

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
                  <p className="mt-1 truncate text-sm font-medium text-white">{project.title}</p>
                </figcaption>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="닫기"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            <div className="aspect-[4/3] w-full overflow-hidden bg-ink-800">
              <img src={selected.image} alt={selected.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-6">
              <span className="inline-block rounded-full bg-accent-700 px-3 py-1 text-xs font-semibold text-white">
                {selected.categoryLabel}
              </span>
              <h3 className="mt-3 text-xl font-bold text-white">{selected.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                시공 사진이 준비되는 대로 현장 위치, 규모, 작업 기간 등 상세 정보가 이 영역에
                채워집니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
