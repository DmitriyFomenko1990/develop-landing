import { Case } from "@/components/Case";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Lead } from "@/components/Lead";
import { Pricing } from "@/components/Pricing";
import { Proof } from "@/components/Proof";
import { SectionBreak } from "@/components/SectionBreak";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionBreak id="break-proof" kind="clockwork" />
        <Proof />
        <SectionBreak id="break-features" kind="thick" />
        <Features />
        <SectionBreak id="break-case" kind="clockwork" />
        <Case />
        <SectionBreak id="break-pricing" kind="thick" />
        <Pricing />
        <SectionBreak id="break-faq" kind="clockwork" />
        <Faq />
        <SectionBreak id="break-lead" kind="thick" />
        <Lead />
      </main>
      <Footer />
    </>
  );
}
