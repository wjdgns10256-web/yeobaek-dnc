"use client";

import { useEffect, useState } from "react";
import Contact from "./Contact";

// 문의하기를 더 이상 홈 화면에 고정 섹션으로 두지 않고, 헤더의 "문의" 링크
// (href="/#contact" 또는 "#contact")를 눌렀을 때만 뜨는 팝업으로 노출합니다.
// URL 해시(#contact)를 열림 상태로 사용해 기존 사이트 곳곳의 "/#contact" 링크가
// 그대로 이 팝업을 여는 트리거로 동작합니다.
export default function ContactModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function syncFromHash() {
      setOpen(window.location.hash === "#contact");
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  // Next.js의 <Link>는 같은 페이지 내 해시 이동을 자체 라우팅으로 가로채
  // 브라우저의 기본 hashchange 이벤트가 발생하지 않는 경우가 있어, "#contact"로
  // 끝나는 링크 클릭을 캡처 단계에서 직접 감지해 팝업을 엽니다.
  useEffect(() => {
    function onDocumentClick(e) {
      const anchor = e.target.closest?.('a[href$="#contact"]');
      if (!anchor) return;
      e.preventDefault();
      if (window.location.hash !== "#contact") {
        window.history.pushState(null, "", "#contact");
      }
      setOpen(true);
    }
    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(e) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="문의하기"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-ink-900 p-6 shadow-2xl shadow-black/50 sm:p-10">
        <button
          type="button"
          onClick={close}
          aria-label="닫기"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">Contact</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">문의하기</h2>

        <div className="mt-8">
          <Contact />
        </div>
      </div>
    </div>
  );
}
