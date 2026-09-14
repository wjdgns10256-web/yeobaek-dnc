import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyPassword, expectedToken } from "@/lib/admin-auth";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    console.error("ADMIN_PASSWORD가 설정되지 않았습니다. .env.local(또는 배포 환경 변수)을 확인하세요.");
    return NextResponse.json(
      { error: "관리자 기능이 아직 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  if (!verifyPassword(body?.password || "")) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
