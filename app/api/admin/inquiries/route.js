import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/admin-auth";
import { getInquiries } from "@/lib/inquiries-store";

export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const inquiries = await getInquiries();
  return NextResponse.json({ inquiries });
}
