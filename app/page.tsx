import Hero from "@/components/Hero";
import MobileThreatProblem from "@/components/MobileThreatProblem";
import WhatIsMTD from "@/components/WhatIsMTD";
import HowProtectionWorks from "@/components/HowProtectionWorks";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import Awards from "@/components/Awards";
import FAQAccordion from "@/components/FAQAccordion";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <MobileThreatProblem />
      <WhatIsMTD />
      <HowProtectionWorks />
      <WhoIsThisFor />
      <Pricing />
      <HowItWorks />
      <Awards />
      <FAQAccordion />
      <FinalCTA />
    </>
  );
}
