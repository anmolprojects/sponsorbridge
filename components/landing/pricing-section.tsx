"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Building2, Crown } from "lucide-react"

const plans = [
  {
    name: "Creator",
    description: "For YouTube creators of any size",
    price: "Free",
    period: "forever",
    icon: Sparkles,
    color: "#C9943A",
    features: [
      "Google OAuth verification",
      "AI-powered brand matching",
      "Escrow payment protection",
      "In-app encrypted messaging",
      "Reputation score system",
      "Auto-generated contracts",
      "Only 5% commission on deals",
    ],
    cta: "Join as Creator",
    href: "/creator/signup",
    popular: false,
  },
  {
    name: "Company",
    description: "For businesses seeking creators",
    price: "$5",
    period: "/month",
    icon: Building2,
    color: "#1A7A4A",
    features: [
      "30-day free trial (no card required)",
      "Access to verified creators only",
      "AI-powered creator discovery",
      "Escrow payment protection",
      "Content approval workflow",
      "ROI tracking & analytics",
      "10% commission on deals",
    ],
    cta: "Start Free Trial",
    href: "/company/signup",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale campaigns",
    price: "Custom",
    period: "",
    icon: Crown,
    color: "#0D0D0B",
    features: [
      "Everything in Company plan",
      "Reduced 5% commission",
      "Dedicated account manager",
      "Priority creator matching",
      "Custom legal templates",
      "API access",
      "Volume deal discounts",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#C9943A]/30 text-[#C9943A] bg-[#C9943A]/5">
            Simple Pricing
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground text-balance">
            The lowest fees in the market
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Transparent pricing with no hidden costs. Creators join free, companies get 30 days free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-card border rounded-2xl p-8 ${
                  plan.popular 
                    ? "border-[#C9943A] shadow-lg scale-105" 
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9943A] text-[#0D0D0B]">
                    Most Popular
                  </Badge>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${plan.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: plan.color }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="font-serif text-4xl font-semibold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#1A7A4A] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  asChild 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-[#C9943A] hover:bg-[#C9943A]/90 text-[#0D0D0B]" 
                      : "bg-[#0D0D0B] hover:bg-[#0D0D0B]/90 text-[#FAFAF7]"
                  }`}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </motion.div>
            )
          })}
        </div>

        {/* Commission Comparison */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Compare our commission rates</p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <p className="font-serif text-2xl font-semibold text-[#1A7A4A]">5-10%</p>
              <p className="text-sm text-muted-foreground">SponsorBridge</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-semibold text-[#C0392B]">15-20%</p>
              <p className="text-sm text-muted-foreground">Agentio</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-semibold text-[#C0392B]">10%+</p>
              <p className="text-sm text-muted-foreground">Collabstr</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
