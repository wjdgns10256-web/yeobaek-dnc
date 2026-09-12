import Projects from "@/components/Projects";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `시공사례 | ${siteConfig.companyName}`,
  description: "여백디앤씨의 시공사례를 카테고리별로 확인하세요.",
};

export default function ProjectsPage() {
  return <Projects />;
}
