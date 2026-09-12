import { siteConfig } from "@/lib/site-config";

const snsLinks = [
  { key: "blog", label: "블로그" },
  { key: "instagram", label: "인스타그램" },
  { key: "kakao", label: "카카오톡 채널" },
];

export default function Footer() {
  const activeSns = snsLinks.filter((sns) => siteConfig.sns[sns.key]);

  return (
    <footer className="relative overflow-hidden bg-ink-950 py-12 text-white/60">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/mark-white.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 max-w-none opacity-[0.05] sm:h-72 sm:w-72"
      />
      <div className="section-pad relative mx-auto max-w-content">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/mark-white.png" alt="" aria-hidden="true" className="h-6 w-auto opacity-90" />
            <div>
              <p className="text-lg font-bold text-white">{siteConfig.companyName}</p>
              <p className="mt-1 text-xs tracking-[0.2em] text-white/40">{siteConfig.companyNameEn}</p>
            </div>
          </div>

          {activeSns.length > 0 && (
            <div className="flex gap-4">
              {activeSns.map((sns) => (
                <a
                  key={sns.key}
                  href={siteConfig.sns[sns.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline"
                >
                  {sns.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <p>대표 {siteConfig.ceo}</p>
          <p>사업자등록번호 {siteConfig.bizRegNo}</p>
          <p>{siteConfig.addressDetail}</p>
          <p>
            {siteConfig.phone} · {siteConfig.email}
          </p>
        </div>

        <p className="mt-6 text-xs text-white/30">
          © {new Date().getFullYear()} {siteConfig.companyNameEn}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
