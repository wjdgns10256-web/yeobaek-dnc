"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function isDismissedToday(id) {
  try {
    const until = localStorage.getItem(`popup-dismiss-${id}`);
    return Boolean(until) && Date.now() < Number(until);
  } catch {
    return false;
  }
}

function dismissForToday(id) {
  try {
    localStorage.setItem(`popup-dismiss-${id}`, String(Date.now() + 24 * 60 * 60 * 1000));
  } catch {
    // localStorage를 사용할 수 없는 환경(프라이빗 모드 등)에서는 조용히 무시합니다.
  }
}

export default function PopupManager() {
  const pathname = usePathname();
  const [popup, setPopup] = useState(null);
  const [visible, setVisible] = useState(false);
  const [hideToday, setHideToday] = useState(false);

  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) return undefined;
    let cancelled = false;
    fetch("/api/popups/active")
      .then((res) => (res.ok ? res.json() : { popups: [] }))
      .then((data) => {
        if (cancelled) return;
        const next = (data.popups || []).find((p) => !isDismissedToday(p.id));
        if (next) {
          setPopup(next);
          requestAnimationFrame(() => setVisible(true));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isAdminRoute]);

  if (isAdminRoute || !popup) return null;

  function handleClose() {
    if (hideToday) dismissForToday(popup.id);
    setVisible(false);
    setTimeout(() => setPopup(null), 250);
  }

  return (
    <div
      className={`popup-overlay ${visible ? "popup-overlay-in" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={popup.title || "공지"}
    >
      <div className="popup-card">
        <button type="button" className="popup-close" aria-label="닫기" onClick={handleClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        {popup.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={popup.image} alt="" className="popup-image" />
        )}
        <div className="popup-body">
          {popup.title && <h3 className="popup-title">{popup.title}</h3>}
          {popup.body && <p className="popup-text">{popup.body}</p>}
          {popup.linkHref && (
            <a href={popup.linkHref} className="popup-cta">
              {popup.linkText || "자세히 보기"}
            </a>
          )}
        </div>
        <label className="popup-hide-today">
          <input type="checkbox" checked={hideToday} onChange={(e) => setHideToday(e.target.checked)} />
          오늘 하루 보지 않기
        </label>
      </div>
    </div>
  );
}
