export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ink-950 pt-28 sm:pt-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/mark-white.png"
        alt=""
        aria-hidden="true"
        className="loading-mark h-10 w-auto sm:h-14"
      />
    </div>
  );
}
