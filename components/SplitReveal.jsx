"use client";

import { useEffect, useRef, useState } from "react";

// 국보디자인 참고 — 텍스트가 단어 단위로 아래에서 위로 밀려 올라오며 이어지듯 나타납니다.
export default function SplitReveal({ text, as: Tag = "h2", className = "", stagger = 70, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // window는 서버에 없어 마운트 후에만 확인할 수 있어 effect에서 동기적으로 설정합니다 (hydration mismatch 방지).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <span
            style={{
              display: "inline-block",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0%)" : "translateY(110%)",
              transition: `opacity 650ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, transform 650ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
