import About from "@/components/About";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `회사소개 | ${siteConfig.companyName}`,
  description: siteConfig.subSlogan,
};

export default function AboutPage() {
  return <About />;
}
