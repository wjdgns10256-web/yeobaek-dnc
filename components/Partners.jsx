import { projects } from "@/lib/projects-data";

function getPartnerNames() {
  const seen = new Set();
  const names = [];
  for (const p of projects) {
    for (const raw of p.client.split("·")) {
      const name = raw.trim();
      if (name && !seen.has(name)) {
        seen.add(name);
        names.push(name);
      }
    }
  }
  return names;
}

export default function Partners() {
  const names = getPartnerNames();
  const track = [...names, ...names];

  return (
    <section className="border-y border-white/10 bg-ink-900 py-8">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {track.map((name, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-medium text-white/40">
              {name}
              <span className="text-white/15">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
