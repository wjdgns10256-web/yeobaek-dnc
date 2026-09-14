// 제목 글귀 뒤에 깔리는 브랜드 심볼. 부모 요소에 relative를 지정하고,
// 글귀 쪽 요소에는 relative(또는 z-10)를 줘서 심볼보다 위에 오도록 합니다.
export default function BrandMark({ className = "" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo/mark-white.png"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 top-1/2 h-40 w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.15] sm:h-56 ${className}`}
    />
  );
}
