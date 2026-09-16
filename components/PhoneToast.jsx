"use client";

import { useEffect, useRef, useState } from "react";

// "전화 문의"류 링크(tel:)를 클릭하면 lib/phone.js가 이 커스텀 이벤트를 쏩니다.
// 전화 앱이 없는 데스크탑에서는 tel: 링크를 눌러도 화면에 아무 변화가 없어
// 눌렸는지 알기 어려우므로, 번호가 복사됐다는 걸 짧게 보여줍니다.
export default function PhoneToast() {
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    function onPhoneCopied(e) {
      setPhone(e.detail?.phone || "");
      setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 2400);
    }
    window.addEventListener("phone-copied", onPhoneCopied);
    return () => {
      window.removeEventListener("phone-copied", onPhoneCopied);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 250ms ease-out, transform 250ms ease-out",
      }}
    >
      <div className="rounded-full border border-white/10 bg-ink-900/95 px-5 py-3 text-sm font-medium text-white shadow-xl shadow-black/40 backdrop-blur-xl">
        전화번호가 복사되었습니다 · {phone}
      </div>
    </div>
  );
}
