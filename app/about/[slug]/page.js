import Link from "next/link";
import { notFound } from "next/navigation";
import { aboutPages } from "@/lib/about-data";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import ParallaxBanner from "@/components/ParallaxBanner";

export function generateStaticParams() {
  return aboutPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = aboutPages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: `${page.label} | ${siteConfig.companyName}`,
    description: page.intro || page.paragraphs?.[0] || "",
  };
}

export default async function AboutSubPage({ params }) {
  const { slug } = await params;
  const page = aboutPages.find((p) => p.slug === slug);
  if (!page) notFound();

  const others = aboutPages.filter((p) => p.slug !== page.slug);

  return (
    <main className="bg-ink-950 pb-24">
      {page.image && (
        <ParallaxBanner
          src={page.image}
          alt={page.label}
          className="h-[32vh] min-h-[200px] w-full sm:h-[40vh]"
        />
      )}
      <div className={`section-pad mx-auto max-w-content ${page.image ? "pt-14 sm:pt-16" : "pt-28 sm:pt-32"}`}>
        <Reveal>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-accent-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            회사소개로 돌아가기
          </Link>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">{page.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{page.label}</h1>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-6 flex flex-wrap gap-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/about/${p.slug}`}
                className="rounded-full bg-white/5 px-5 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </Reveal>

        {page.type === "message" && (
          <Reveal delay={150}>
            <div className="relative mt-12 max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/mark-white.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 opacity-[0.07] sm:-right-10 sm:-top-16 sm:h-72 sm:w-72"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/mark-white.png" alt={siteConfig.companyName} className="relative mb-8 h-9 w-auto opacity-90" />
              <div className="relative space-y-5">
                {page.paragraphs.map((para, i) => (
                  <p key={i} className="text-[15px] leading-loose text-white/70">
                    {para}
                  </p>
                ))}
                <p className="pt-4 text-base font-semibold text-white">대표 {siteConfig.ceo}</p>
              </div>
            </div>
          </Reveal>
        )}

        {page.type === "cards" && (
          <>
            <Reveal delay={150}>
              <p className="mt-12 max-w-xl text-[15px] leading-loose text-white/65">{page.intro}</p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {page.items.map((item, i) => (
                <Reveal key={item.title} delay={200 + i * 80}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {page.type === "org" && (
          <>
            <Reveal delay={150}>
              <p className="mt-12 max-w-xl text-[15px] leading-loose text-white/65">{page.intro}</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-12 flex flex-col items-center">
                <div className="rounded-xl border border-accent/40 bg-accent-700/10 px-8 py-3 text-sm font-semibold text-white">
                  {page.org.ceo}
                </div>
                <div className="h-8 w-px bg-white/15" />
                <div className="rounded-xl border border-white/15 bg-white/[0.04] px-8 py-3 text-sm font-semibold text-white">
                  {page.org.executive}
                </div>
                <div className="h-8 w-px bg-white/15" />
                <div className="relative w-full max-w-2xl">
                  <div className="mx-auto h-px w-full max-w-xl bg-white/15" />
                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {page.org.departments.map((dept, i) => (
                      <Reveal key={dept.name} delay={250 + i * 80}>
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                          <p className="text-sm font-semibold text-white">{dept.name}</p>
                          <p className="mt-2 text-xs text-white/45">{dept.desc}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </>
        )}

        <Reveal delay={300}>
          <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-10 sm:flex-row">
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
