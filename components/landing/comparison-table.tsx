"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Check, X, Minus } from "lucide-react"

const features = [
  { name: "Commission Rate", sponsorBridge: "5-10%", agentio: "15-20%", collabstr: "10%+", upfluence: "Subscription" },
  { name: "Google OAuth Verification", sponsorBridge: true, agentio: false, collabstr: false, upfluence: "partial" },
  { name: "Full Escrow Protection", sponsorBridge: true, agentio: false, collabstr: true, upfluence: false },
  { name: "Bidirectional AI Matching", sponsorBridge: true, agentio: false, collabstr: false, upfluence: "partial" },
  { name: "E2E Encrypted Messaging", sponsorBridge: true, agentio: false, collabstr: false, upfluence: false },
  { name: "Free Trial for Companies", sponsorBridge: "1 Month Free", agentio: "Demo Only", collabstr: "Limited", upfluence: false },
  { name: "Built-in Content Approval", sponsorBridge: true, agentio: true, collabstr: "partial", upfluence: false },
  { name: "Public Reputation Scores", sponsorBridge: true, agentio: false, collabstr: "partial", upfluence: false },
  { name: "Auto Legal Contracts", sponsorBridge: true, agentio: false, collabstr: false, upfluence: "partial" },
  { name: "Open to All Creators", sponsorBridge: true, agentio: false, collabstr: true, upfluence: true },
]

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-[#1A7A4A]" />
  }
  if (value === false) {
    return <X className="w-5 h-5 text-[#C0392B]" />
  }
  if (value === "partial") {
    return <Minus className="w-5 h-5 text-[#C9943A]" />
  }
  return <span className="text-sm font-medium">{value}</span>
}

export function ComparisonTable() {
  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#C9943A]/30 text-[#C9943A] bg-[#C9943A]/5">
            Comparison
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground text-balance">
            See how we compare
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We built SponsorBridge to solve every problem with existing platforms. 
            Lower fees, better protection, smarter matching.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">Feature</th>
                <th className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded bg-[#0D0D0B] flex items-center justify-center">
                        <span className="text-[#C9943A] font-bold text-xs">S</span>
                      </div>
                      <span className="font-serif font-semibold text-foreground">SponsorBridge</span>
                    </div>
                    <Badge className="bg-[#1A7A4A] text-white text-xs">Best Value</Badge>
                  </div>
                </th>
                <th className="p-4 text-center font-medium text-muted-foreground">Agentio</th>
                <th className="p-4 text-center font-medium text-muted-foreground">Collabstr</th>
                <th className="p-4 text-center font-medium text-muted-foreground">Upfluence</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr 
                  key={feature.name}
                  className={`border-b border-border ${index % 2 === 0 ? "bg-card" : "bg-background"}`}
                >
                  <td className="p-4 text-sm font-medium text-foreground">{feature.name}</td>
                  <td className="p-4 text-center bg-[#C9943A]/5">
                    <div className="flex justify-center">
                      <FeatureValue value={feature.sponsorBridge} />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center">
                      <FeatureValue value={feature.agentio} />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center">
                      <FeatureValue value={feature.collabstr} />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center">
                      <FeatureValue value={feature.upfluence} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Data based on publicly available information as of March 2026. Features may have changed.
        </p>
      </div>
    </section>
  )
}
