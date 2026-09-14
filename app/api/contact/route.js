import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

const MAX_PHOTOS = 3;
const MAX_TOTAL_PHOTO_SIZE = 4 * 1024 * 1024; // Vercel 서버리스 함수 요청 본문 한도(4.5MB)를 넘지 않도록 여유를 둔 합산 한도

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  const name = form.get("name");
  const phone = form.get("phone");
  const type = form.get("type");
  const message = form.get("message");
  const website = form.get("website");
  const photos = form.getAll("photos").filter((f) => f instanceof File && f.size > 0);

  // 허니팟 필드 — 화면에는 보이지 않지만 스팸 봇은 채워서 제출합니다. 채워져 있으면 조용히 성공 처리합니다.
  if (website) {
    return Response.json({ ok: true });
  }

  if (!name || !phone || !message) {
    return Response.json(
      { ok: false, error: "이름, 연락처, 문의 내용을 모두 입력해 주세요." },
      { status: 400 }
    );
  }

  if (photos.length > MAX_PHOTOS || photos.some((f) => !f.type.startsWith("image/"))) {
    return Response.json({ ok: false, error: "첨부 사진을 확인해 주세요." }, { status: 400 });
  }
  if (photos.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_PHOTO_SIZE) {
    return Response.json(
      { ok: false, error: "첨부한 사진 용량이 너무 큽니다. 합쳐서 4MB 이하로 첨부해 주세요." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY가 설정되지 않았습니다. .env.local(또는 배포 환경 변수)을 확인하세요.");
    return Response.json(
      { ok: false, error: "문의 접수 기능이 아직 준비되지 않았습니다. 전화로 문의해 주세요." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL || "여백디앤씨 홈페이지 <onboarding@resend.dev>";

  try {
    const attachments = await Promise.all(
      photos.map(async (file) => ({
        filename: file.name || "photo.jpg",
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const { error } = await resend.emails.send({
      from,
      to,
      subject: `[홈페이지 문의] ${type || "문의"} · ${name}`,
      text: `이름: ${name}\n연락처: ${phone}\n문의 유형: ${type || "-"}\n\n문의 내용:\n${message}`,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("Resend 발송 실패:", error);
      return Response.json(
        { ok: false, error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("문의 처리 중 오류:", err);
    return Response.json(
      { ok: false, error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
