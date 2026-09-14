import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/admin-auth";
import { deleteInquiry } from "@/lib/inquiries-store";

export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteInquiry(id);
  return NextResponse.json({ ok: true });
}
