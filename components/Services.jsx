import { services } from "@/lib/services-data";

export default function Services() {
  return (
    <section id="services" className="bg-ink-900 py-20 sm:py-28">
      <div className="section-pad mx-auto max-w-content">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Services</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">사업분야</h2>
          <p className="mt-5 leading-loose text-white/65">
            소규모 부분철거부터 건축물 전체 해체까지, 현장 규모와 조건에 맞는 최적의 해체 방식을
            제안합니다.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-accent/40"
            >
              {/* image 경로 파일을 실제 시공사진으로 교체하면 됩니다 */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-ink-800">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
