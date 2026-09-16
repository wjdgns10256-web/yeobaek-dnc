"use client";

import { siteConfig } from "@/lib/site-config";
import { notifyPhoneCopy } from "@/lib/phone";

// 서버 컴포넌트 페이지에서도 쓸 수 있는 "전화로 상담하기" 링크 — 클릭 시
// 전화번호를 복사하고 토스트로 알려줍니다 (데스크탑에서 tel: 링크를 눌러도
// 반응이 없어 보이는 문제 보완).
export default function PhoneLink({ className, children }) {
  return (
    <a href={siteConfig.phoneHref} onClick={() => notifyPhoneCopy(siteConfig.phone)} className={className}>
      {children}
    </a>
  );
}
