"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { IconPhone, IconMail, IconPin } from "./icons";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

const inquiryTypes = ["건축물 해체공사", "부분철거", "개구부 확장", "견적 문의", "기타"];

const initialForm = { name: "", phone: "", type: inquiryTypes[0], message: "", website: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "문의 접수에 실패했습니다.");
      }

      setStatus("sent");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "문의 접수에 실패했습니다. 전화로 문의해 주세요.");
    }
  }

  return (
    <section id="contact" className="border-t border-white/5 bg-ink-900 py-20 text-white sm:py-28">
      <div className="section-pad mx-auto max-w-content">
        <div className="max-w-xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">Contact</p>
          </Reveal>
          <SplitReveal
            text="문의하기"
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <Reveal className="space-y-6 lg:col-span-2" delay={100}>
            <a
              href={siteConfig.phoneHref}
              className="flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
            >
              <IconPhone className="mt-0.5 h-6 w-6 flex-none text-accent" />
              <div>
                <p className="text-xs tracking-wide text-white/50">전화</p>
                <p className="mt-1 text-lg font-semibold">{siteConfig.phone}</p>
              </div>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
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
            {/* 허니팟: 사람 눈에는 보이지 않고 스팸 봇만 채우는 함정 필드 */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

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
              disabled={status === "sending"}
              className="w-full rounded-lg bg-accent-700 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.015] hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto sm:px-10"
            >
              {status === "sending" ? "전송 중..." : "문의 보내기"}
            </button>

            <p
              className="text-sm text-accent-200"
              style={{
                maxHeight: status === "sent" ? "40px" : "0px",
                opacity: status === "sent" ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 400ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease",
              }}
            >
              문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
            </p>

            <p
              className="text-sm text-red-400"
              style={{
                maxHeight: status === "error" ? "60px" : "0px",
                opacity: status === "error" ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 400ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease",
              }}
            >
              {errorMessage || "문의 접수에 실패했습니다. 전화로 문의해 주세요."} · {siteConfig.phone}
            </p>
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
