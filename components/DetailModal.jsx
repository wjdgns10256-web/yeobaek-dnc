"use client";

import { useEffect } from "react";

export default function DetailModal({ open, onClose, badge, title, description, image, icon: Icon }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-ink-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        {image && (
          <div className="aspect-[4/3] w-full overflow-hidden bg-ink-800">
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="p-7">
          {Icon && <Icon className="h-10 w-10 text-accent" />}
          {badge && (
            <span className="mt-4 inline-block rounded-full bg-accent-700 px-3 py-1 text-xs font-semibold text-white">
              {badge}
            </span>
          )}
          <h3 className="mt-3 text-xl font-bold text-white">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{description}</p>
        </div>
      </div>
    </div>
  );
}
