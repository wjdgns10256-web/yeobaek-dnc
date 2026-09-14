import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/admin-auth";
import { getPopups, savePopups } from "@/lib/popups-store";

export const dynamic = "force-dynamic";

export async function PUT(request, { params }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const popups = await getPopups();
  const idx = popups.findIndex((p) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: "not found" }, { status: 404 });

  popups[idx] = {
    ...popups[idx],
    title: body.title ?? popups[idx].title,
    body: body.body ?? popups[idx].body,
    image: body.image ?? popups[idx].image,
    linkText: body.linkText ?? popups[idx].linkText,
    linkHref: body.linkHref ?? popups[idx].linkHref,
    active: typeof body.active === "boolean" ? body.active : popups[idx].active,
    startDate: body.startDate ?? popups[idx].startDate,
    endDate: body.endDate ?? popups[idx].endDate,
    id,
  };
  await savePopups(popups);
  return NextResponse.json({ popup: popups[idx] });
}

export async function DELETE(request, { params }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;

  const popups = await getPopups();
  const next = popups.filter((p) => p.id !== id);
  await savePopups(next);
  return NextResponse.json({ ok: true });
}
