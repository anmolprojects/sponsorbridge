import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { StatsBar } from "@/components/landing/stats-bar"
import { HowItWorks } from "@/components/landing/how-it-works"
import { AIMatchingSection } from "@/components/landing/ai-matching-section"
import { TrustSection } from "@/components/landing/trust-section"
import { ComparisonTable } from "@/components/landing/comparison-table"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <AIMatchingSection />
      <TrustSection />
      <ComparisonTable />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}
