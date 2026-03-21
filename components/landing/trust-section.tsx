"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, CheckCircle, FileCheck, Star, Clock, ArrowRight } from "lucide-react"

const trustFeatures = [
  {
    icon: Shield,
    title: "Google OAuth Verification",
    description: "Creator stats come directly from Google's servers. No self-reported numbers, no inflated metrics.",
    color: "#1A7A4A",
  },
  {
    icon: Lock,
    title: "Escrow Protection",
    description: "Company funds are held securely until content is approved. Both parties are protected.",
    color: "#C9943A",
  },
  {
    icon: CheckCircle,
    title: "Verified Companies",
    description: "AI-powered verification checks business legitimacy, website, and social presence.",
    color: "#1A7A4A",
  },
  {
    icon: FileCheck,
    title: "Auto Legal Contracts",
    description: "Every deal comes with auto-generated legal terms covering deliverables, usage rights, and payments.",
    color: "#0D0D0B",
  },
  {
    icon: Star,
    title: "Reputation Scores",
    description: "Public reputation scores track delivery rates, response times, and deal completion history.",
    color: "#C9943A",
  },
  {
    icon: Clock,
    title: "On-Platform Communication",
    description: "End-to-end encrypted messaging keeps all deals accountable and on the platform.",
    color: "#0D0D0B",
  },
]

const escrowSteps = [
  { step: 1, label: "Company Funds Escrow", status: "complete" },
  { step: 2, label: "Creator Sees Funds Locked", status: "complete" },
  { step: 3, label: "Creator Produces Content", status: "active" },
  { step: 4, label: "Company Approves Content", status: "pending" },
  { step: 5, label: "Funds Release to Creator", status: "pending" },
]

export function TrustSection() {
  return (
    <section id="trust" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#1A7A4A]/30 text-[#1A7A4A] bg-[#1A7A4A]/5">
            <Shield className="w-3 h-3 mr-1" />
            Trust & Safety
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground text-balance">
            Built on trust, protected by design
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We've eliminated the risks that plague influencer marketing. Every feature is designed 
            to protect both creators and companies.
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:border-[#C9943A]/50 transition-all hover:shadow-lg"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Escrow Flow Diagram */}
        <div className="bg-[#0D0D0B] rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FAFAF7] mb-3">
              How Escrow Protection Works
            </h3>
            <p className="text-[#FAFAF7]/70 max-w-xl mx-auto">
              Money only moves when both parties are satisfied. No ghosting, no scams, no lost payments.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#3A3A35] -translate-y-1/2" />
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0">
              {escrowSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step Circle */}
                  <div 
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm ${
                      step.status === "complete" 
                        ? "bg-[#1A7A4A] text-white" 
                        : step.status === "active"
                          ? "bg-[#C9943A] text-[#0D0D0B]"
                          : "bg-[#2A2A25] text-[#FAFAF7]/50"
                    }`}
                  >
                    {step.status === "complete" ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.step
                    )}
                  </div>
                  
                  {/* Arrow */}
                  {index < escrowSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-2 w-4 h-4 text-[#3A3A35] -translate-y-1/2 z-20" />
                  )}
                  
                  {/* Label */}
                  <p className={`mt-4 text-sm font-medium ${
                    step.status === "complete" 
                      ? "text-[#1A7A4A]" 
                      : step.status === "active"
                        ? "text-[#C9943A]"
                        : "text-[#FAFAF7]/50"
                  }`}>
                    {step.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-10 flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1A7A4A]" />
              <span className="text-[#FAFAF7]/60">Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C9943A]" />
              <span className="text-[#FAFAF7]/60">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2A2A25]" />
              <span className="text-[#FAFAF7]/60">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
