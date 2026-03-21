"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, TrendingUp, Users, Target, Zap } from "lucide-react"

const creatorMatches = [
  { company: "NordVPN", fit: 97, budget: "$5K - $8K", category: "Tech/Security", color: "#3366FF" },
  { company: "Squarespace", fit: 91, budget: "$4K - $6K", category: "Website Builder", color: "#000000" },
  { company: "Raycon", fit: 84, budget: "$3K - $5K", category: "Audio/Tech", color: "#FF6B6B" },
  { company: "HelloFresh", fit: 78, budget: "$2K - $4K", category: "Food/Lifestyle", color: "#91C11E" },
]

const companyMatches = [
  { creator: "@TechReviewer", subs: "1.2M", engagement: "8.2%", fit: 96, niche: "Tech Reviews" },
  { creator: "@DailyVlogger", subs: "890K", engagement: "6.8%", fit: 89, niche: "Lifestyle" },
  { creator: "@GamingPro", subs: "2.1M", engagement: "9.1%", fit: 85, niche: "Gaming" },
  { creator: "@FitnessJourney", subs: "650K", engagement: "7.5%", fit: 79, niche: "Health/Fitness" },
]

export function AIMatchingSection() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [visibleMatches, setVisibleMatches] = useState(0)
  const [perspective, setPerspective] = useState<"creator" | "company">("creator")

  useEffect(() => {
    if (isSimulating) {
      const timer = setInterval(() => {
        setVisibleMatches((prev) => {
          if (prev >= 4) {
            clearInterval(timer)
            setIsSimulating(false)
            return prev
          }
          return prev + 1
        })
      }, 600)
      return () => clearInterval(timer)
    }
  }, [isSimulating])

  const startSimulation = () => {
    setVisibleMatches(0)
    setIsSimulating(true)
  }

  const matches = perspective === "creator" ? creatorMatches : companyMatches

  return (
    <section id="ai-matching" className="py-24 bg-[#0D0D0B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <Badge className="mb-6 bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20 hover:bg-[#C9943A]/20">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Technology
            </Badge>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#FAFAF7] leading-tight text-balance">
              Intelligent matching that works{" "}
              <span className="text-[#C9943A]">both ways</span>
            </h2>
            
            <p className="mt-6 text-lg text-[#FAFAF7]/70 leading-relaxed text-pretty">
              Unlike competitors that only help brands find creators, our AI engine works bidirectionally. 
              Creators can discover companies that align with their content, while companies find creators 
              whose audiences match their products.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#C9943A]/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-[#C9943A]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#FAFAF7]">Audience Analysis</h4>
                  <p className="text-sm text-[#FAFAF7]/60 mt-1">Deep demographic and interest matching</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#C9943A]/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#C9943A]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#FAFAF7]">ROI Prediction</h4>
                  <p className="text-sm text-[#FAFAF7]/60 mt-1">Estimated conversions before you commit</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#C9943A]/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#C9943A]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#FAFAF7]">Content Style Match</h4>
                  <p className="text-sm text-[#FAFAF7]/60 mt-1">Analyzes tone, format, and brand fit</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#C9943A]/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-[#C9943A]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#FAFAF7]">Real-time Updates</h4>
                  <p className="text-sm text-[#FAFAF7]/60 mt-1">New matches as opportunities arise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Live Simulation */}
          <div className="relative">
            <div className="bg-[#1A1A17] border border-[#3A3A35] rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#3A3A35] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#C9943A]" />
                  <span className="font-medium text-[#FAFAF7]">AI Matching Engine</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setPerspective("creator"); setVisibleMatches(0); }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      perspective === "creator" 
                        ? "bg-[#C9943A] text-[#0D0D0B]" 
                        : "bg-[#2A2A25] text-[#FAFAF7]/70 hover:text-[#FAFAF7]"
                    }`}
                  >
                    Creator View
                  </button>
                  <button
                    onClick={() => { setPerspective("company"); setVisibleMatches(0); }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      perspective === "company" 
                        ? "bg-[#C9943A] text-[#0D0D0B]" 
                        : "bg-[#2A2A25] text-[#FAFAF7]/70 hover:text-[#FAFAF7]"
                    }`}
                  >
                    Company View
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Input Display */}
                <div className="mb-6 p-4 rounded-xl bg-[#2A2A25] border border-[#3A3A35]">
                  {perspective === "creator" ? (
                    <div>
                      <p className="text-xs text-[#FAFAF7]/50 mb-2">ANALYZING CREATOR PROFILE</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9943A] to-[#8B6914] flex items-center justify-center">
                          <span className="text-[#0D0D0B] font-bold">JD</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#FAFAF7]">@JohnDoeVlogs</p>
                          <p className="text-xs text-[#FAFAF7]/60">Comedy/Lifestyle • 820K subs • US audience</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-[#FAFAF7]/50 mb-2">COMPANY CAMPAIGN BRIEF</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#3366FF] flex items-center justify-center">
                          <span className="text-white font-bold text-xs">VPN</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#FAFAF7]">NordVPN Campaign</p>
                          <p className="text-xs text-[#FAFAF7]/60">Budget: $50K • Target: Tech-savvy 18-35</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Results */}
                <div className="space-y-3">
                  <AnimatePresence>
                    {matches.slice(0, visibleMatches).map((match, index) => (
                      <motion.div
                        key={perspective === "creator" ? (match as typeof creatorMatches[0]).company : (match as typeof companyMatches[0]).creator}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-[#2A2A25] border border-[#3A3A35] hover:border-[#C9943A]/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: perspective === "creator" ? (match as typeof creatorMatches[0]).color : "#C9943A" }}
                          >
                            <span className="text-white font-bold text-xs">
                              {perspective === "creator" 
                                ? (match as typeof creatorMatches[0]).company.charAt(0) 
                                : (match as typeof companyMatches[0]).creator.charAt(1).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#FAFAF7]">
                              {perspective === "creator" 
                                ? (match as typeof creatorMatches[0]).company 
                                : (match as typeof companyMatches[0]).creator}
                            </p>
                            <p className="text-xs text-[#FAFAF7]/60">
                              {perspective === "creator" 
                                ? `${(match as typeof creatorMatches[0]).budget} • ${(match as typeof creatorMatches[0]).category}` 
                                : `${(match as typeof companyMatches[0]).subs} subs • ${(match as typeof companyMatches[0]).engagement} eng`}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={`${
                            match.fit >= 90 
                              ? "bg-[#1A7A4A]/20 text-[#1A7A4A] border-[#1A7A4A]/30" 
                              : match.fit >= 80 
                                ? "bg-[#C9943A]/20 text-[#C9943A] border-[#C9943A]/30"
                                : "bg-[#FAFAF7]/10 text-[#FAFAF7]/70 border-[#FAFAF7]/20"
                          }`}
                        >
                          {match.fit}% Fit
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Run Button */}
                <Button
                  onClick={startSimulation}
                  disabled={isSimulating}
                  className="w-full mt-6 bg-[#C9943A] hover:bg-[#C9943A]/90 text-[#0D0D0B] font-medium"
                >
                  {isSimulating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0D0D0B]/30 border-t-[#0D0D0B] rounded-full animate-spin mr-2" />
                      Finding matches...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Run AI Matching
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
