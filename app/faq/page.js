import Link from "next/link";
import { faqs } from "@/lib/faq-data";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import FaqItem from "@/components/FaqItem";

export const metadata = {
  title: `자주 묻는 질문 | ${siteConfig.companyName}`,
  description: "여백디앤씨 견적, 계약, 폐기물 처리, 서비스 지역에 대해 자주 묻는 질문을 모았습니다.",
};

export default function FaqPage() {
  return (
    <main className="bg-ink-950 pb-24">
      {/* 페이지 상단에 브랜드 심볼을 크게 배치 — 텍스트와 겹치지 않는 독립된 배너 */}
      <div className="flex h-28 items-center justify-center overflow-hidden pt-28 sm:h-40 sm:pt-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/mark-white.png" alt="" aria-hidden="true" className="h-[70%] w-auto opacity-75" />
      </div>
      <div className="section-pad mx-auto max-w-content pt-12">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">FAQ</p>
        </Reveal>
        <SplitReveal
          text="자주 묻는 질문"
          as="h1"
          className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        />
        <Reveal delay={100}>
          <p className="mt-5 max-w-xl text-[15px] leading-loose text-white/65">
            더 궁금한 점이 있으시면 전화나 이메일로 편하게 문의해 주세요.
          </p>
        </Reveal>

        <div className="mt-12 divide-y divide-white/10 border-t border-white/10">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 6) * 60}>
              <FaqItem q={item.q} a={item.a} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
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
