"use client";

import { useEffect, useRef, useState } from "react";

// "38건+" 같은 문자열에서 앞의 숫자만 0에서부터 세어 올라가고, 나머지 텍스트는 그대로 둡니다.
export default function CountUp({ text, duration = 1200 }) {
  const ref = useRef(null);
  const match = text.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [value, setValue] = useState(target === null ? null : 0);

  useEffect(() => {
    if (target === null) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const start = performance.now();
          function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  if (target === null) {
    return <span ref={ref}>{text}</span>;
  }

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
