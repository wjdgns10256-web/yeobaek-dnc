import { faqs } from "@/lib/faq-data";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import FaqItem from "@/components/FaqItem";
import BrandMark from "@/components/BrandMark";
import Contact from "@/components/Contact";
import NumberCardGrid from "@/components/NumberCardGrid";

const quoteChecklist = [
  { title: "현장 위치", desc: "정확한 주소나 지번을 알려주세요." },
  { title: "건물 규모", desc: "평수, 층수, 구조(철근콘크리트·조적·철골 등)를 알려주세요." },
  { title: "철거 범위", desc: "전체 철거인지, 부분(내부·마감재) 철거인지 알려주세요." },
  { title: "희망 일정", desc: "착공 희망 시기와 완료 기한을 알려주세요." },
];

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

        <div className="mt-20 border-t border-white/10 pt-14">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">Contact</p>
            <h2 className="relative mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              더 궁금한 점이 있으신가요?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-loose text-white/65">
              찾으시는 답을 못 찾으셨다면, 아래에서 바로 문의해 주세요.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              정확한 견적을 받으려면
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">
              아래 네 가지를 문의 내용에 함께 남겨주시면 더 빠르고 정확한 견적을 받아보실 수 있습니다.
            </p>
          </Reveal>
          <NumberCardGrid items={quoteChecklist} columns="sm:grid-cols-2 lg:grid-cols-4" />

          <Reveal delay={100}>
            <div className="mt-14">
              <Contact />
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
