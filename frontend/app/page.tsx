import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SupportedTools from "@/components/SupportedTools";
import HowItWorks from "@/components/HowItWorks";
import AuditForm from "@/components/AuditForm";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Navigation />
      <main className="pt-16">
        <Hero />
        <SupportedTools />
        <HowItWorks />
        <AuditForm />
        <SocialProof />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
