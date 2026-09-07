"use client";

import { useEffect, useState } from "react";

// 카테고리 카드를 클릭하면 같은 페이지 안에서 전체화면으로 크게 전환되는
// 상세 화면입니다. 실제 라우팅은 없지만 슬라이드업 전환으로 '다른 페이지로
// 넘어가는' 느낌을 줍니다. item이 null이 되어도 전환 애니메이션이 끝날 때까지
// 콘텐츠를 유지한 뒤 언마운트합니다.
export default function FullScreenDetail({ item, onClose, siblings, activeKey, onSelectSibling }) {
  const [rendered, setRendered] = useState(item);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (item) {
      setRendered(item);
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      const t = setTimeout(() => setRendered(null), 450);
      document.body.style.overflow = "";
      return () => clearTimeout(t);
    }
  }, [item]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (item) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!rendered) return null;

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-ink-950"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(3%)",
        transition: "opacity 450ms cubic-bezier(0.16,1,0.3,1), transform 450ms cubic-bezier(0.16,1,0.3,1)",
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-x-0 top-0 z-10 flex items-center gap-3 overflow-x-auto bg-gradient-to-b from-black/70 to-transparent px-5 py-5 sm:px-8">
        <button
          type="button"
          onClick={onClose}
          className="flex flex-none items-center gap-2 rounded-full bg-black/50 py-2.5 pl-3.5 pr-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-black/70"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          뒤로가기
        </button>

        {siblings && siblings.length > 1 && (
          <div className="flex flex-none items-center gap-2">
            {siblings.map((sib) => (
              <button
                key={sib.key}
                type="button"
                onClick={() => onSelectSibling(sib)}
                className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap backdrop-blur transition-colors ${
                  sib.key === activeKey
                    ? "bg-accent-700 text-white"
                    : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-white"
                }`}
              >
                {sib.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {rendered.image && (
        <div className="aspect-[4/3] w-full overflow-hidden bg-ink-800 sm:aspect-[21/9]">
          <img src={rendered.image} alt={rendered.title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="section-pad mx-auto max-w-content py-10 sm:py-14">
        {rendered.icon}
        {rendered.badge && (
          <span className="mt-4 inline-block rounded-full bg-accent-700 px-3.5 py-1 text-xs font-semibold text-white">
            {rendered.badge}
          </span>
        )}
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">{rendered.title}</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-loose text-white/65">{rendered.description}</p>
      </div>
    </div>
  );
}
