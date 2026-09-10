"use client";

import { useEffect, useRef, useState } from "react";

export default function ParallaxBanner({ src, alt, className = "" }) {
  const ref = useRef(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const el = ref.current;
    if (!el) return;

    function onScroll() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const progress = Math.min(Math.max((center - vh / 2) / vh, -1), 1);
      setShift(progress * 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* image 경로 파일을 실제 사진으로 교체하면 됩니다 */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: `scale(1.15) translateY(${shift}%)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-black/20 to-black/10" />
    </div>
  );
}
