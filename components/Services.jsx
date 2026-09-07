import { services } from "@/lib/services-data";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import ExpandableCard from "./ExpandableCard";

export default function Services() {
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
              <ExpandableCard
                image={service.image}
                title={service.title}
                description={service.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
