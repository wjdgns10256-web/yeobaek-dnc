import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import ParallaxBanner from "@/components/ParallaxBanner";
import BrandMark from "@/components/BrandMark";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return {};
  return {
    title: `${service.title} | ${siteConfig.companyName}`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.id !== service.id);

  return (
    <main className="bg-ink-950">
      <ParallaxBanner
        src={service.image}
        alt={service.title}
        className="h-[42vh] min-h-[280px] w-full sm:h-[52vh]"
      />

      <div className="section-pad mx-auto max-w-content py-14 sm:py-20">
        <Reveal>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-accent-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            사업분야 전체보기
          </Link>
        </Reveal>

        <Reveal>
          <div className="mt-6 max-w-2xl">
            <div className="relative inline-block">
              <BrandMark />
              <h1 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">{service.title}</h1>
            </div>
            <p className="mt-5 text-[15px] leading-loose text-white/65">{service.description}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:max-w-xl">
          {service.highlights.map((h, i) => (
            <Reveal key={h} delay={80 + i * 80}>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 flex-none text-accent"
                >
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm leading-relaxed text-white/75">{h}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">다른 사업분야</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {others.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="rounded-full bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.phoneHref}
              className="rounded-full bg-accent-700 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-accent-600"
            >
              전화로 상담하기 · {siteConfig.phone}
            </a>
            <Link
              href="/#contact"
              className="rounded-full border border-white/40 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              온라인 문의
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
