import { createHash } from "crypto";

export const ADMIN_COOKIE = "admin_token";

function tokenFor(password) {
  return createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && password === expected;
}

// 비밀번호 자체가 아니라 해시값만 쿠키에 저장해, 로그인 이후 요청에서는 비밀번호를
// 다시 노출하지 않고도 같은 값인지만 비교합니다.
export function expectedToken() {
  const expected = process.env.ADMIN_PASSWORD;
  return expected ? tokenFor(expected) : null;
}

export function isAuthorized(request) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const expected = expectedToken();
  return Boolean(token && expected && token === expected);
}
