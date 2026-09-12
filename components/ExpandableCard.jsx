"use client";

import { useState } from "react";

export default function ExpandableCard({ icon, image, title, description, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-accent/40 ${className}`}
    >
      {image && (
        <div className="aspect-[4/3] w-full overflow-hidden bg-ink-800">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="p-6 sm:p-7">
        {icon}
        <h3 className={`font-bold text-white ${image ? "mt-4 text-lg" : "mt-4 text-base sm:text-lg"}`}>
          {title}
        </h3>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group/more mt-3 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/45 transition-colors hover:text-accent"
        >
          {open ? "접기" : "Show More"}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="transition-transform duration-200 group-hover/more:translate-x-0.5"
            style={{ transform: open ? "rotate(90deg)" : undefined, transition: "transform 250ms ease" }}
          >
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
        >
          <div className="overflow-hidden">
            <p className="pt-3 text-sm leading-relaxed text-white/60">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
