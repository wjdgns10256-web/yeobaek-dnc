export default function ValueCard({ index, title, description, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/40 sm:p-7 ${className}`}
    >
      <p className="text-sm font-bold tracking-wide text-accent">{index}</p>
      <h3 className="mt-3 text-lg font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{description}</p>
    </div>
  );
}
