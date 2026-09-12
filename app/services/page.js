import Services from "@/components/Services";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `사업분야 | ${siteConfig.companyName}`,
  description: "여백디앤씨의 사업분야 — 구조물 해체공사, 마감재 해체공사, 구조체 절단공사.",
};

export default function ServicesPage() {
  return <Services />;
}
