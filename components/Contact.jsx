"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { IconPhone, IconMail, IconPin } from "./icons";
import Reveal from "./Reveal";

const inquiryTypes = ["건축물 해체공사", "부분철거", "개구부 확장", "견적 문의", "기타"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", type: inquiryTypes[0], message: "" });
  const [status, setStatus] = useState("idle"); // idle | sent

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: 실제 접수를 위해서는 API 라우트(app/api/contact/route.js) 또는
    // Formspree 등 폼 백엔드 연동이 필요합니다. 현재는 UI 동작만 확인할 수 있습니다.
    setStatus("sent");
  }

  return (
    <section id="contact" className="border-t border-white/5 bg-ink-900 py-20 text-white sm:py-28">
      <div className="section-pad mx-auto max-w-content">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">Contact</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">문의하기</h2>
          <p className="mt-5 leading-loose text-white/70">
            해체·철거가 필요한 현장이 있으신가요? 전화, 이메일 또는 아래 양식으로 문의해 주시면
            빠르게 안내해 드립니다.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <Reveal className="space-y-6 lg:col-span-2" delay={100}>
            <a
              href={siteConfig.phoneHref}
              className="flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition-colors hover:border-accent"
            >
              <IconPhone className="mt-0.5 h-6 w-6 flex-none text-accent" />
              <div>
                <p className="text-xs tracking-wide text-white/50">전화</p>
                <p className="mt-1 text-lg font-semibold">{siteConfig.phone}</p>
              </div>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition-colors hover:border-accent"
            >
              <IconMail className="mt-0.5 h-6 w-6 flex-none text-accent" />
              <div>
                <p className="text-xs tracking-wide text-white/50">이메일</p>
                <p className="mt-1 text-lg font-semibold">{siteConfig.email}</p>
              </div>
            </a>
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 p-5">
              <IconPin className="mt-0.5 h-6 w-6 flex-none text-accent" />
              <div>
                <p className="text-xs tracking-wide text-white/50">주소</p>
                <p className="mt-1 text-lg font-semibold">{siteConfig.addressDetail}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-white/70">
                  이름
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-accent"
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm text-white/70">
                  연락처
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-accent"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="mb-1.5 block text-sm text-white/70">
                문의 유형
              </label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-accent"
              >
                {inquiryTypes.map((t) => (
                  <option key={t} value={t} className="bg-ink-900">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-white/70">
                문의 내용
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-accent"
                placeholder="현장 위치, 면적, 희망 일정 등을 알려주시면 더 정확히 안내드릴 수 있습니다."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-accent-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 sm:w-auto sm:px-10"
            >
              문의 보내기
            </button>

            {status === "sent" && (
              <p className="text-sm text-accent-200">
                문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
              </p>
            )}
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
