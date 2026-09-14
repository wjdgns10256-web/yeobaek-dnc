import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/admin-auth";
import { getPopups, savePopups } from "@/lib/popups-store";

export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const popups = await getPopups();
  return NextResponse.json({ popups });
}

export async function POST(request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const popups = await getPopups();
  const popup = {
    id: randomUUID(),
    title: body.title || "",
    body: body.body || "",
    image: body.image || "",
    linkText: body.linkText || "",
    linkHref: body.linkHref || "",
    active: Boolean(body.active),
    startDate: body.startDate || "",
    endDate: body.endDate || "",
    createdAt: new Date().toISOString(),
  };
  popups.push(popup);
  await savePopups(popups);
  return NextResponse.json({ popup });
}
