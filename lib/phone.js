// tel: 링크는 전화 앱이 없는 데스크탑에서는 클릭해도 아무 반응이 없어 보입니다.
// 그래서 클릭 시 전화번호를 클립보드에 복사하고 토스트로 알려줍니다 — 모바일에서는
// 전화 앱이 그대로 열리면서 이 알림도 함께 뜨므로 방해되지 않습니다.
export function notifyPhoneCopy(phone) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(phone).catch(() => {});
  }
  window.dispatchEvent(new CustomEvent("phone-copied", { detail: { phone } }));
}
