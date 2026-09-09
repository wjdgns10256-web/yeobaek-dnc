import Services from "@/components/Services";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `사업분야 | ${siteConfig.companyName}`,
  description: "여백디앤씨의 사업분야 — 건축물 해체공사, 부분철거, 개구부 확장.",
};

export default function ServicesPage() {
  return <Services />;
}
