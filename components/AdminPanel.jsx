"use client";

import { useEffect, useState } from "react";

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

function toDateInput(value) {
  return value ? value.slice(0, 10) : "";
}

export default function AdminPanel() {
  const [status, setStatus] = useState("checking"); // checking | login | ready
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [popups, setPopups] = useState([]);
  const [listError, setListError] = useState("");

  const [form, setForm] = useState(null); // null = 폼 닫힘
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  async function loadPopups() {
    const res = await fetch("/api/admin/popups");
    if (res.status === 401) {
      setStatus("login");
      return;
    }
    const data = await res.json();
    setPopups(data.popups || []);
    setListError("");
    setStatus("ready");
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/popups")
      .then((res) => {
        if (res.status === 401) {
          if (!cancelled) setStatus("login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (cancelled || !data) return;
        setPopups(data.popups || []);
        setListError("");
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setListError("팝업 목록을 불러오지 못했습니다.");
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
      await loadPopups();
    } catch {
      setLoginError("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setPopups([]);
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
      await loadPopups();
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
    await loadPopups();
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
      await loadPopups();
    } finally {
      setDeletingId(null);
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
            <h1 className="text-xl font-bold text-white">팝업 관리</h1>
            <p className="mt-1 text-sm text-white/45">방문자에게 노출할 팝업을 만들고 수정할 수 있습니다.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
          >
            로그아웃
          </button>
        </div>

        {listError && <p className="mt-6 text-sm text-red-400">{listError}</p>}

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
      </div>
    </main>
  );
}
