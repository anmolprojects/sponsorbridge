"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Building2, Sparkles, Shield, CheckCircle, DollarSign, Video, FileCheck } from "lucide-react"

const creatorSteps = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and connect your YouTube channel via Google OAuth. Your real stats are verified automatically.",
    icon: UserCircle,
    color: "#C9943A",
  },
  {
    step: "02",
    title: "Get AI-Matched",
    description: "Our AI analyzes your content and audience to find the perfect brand partners for you.",
    icon: Sparkles,
    color: "#C9943A",
  },
  {
    step: "03",
    title: "Review & Accept Deals",
    description: "Browse matched companies, negotiate terms, and accept deals that fit your brand.",
    icon: CheckCircle,
    color: "#1A7A4A",
  },
  {
    step: "04",
    title: "Create Content",
    description: "Produce your sponsored content knowing payment is already secured in escrow.",
    icon: Video,
    color: "#0D0D0B",
  },
  {
    step: "05",
    title: "Get Paid",
    description: "Once approved, funds release automatically. Keep 95% of every deal.",
    icon: DollarSign,
    color: "#1A7A4A",
  },
]

const companySteps = [
  {
    step: "01",
    title: "Start Free Trial",
    description: "Sign up with no credit card required. Get 30 days free to explore the platform.",
    icon: Building2,
    color: "#C9943A",
  },
  {
    step: "02",
    title: "Define Your Campaign",
    description: "Tell us about your product, target audience, and budget. Our AI does the rest.",
    icon: FileCheck,
    color: "#C9943A",
  },
  {
    step: "03",
    title: "Discover Perfect Creators",
    description: "Browse AI-matched creators with Google-verified stats. No fake followers, ever.",
    icon: Sparkles,
    color: "#1A7A4A",
  },
  {
    step: "04",
    title: "Fund Escrow",
    description: "Secure your deal by funding escrow. You're in control until content is approved.",
    icon: Shield,
    color: "#0D0D0B",
  },
  {
    step: "05",
    title: "Approve & Launch",
    description: "Review content, request revisions if needed, approve when perfect. ROI tracking included.",
    icon: CheckCircle,
    color: "#1A7A4A",
  },
]

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"creator" | "company">("creator")
  const steps = activeTab === "creator" ? creatorSteps : companySteps

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#C9943A]/30 text-[#C9943A] bg-[#C9943A]/5">
            Simple Process
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground text-balance">
            How SponsorBridge Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Whether you're a creator seeking sponsorships or a company finding influencers, 
            we've streamlined the entire process.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "creator" | "company")}>
            <TabsList className="bg-secondary h-12 p-1">
              <TabsTrigger 
                value="creator" 
                className="h-10 px-6 data-[state=active]:bg-[#0D0D0B] data-[state=active]:text-[#FAFAF7]"
              >
                <UserCircle className="w-4 h-4 mr-2" />
                For Creators
              </TabsTrigger>
              <TabsTrigger 
                value="company"
                className="h-10 px-6 data-[state=active]:bg-[#0D0D0B] data-[state=active]:text-[#FAFAF7]"
              >
                <Building2 className="w-4 h-4 mr-2" />
                For Companies
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-5 gap-4"
          >
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border" />
                  )}
                  
                  <div className="relative bg-card border border-border rounded-2xl p-6 h-full hover:border-[#C9943A]/50 transition-colors">
                    {/* Step Number */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${step.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                    
                    <span className="text-xs font-medium text-muted-foreground">STEP {step.step}</span>
                    <h3 className="font-serif text-lg font-semibold mt-1 mb-2 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
