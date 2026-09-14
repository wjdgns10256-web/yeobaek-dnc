"use client";

import { useEffect, useMemo, useState } from "react";
import { projectCategories } from "@/lib/projects-data";

const EMPTY_FORM = {
  id: null,
  title: "",
  body: "",
  image: "",
  linkText: "",
  linkHref: "",
  active: true,
  startDate: "",
  endDate: "",
};

const caseCategories = projectCategories.filter((c) => c.key !== "all");
const categoryLabelMap = Object.fromEntries(caseCategories.map((c) => [c.key, c.label]));

const EMPTY_CASE_FORM = {
  inquiryId: null,
  category: caseCategories[0]?.key || "",
  title: "",
  client: "",
  period: "",
  description: "",
};

const MAX_CASE_PHOTOS = 4;
const MAX_CASE_PHOTO_SIZE = 8 * 1024 * 1024;

function toDateInput(value) {
  return value ? value.slice(0, 10) : "";
}

function formatDateTime(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString("ko-KR");
  } catch {
    return value;
  }
}

export default function AdminPanel() {
  const [status, setStatus] = useState("checking"); // checking | login | ready
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState("popups"); // popups | inquiries

  const [popups, setPopups] = useState([]);
  const [listError, setListError] = useState("");

  const [form, setForm] = useState(null); // null = 폼 닫힘
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [inquiries, setInquiries] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [inquiriesError, setInquiriesError] = useState("");
  const [deletingInquiryId, setDeletingInquiryId] = useState(null);
  const [deletingCaseId, setDeletingCaseId] = useState(null);

  const [caseForm, setCaseForm] = useState(null); // null = 폼 닫힘
  const [caseFormError, setCaseFormError] = useState("");
  const [caseSaving, setCaseSaving] = useState(false);
  const [casePhotos, setCasePhotos] = useState([]);
  const [casePhotoError, setCasePhotoError] = useState("");

  const casePreviews = useMemo(() => casePhotos.map((file) => URL.createObjectURL(file)), [casePhotos]);
  useEffect(() => {
    return () => casePreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [casePreviews]);

  async function loadAdminData() {
    const [popupsRes, inquiriesRes, caseStudiesRes] = await Promise.all([
      fetch("/api/admin/popups"),
      fetch("/api/admin/inquiries"),
      fetch("/api/admin/case-studies"),
    ]);
    if (popupsRes.status === 401 || inquiriesRes.status === 401 || caseStudiesRes.status === 401) {
      setStatus("login");
      return;
    }
    const [popupsData, inquiriesData, caseStudiesData] = await Promise.all([
      popupsRes.json(),
      inquiriesRes.json(),
      caseStudiesRes.json(),
    ]);
    setPopups(popupsData.popups || []);
    setInquiries(inquiriesData.inquiries || []);
    setCaseStudies(caseStudiesData.caseStudies || []);
    setListError("");
    setInquiriesError("");
    setStatus("ready");
  }

  useEffect(() => {
    let cancelled = false;
    Promise.resolve()
      .then(() => loadAdminData())
      .catch(() => {
        if (cancelled) return;
        setListError("데이터를 불러오지 못했습니다.");
        setStatus("login");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setLoginError(data.error || "로그인에 실패했습니다.");
        return;
      }
      setPassword("");
      await loadAdminData();
    } catch {
      setLoginError("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setPopups([]);
    setInquiries([]);
    setCaseStudies([]);
    setStatus("login");
  }

  function openCreateForm() {
    setForm({ ...EMPTY_FORM });
    setFormError("");
  }

  function openEditForm(popup) {
    setForm({
      ...EMPTY_FORM,
      ...popup,
      startDate: toDateInput(popup.startDate),
      endDate: toDateInput(popup.endDate),
    });
    setFormError("");
  }

  function closeForm() {
    setForm(null);
    setFormError("");
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError("제목을 입력해 주세요.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      const isEdit = Boolean(form.id);
      const url = isEdit ? `/api/admin/popups/${form.id}` : "/api/admin/popups";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 401) {
        setStatus("login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFormError(data.error || "저장에 실패했습니다.");
        return;
      }
      await loadAdminData();
      closeForm();
    } catch {
      setFormError("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(popup) {
    const res = await fetch(`/api/admin/popups/${popup.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !popup.active }),
    });
    if (res.status === 401) {
      setStatus("login");
      return;
    }
    await loadAdminData();
  }

  async function handleDelete(popup) {
    if (!window.confirm(`"${popup.title}" 팝업을 삭제할까요?`)) return;
    setDeletingId(popup.id);
    try {
      const res = await fetch(`/api/admin/popups/${popup.id}`, { method: "DELETE" });
      if (res.status === 401) {
        setStatus("login");
        return;
      }
      await loadAdminData();
    } finally {
      setDeletingId(null);
    }
  }

  async function handleDeleteInquiry(inquiry) {
    if (!window.confirm(`"${inquiry.name}"님의 문의 내역을 삭제할까요?`)) return;
    setDeletingInquiryId(inquiry.id);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry.id}`, { method: "DELETE" });
      if (res.status === 401) {
        setStatus("login");
        return;
      }
      await loadAdminData();
    } finally {
      setDeletingInquiryId(null);
    }
  }

  async function handleDeleteCaseStudy(caseStudy) {
    if (!window.confirm(`"${caseStudy.title}" 시공사례를 삭제할까요?`)) return;
    setDeletingCaseId(caseStudy.id);
    try {
      const res = await fetch(`/api/admin/case-studies/${caseStudy.id}`, { method: "DELETE" });
      if (res.status === 401) {
        setStatus("login");
        return;
      }
      await loadAdminData();
    } finally {
      setDeletingCaseId(null);
    }
  }

  function openCaseForm(inquiry) {
    setCaseForm({
      ...EMPTY_CASE_FORM,
      inquiryId: inquiry.id,
      client: inquiry.name,
      description: inquiry.message,
    });
    setCasePhotos([]);
    setCasePhotoError("");
    setCaseFormError("");
  }

  function closeCaseForm() {
    setCaseForm(null);
    setCasePhotos([]);
    setCasePhotoError("");
    setCaseFormError("");
  }

  function handleCasePhotoChange(e) {
    const selected = Array.from(e.target.files || []);
    e.target.value = "";
    if (selected.length === 0) return;

    const combined = [...casePhotos, ...selected];
    if (combined.some((file) => !file.type.startsWith("image/"))) {
      setCasePhotoError("이미지 파일만 첨부할 수 있습니다.");
      return;
    }
    if (combined.length > MAX_CASE_PHOTOS) {
      setCasePhotoError(`사진은 최대 ${MAX_CASE_PHOTOS}장까지 첨부할 수 있습니다.`);
      return;
    }
    if (combined.reduce((sum, file) => sum + file.size, 0) > MAX_CASE_PHOTO_SIZE) {
      setCasePhotoError("첨부한 사진 용량이 너무 큽니다. 합쳐서 8MB 이하로 첨부해 주세요.");
      return;
    }

    setCasePhotoError("");
    setCasePhotos(combined);
  }

  function removeCasePhoto(index) {
    setCasePhotos((prev) => prev.filter((_, i) => i !== index));
    setCasePhotoError("");
  }

  async function handleCaseSubmit(e) {
    e.preventDefault();
    if (!caseForm.title.trim()) {
      setCaseFormError("제목을 입력해 주세요.");
      return;
    }
    if (!caseForm.category) {
      setCaseFormError("카테고리를 선택해 주세요.");
      return;
    }
    setCaseSaving(true);
    setCaseFormError("");
    try {
      const body = new FormData();
      body.append("category", caseForm.category);
      body.append("title", caseForm.title);
      body.append("client", caseForm.client);
      body.append("period", caseForm.period);
      body.append("description", caseForm.description);
      if (caseForm.inquiryId) body.append("inquiryId", caseForm.inquiryId);
      casePhotos.forEach((file) => body.append("photos", file));

      const res = await fetch("/api/admin/case-studies", { method: "POST", body });
      if (res.status === 401) {
        setStatus("login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setCaseFormError(data.error || "저장에 실패했습니다.");
        return;
      }
      await loadAdminData();
      closeCaseForm();
    } catch {
      setCaseFormError("저장 중 오류가 발생했습니다.");
    } finally {
      setCaseSaving(false);
    }
  }

  if (status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-950">
        <p className="text-sm text-white/40">확인 중...</p>
      </main>
    );
  }

  if (status === "login") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-950 px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8"
        >
          <h1 className="text-lg font-bold text-white">관리자 로그인</h1>
          <p className="mt-2 text-sm text-white/50">팝업 관리 페이지에 접근하려면 비밀번호를 입력하세요.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            autoFocus
            className="mt-6 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
          />
          {loginError && <p className="mt-3 text-sm text-red-400">{loginError}</p>}
          <button
            type="submit"
            disabled={loginLoading}
            className="mt-5 w-full rounded-lg bg-accent-700 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
          >
            {loginLoading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink-950 px-6 pb-10 pt-28 sm:px-10 sm:pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">관리자 페이지</h1>
            <p className="mt-1 text-sm text-white/45">팝업, 문의 내역, 시공사례 등록을 관리할 수 있습니다.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
          >
            로그아웃
          </button>
        </div>

        <div className="mt-6 flex gap-1 border-b border-white/10">
          <button
            type="button"
            onClick={() => setTab("popups")}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === "popups" ? "border-b-2 border-accent text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            팝업 관리
          </button>
          <button
            type="button"
            onClick={() => setTab("inquiries")}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === "inquiries" ? "border-b-2 border-accent text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            문의 내역 ({inquiries.length})
          </button>
        </div>

        {listError && <p className="mt-6 text-sm text-red-400">{listError}</p>}
        {inquiriesError && <p className="mt-6 text-sm text-red-400">{inquiriesError}</p>}

        {tab === "popups" && (
        <>
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            팝업 목록 ({popups.length})
          </h2>
          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-full bg-accent-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            + 새 팝업 추가
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {popups.length === 0 && (
            <p className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center text-sm text-white/40">
              아직 등록된 팝업이 없습니다.
            </p>
          )}
          {popups.map((popup) => (
            <div
              key={popup.id}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                {popup.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={popup.image} alt="" className="h-14 w-14 flex-none rounded-lg object-cover" />
                ) : (
                  <div className="h-14 w-14 flex-none rounded-lg bg-white/5" />
                )}
                <div>
                  <p className="font-semibold text-white">{popup.title || "(제목 없음)"}</p>
                  <p className="mt-0.5 text-xs text-white/40">
                    {popup.startDate || popup.endDate
                      ? `${popup.startDate || "제한없음"} ~ ${popup.endDate || "제한없음"}`
                      : "노출 기간 제한 없음"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleActive(popup)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    popup.active
                      ? "bg-accent-700 text-white hover:bg-accent-600"
                      : "bg-white/10 text-white/50 hover:bg-white/15"
                  }`}
                >
                  {popup.active ? "켜짐" : "꺼짐"}
                </button>
                <button
                  type="button"
                  onClick={() => openEditForm(popup)}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(popup)}
                  disabled={deletingId === popup.id}
                  className="rounded-full border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:border-red-500/60 disabled:opacity-50"
                >
                  {deletingId === popup.id ? "삭제 중..." : "삭제"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {form && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={closeForm}>
            <form
              onSubmit={handleSave}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-ink-900 p-6 sm:p-8"
            >
              <h3 className="text-base font-bold text-white">{form.id ? "팝업 수정" : "새 팝업 추가"}</h3>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs text-white/60">제목</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-accent/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-white/60">본문</label>
                  <textarea
                    value={form.body}
                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-accent/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-white/60">이미지 URL (선택)</label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/images/... 또는 https://..."
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs text-white/60">버튼 텍스트 (선택)</label>
                    <input
                      type="text"
                      value={form.linkText}
                      onChange={(e) => setForm({ ...form, linkText: e.target.value })}
                      placeholder="자세히 보기"
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-white/60">버튼 링크 (선택)</label>
                    <input
                      type="text"
                      value={form.linkHref}
                      onChange={(e) => setForm({ ...form, linkHref: e.target.value })}
                      placeholder="/about 또는 https://..."
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs text-white/60">노출 시작일 (선택)</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-accent/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-white/60">노출 종료일 (선택)</label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-accent/50 focus:outline-none"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="accent-accent-700"
                  />
                  즉시 노출 (켜짐)
                </label>
              </div>

              {formError && <p className="mt-4 text-sm text-red-400">{formError}</p>}

              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-full bg-accent-700 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
                >
                  {saving ? "저장 중..." : "저장"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 rounded-full border border-white/15 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}
        </>
        )}

        {tab === "inquiries" && (
        <>
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            문의 내역 ({inquiries.length})
          </h2>
          <div className="mt-4 space-y-3">
            {inquiries.length === 0 && (
              <p className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center text-sm text-white/40">
                아직 접수된 문의가 없습니다.
              </p>
            )}
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{inquiry.name}</p>
                      <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/50">
                        {inquiry.type || "문의"}
                      </span>
                      {inquiry.caseStudyId && (
                        <span className="rounded-full bg-accent-700/30 px-2.5 py-0.5 text-xs text-accent-200">
                          시공사례 등록됨
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-white/40">
                      {inquiry.phone} · {formatDateTime(inquiry.createdAt)}
                      {inquiry.photoCount > 0 && ` · 사진 ${inquiry.photoCount}장 (이메일로 발송됨)`}
                    </p>
                  </div>
                  <div className="flex flex-none items-center gap-2">
                    {!inquiry.caseStudyId && (
                      <button
                        type="button"
                        onClick={() => openCaseForm(inquiry)}
                        className="rounded-full bg-accent-700 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-600"
                      >
                        시공사례로 등록
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteInquiry(inquiry)}
                      disabled={deletingInquiryId === inquiry.id}
                      className="rounded-full border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:border-red-500/60 disabled:opacity-50"
                    >
                      {deletingInquiryId === inquiry.id ? "삭제 중..." : "삭제"}
                    </button>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-white/65">{inquiry.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            등록된 시공사례 ({caseStudies.length})
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {caseStudies.length === 0 && (
              <p className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center text-sm text-white/40 sm:col-span-2">
                아직 등록된 시공사례가 없습니다.
              </p>
            )}
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                {cs.photos?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cs.photos[0]} alt="" className="h-14 w-14 flex-none rounded-lg object-cover" />
                ) : (
                  <div className="h-14 w-14 flex-none rounded-lg bg-white/5" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">{cs.title}</p>
                  <p className="mt-0.5 truncate text-xs text-white/40">
                    {categoryLabelMap[cs.category] || cs.category} · {cs.period}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteCaseStudy(cs)}
                  disabled={deletingCaseId === cs.id}
                  className="flex-none rounded-full border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:border-red-500/60 disabled:opacity-50"
                >
                  {deletingCaseId === cs.id ? "삭제 중..." : "삭제"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {caseForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={closeCaseForm}
          >
            <form
              onSubmit={handleCaseSubmit}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-ink-900 p-6 sm:p-8"
            >
              <h3 className="text-base font-bold text-white">시공사례로 등록</h3>
              <p className="mt-1 text-xs text-white/45">
                공사가 끝난 뒤 현장 사진과 함께 등록하면 시공사례 페이지에 바로 노출됩니다.
              </p>

              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs text-white/60">카테고리</label>
                    <select
                      value={caseForm.category}
                      onChange={(e) => setCaseForm({ ...caseForm, category: e.target.value })}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-accent/50 focus:outline-none"
                    >
                      {caseCategories.map((c) => (
                        <option key={c.key} value={c.key} className="bg-ink-900">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs text-white/60">공사 기간</label>
                    <input
                      type="text"
                      value={caseForm.period}
                      onChange={(e) => setCaseForm({ ...caseForm, period: e.target.value })}
                      placeholder="2025.01 ~ 2025.02"
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-white/60">제목</label>
                  <input
                    type="text"
                    value={caseForm.title}
                    onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })}
                    placeholder="예: 인천 미추홀구 주택 철거공사"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-white/60">발주처 / 고객명 (선택)</label>
                  <input
                    type="text"
                    value={caseForm.client}
                    onChange={(e) => setCaseForm({ ...caseForm, client: e.target.value })}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-accent/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-white/60">공사 내용 설명 (선택)</label>
                  <textarea
                    value={caseForm.description}
                    onChange={(e) => setCaseForm({ ...caseForm, description: e.target.value })}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-accent/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs text-white/60">
                    현장 사진 (선택, 최대 {MAX_CASE_PHOTOS}장)
                  </label>
                  <label
                    htmlFor="case-photos"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 px-4 py-3 text-sm text-white/50 transition-colors hover:border-accent hover:text-white/80"
                  >
                    사진 선택하기
                  </label>
                  <input
                    id="case-photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleCasePhotoChange}
                    className="hidden"
                  />
                  {casePhotoError && <p className="mt-2 text-sm text-red-400">{casePhotoError}</p>}
                  {casePhotos.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3">
                      {casePhotos.map((file, i) => (
                        <div
                          key={file.name + file.size + i}
                          className="relative h-20 w-20 flex-none overflow-hidden rounded-lg border border-white/10"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={casePreviews[i]} alt="" className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeCasePhoto(i)}
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
              </div>

              {caseFormError && <p className="mt-4 text-sm text-red-400">{caseFormError}</p>}

              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={caseSaving}
                  className="flex-1 rounded-full bg-accent-700 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
                >
                  {caseSaving ? "저장 중..." : "시공사례로 등록"}
                </button>
                <button
                  type="button"
                  onClick={closeCaseForm}
                  className="flex-1 rounded-full border border-white/15 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}
        </>
        )}
      </div>
    </main>
  );
}
