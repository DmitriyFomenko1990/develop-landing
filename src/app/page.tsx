import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Invite } from "@/components/Invite";
import { Lead } from "@/components/Lead";
import { Pains } from "@/components/Pains";
import { Process } from "@/components/Process";
import { SectionBreak } from "@/components/SectionBreak";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionBreak id="break-features" kind="thick" />
        <Features />
        <SectionBreak id="break-process" kind="clockwork" />
        <Process />
        <SectionBreak id="break-pains" kind="thick" />
        <Pains />
        <SectionBreak id="break-faq" kind="thick" />
        <Faq />
        <SectionBreak id="break-lead" kind="clockwork" />
        <Lead />
      </main>
      <Footer />
    </>
  );
}
