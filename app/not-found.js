import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: `페이지를 찾을 수 없습니다 | ${siteConfig.companyName}`,
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-ink-950 px-6 pb-20 pt-28 text-center sm:pt-32">
      <Reveal>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/mark-white.png"
          alt=""
          aria-hidden="true"
          className="mx-auto h-14 w-auto opacity-30 sm:h-20"
        />
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-accent">404</p>
      </Reveal>
      <Reveal delay={150}>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          요청하신 페이지를 찾을 수 없습니다
        </h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-4 max-w-md text-[15px] leading-loose text-white/60">
          주소가 변경되었거나 삭제된 페이지일 수 있습니다.
          <br />
          아래 버튼으로 홈에서 다시 찾아보세요.
        </p>
      </Reveal>
      <Reveal delay={280}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-accent-700 px-8 py-4 text-center text-base font-semibold text-white transition-all hover:scale-[1.03] hover:bg-accent-600"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-white/40 px-8 py-4 text-center text-base font-semibold text-white transition-all hover:scale-[1.03] hover:border-white/70 hover:bg-white/10"
          >
            회사소개 보기
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
