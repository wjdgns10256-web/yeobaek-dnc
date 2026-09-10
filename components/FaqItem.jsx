"use client";

import { useRef, useState } from "react";

export default function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  return (
    <div className="py-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold text-white"
      >
        {q}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="flex-none text-white/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </button>
      <div
        style={{
          maxHeight: open ? bodyRef.current?.scrollHeight ?? 1000 : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 400ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease",
        }}
      >
        <p ref={bodyRef} className="mt-4 max-w-2xl text-[15px] leading-loose text-white/60">
          {a}
        </p>
      </div>
    </div>
  );
}
