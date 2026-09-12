import Link from "next/link";
import { faqs } from "@/lib/faq-data";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import FaqItem from "@/components/FaqItem";
import BrandMark from "@/components/BrandMark";

export const metadata = {
  title: `자주 묻는 질문 | ${siteConfig.companyName}`,
  description: "여백디앤씨 견적, 계약, 폐기물 처리, 서비스 지역에 대해 자주 묻는 질문을 모았습니다.",
};

export default function FaqPage() {
  return (
    <main className="bg-ink-950 pt-28 pb-24 sm:pt-32">
      <div className="section-pad mx-auto max-w-content">
        <div className="max-w-xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">FAQ</p>
          </Reveal>
          <div className="relative mt-2 inline-block">
            <BrandMark />
            <SplitReveal
              text="자주 묻는 질문"
              as="h1"
              className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
          </div>
          <Reveal delay={100}>
            <p className="mt-5 text-[15px] leading-loose text-white/65">
              더 궁금한 점이 있으시면 전화나 이메일로 편하게 문의해 주세요.
            </p>
          </Reveal>
        </div>

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
              className="rounded-full bg-accent-700 px-8 py-4 text-center text-base font-semibold text-white transition-all hover:scale-[1.03] hover:bg-accent-600"
            >
              전화로 상담하기 · {siteConfig.phone}
            </a>
            <Link
              href="/#contact"
              className="rounded-full border border-white/40 px-8 py-4 text-center text-base font-semibold text-white transition-all hover:scale-[1.03] hover:border-white/70 hover:bg-white/10"
            >
              온라인 문의
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
