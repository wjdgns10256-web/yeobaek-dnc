import { NextResponse } from "next/server";
import { getPopups, isPopupActiveNow } from "@/lib/popups-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const popups = await getPopups();
  const now = new Date();
  const active = popups
    .filter((p) => isPopupActiveNow(p, now))
    .map(({ id, title, body, image, linkText, linkHref }) => ({
      id,
      title,
      body,
      image,
      linkText,
      linkHref,
    }));
  return NextResponse.json({ popups: active });
}
