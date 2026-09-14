import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { isAuthorized } from "@/lib/admin-auth";
import { getCaseStudies, addCaseStudy } from "@/lib/case-studies-store";
import { updateInquiry } from "@/lib/inquiries-store";

export const dynamic = "force-dynamic";

const MAX_PHOTOS = 4;
const MAX_TOTAL_PHOTO_SIZE = 8 * 1024 * 1024;

export async function GET(request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const caseStudies = await getCaseStudies();
  return NextResponse.json({ caseStudies });
}

export async function POST(request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const inquiryId = form.get("inquiryId") || null;
  const category = form.get("category");
  const title = form.get("title");
  const client = form.get("client") || "";
  const period = form.get("period") || "";
  const description = form.get("description") || "";
  const photoFiles = form.getAll("photos").filter((f) => f instanceof File && f.size > 0);

  if (!category || !title) {
    return NextResponse.json({ error: "카테고리와 제목을 입력해 주세요." }, { status: 400 });
  }
  if (photoFiles.length > MAX_PHOTOS || photoFiles.some((f) => !f.type.startsWith("image/"))) {
    return NextResponse.json({ error: "첨부 사진을 확인해 주세요." }, { status: 400 });
  }
  if (photoFiles.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_PHOTO_SIZE) {
    return NextResponse.json(
      { error: "첨부한 사진 용량이 너무 큽니다. 합쳐서 8MB 이하로 첨부해 주세요." },
      { status: 400 }
    );
  }

  const photos = await Promise.all(
    photoFiles.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return `data:${file.type};base64,${buffer.toString("base64")}`;
    })
  );

  const caseStudy = {
    id: randomUUID(),
    inquiryId,
    category,
    title,
    client,
    period,
    description,
    photos,
    createdAt: new Date().toISOString(),
  };

  await addCaseStudy(caseStudy);
  if (inquiryId) {
    await updateInquiry(inquiryId, { caseStudyId: caseStudy.id });
  }

  return NextResponse.json({ caseStudy });
}
