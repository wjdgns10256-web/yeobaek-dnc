"use client";

import { useMemo, useState } from "react";
import { projects, projectCategories } from "@/lib/projects-data";

export default function Projects() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="projects" className="bg-ink-950 py-20 sm:py-28">
      <div className="section-pad mx-auto max-w-content">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Projects</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">시공사례</h2>
          <p className="mt-5 leading-loose text-white/65">
            아래 이미지는 준비 중인 더미 이미지입니다. public/images/projects 폴더의 파일을 실제
            시공사진으로 교체하면 자동으로 반영됩니다.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                active === cat.key
                  ? "bg-accent-700 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((project) => (
            <figure
              key={project.id}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-ink-900"
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
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
