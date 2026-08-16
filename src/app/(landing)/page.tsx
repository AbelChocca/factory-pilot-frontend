import { AICopilotSection } from "@/src/components/landing/ai-copilot-section";
import { FinalCTA } from "@/src/components/landing/final-cta-section";
import { HeroSection } from "@/src/components/landing/hero-section";
import { LandingFooter } from "@/src/components/landing/landing-footer";
import { LandingHeader } from "@/src/components/landing/landing-header";
import { ProblemSection } from "@/src/components/landing/problem-section";
import { SolutionSection } from "@/src/components/landing/solution-section";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#0F172A]">
      <LandingHeader />

      {/* Hero */}
      <HeroSection />

      {/* Problem */}
      <ProblemSection />

      {/* Solution */}
      <SolutionSection />

      {/* AI Copilot */}
      <AICopilotSection />

      {/* Final CTA */}
      <FinalCTA />

      <LandingFooter />
    </main>
  );
}
