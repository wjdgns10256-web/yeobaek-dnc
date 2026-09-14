import Link from "next/link";
import Reveal from "./Reveal";

// 스크롤에 따라 스티키하게 나타나는 IntroReveal의 "회사소개 더 보기" 버튼을
// 놓치는 방문자가 많다는 문의가 있어, 문의(Contact) 아래에도 일반적인 스크롤
// 등장 방식(Reveal)으로 한 번 더 노출합니다.
export default function AboutMoreCta() {
  return (
    <section className="border-t border-white/10 bg-ink-950 py-16 sm:py-20">
      <div className="section-pad mx-auto flex max-w-content flex-col items-center text-center">
        <Reveal>
          <p className="text-sm leading-relaxed text-white/55">
            여백디앤씨가 어떤 회사인지 더 궁금하시다면
          </p>
        </Reveal>
        <Reveal delay={80}>
          <Link
            href="/about"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-accent-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-accent-900/30 transition-all duration-300 hover:scale-[1.03] hover:bg-accent-600"
          >
            회사소개 더 보기
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
