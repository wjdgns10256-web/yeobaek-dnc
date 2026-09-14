"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { IconPhone, IconMail, IconPin, IconCamera } from "./icons";

const inquiryTypes = ["구조물 해체공사", "마감재 해체공사", "구조체 절단공사", "견적 문의", "기타"];

const initialForm = { name: "", phone: "", type: inquiryTypes[0], message: "", website: "" };

const MAX_PHOTOS = 3;
const MAX_TOTAL_PHOTO_SIZE = 4 * 1024 * 1024; // Vercel 서버리스 함수 요청 본문 한도(4.5MB)를 넘지 않도록 여유를 둔 합산 한도

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  const previews = useMemo(() => photos.map((file) => URL.createObjectURL(file)), [photos]);

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePhotoChange(e) {
    const selected = Array.from(e.target.files || []);
    e.target.value = ""; // 같은 파일을 다시 선택할 수 있도록 입력값 초기화

    if (selected.length === 0) return;

    const combined = [...photos, ...selected];

    if (combined.some((file) => !file.type.startsWith("image/"))) {
      setPhotoError("이미지 파일만 첨부할 수 있습니다.");
      return;
    }
    if (combined.length > MAX_PHOTOS) {
      setPhotoError(`사진은 최대 ${MAX_PHOTOS}장까지 첨부할 수 있습니다.`);
      return;
    }
    if (combined.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_PHOTO_SIZE) {
      setPhotoError("첨부한 사진 용량이 너무 큽니다. 합쳐서 4MB 이하로 첨부해 주세요.");
      return;
    }

    setPhotoError("");
    setPhotos(combined);
  }

  function removePhoto(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      photos.forEach((file) => body.append("photos", file));

      const res = await fetch("/api/contact", { method: "POST", body });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "문의 접수에 실패했습니다.");
      }

      setStatus("sent");
      setForm(initialForm);
      setPhotos([]);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "문의 접수에 실패했습니다. 전화로 문의해 주세요.");
    }
  }

  return (
    <div className="text-white">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="order-2 space-y-4 lg:order-1 lg:col-span-2">
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
        </div>

        <div className="order-1 lg:order-2 lg:col-span-3">
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

            <div>
              <label className="mb-1.5 block text-sm text-white/70">
                현장 사진 <span className="text-white/40">(선택, 최대 {MAX_PHOTOS}장)</span>
              </label>
              <label
                htmlFor="photos"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-3 text-sm text-white/50 transition-colors hover:border-accent hover:text-white/80"
              >
                <IconCamera className="h-5 w-5" />
                사진 선택하기
              </label>
              <input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className="hidden"
              />

              {photoError && <p className="mt-2 text-sm text-red-400">{photoError}</p>}

              {photos.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {photos.map((file, i) => (
                    <div
                      key={file.name + file.size + i}
                      className="group relative h-20 w-20 flex-none overflow-hidden rounded-lg border border-white/10"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previews[i]} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        aria-label="사진 삭제"
                        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs text-white transition-colors hover:bg-black"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
        </div>
      </div>
    </div>
  );
}
