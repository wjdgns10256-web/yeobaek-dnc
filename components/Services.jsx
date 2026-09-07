"use client";

import { useState } from "react";
import { services } from "@/lib/services-data";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import FullScreenDetail from "./FullScreenDetail";

export default function Services() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="services" className="bg-ink-900 py-20 sm:py-28">
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
              <button
                type="button"
                onClick={() => setSelected(service)}
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
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <FullScreenDetail
        item={selected}
        onClose={() => setSelected(null)}
        siblings={services.map((s) => ({ key: s.id, label: s.title }))}
        activeKey={selected?.id}
        onSelectSibling={(sib) => setSelected(services.find((s) => s.id === sib.key))}
      />
    </section>
  );
}
