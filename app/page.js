import Hero from "@/components/Hero";
import IntroReveal from "@/components/IntroReveal";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import AboutMoreCta from "@/components/AboutMoreCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroReveal />
      <Contact />
      <AboutMoreCta />
      <Partners />
    </main>
  );
}
