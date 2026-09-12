"use client";

import { useEffect, useRef } from "react";

// 국보디자인 참고 — 마우스를 정확히 따라가는 점(dot)과, 살짝 지연되어 따라오는
// 링(ring)으로 커서에 여운을 줍니다. 포인터가 있는 데스크톱에서만 활성화됩니다.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId;
    let visible = false;

    document.body.classList.add("has-custom-cursor");

    function onMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      if (!visible) {
        visible = true;
        dot.style.opacity = 1;
        ring.style.opacity = 1;
      }
    }

    function onLeave() {
      visible = false;
      dot.style.opacity = 0;
      ring.style.opacity = 0;
    }

    function onDown() {
      ring.classList.add("cursor-ring--active");
    }
    function onUp() {
      ring.classList.remove("cursor-ring--active");
    }

    function tick() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    const interactive = 'a, button, input, textarea, select, [role="button"]';
    function onOver(e) {
      if (e.target.closest(interactive)) ring.classList.add("cursor-ring--hover");
    }
    function onOut(e) {
      if (e.target.closest(interactive)) ring.classList.remove("cursor-ring--hover");
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
