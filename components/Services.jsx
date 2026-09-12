import Link from "next/link";
import { services } from "@/lib/services-data";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

export default function Services() {
  return (
    <section id="services" className="bg-ink-900 pt-28 pb-20 sm:pt-32 sm:pb-28">
      {/* 페이지 상단에 브랜드 심볼을 크게 배치 — 텍스트와 겹치지 않는 독립된 배너 */}
      <div className="flex h-28 items-center justify-center overflow-hidden sm:h-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/mark-white.png" alt="" aria-hidden="true" className="h-[70%] w-auto opacity-75" />
      </div>
      <div className="section-pad mx-auto max-w-content">
        <div className="max-w-xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Services</p>
          </Reveal>
          <SplitReveal
            text="사업분야"
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 120}>
              <Link
                href={`/services/${service.id}`}
                className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-all hover:-translate-y-1 hover:border-accent/40"
              >
                {/* image 경로 파일을 실제 시공사진으로 교체하면 됩니다 */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-ink-800">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  <span className="text-white/40 transition-colors group-hover:text-accent-200">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
