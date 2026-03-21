"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Shield, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9943A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9943A]/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <Badge variant="outline" className="mb-6 border-[#C9943A]/30 text-[#C9943A] bg-[#C9943A]/5">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Sponsorship Marketplace
            </Badge>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1] text-balance">
              The smartest bridge between{" "}
              <span className="text-[#C9943A]">creators</span> and{" "}
              <span className="text-[#C9943A]">companies</span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
              Google OAuth verified stats. Escrow-protected payments. AI-powered matching. 
              The most transparent and affordable sponsorship platform in the market.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-[#0D0D0B] text-[#FAFAF7] hover:bg-[#0D0D0B]/90 h-12 px-8 text-base">
                <Link href="/creator/signup">
                  Join as Creator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#C9943A] text-[#C9943A] hover:bg-[#C9943A] hover:text-[#0D0D0B] h-12 px-8 text-base">
                <Link href="/company/signup">
                  Start Free Trial
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#1A7A4A]" />
                <span>Escrow Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Google OAuth Verified</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Dashboard Card */}
              <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-[#0D0D0B] px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#C0392B]" />
                      <div className="w-3 h-3 rounded-full bg-[#C9943A]" />
                      <div className="w-3 h-3 rounded-full bg-[#1A7A4A]" />
                    </div>
                    <span className="text-[#FAFAF7] text-sm font-medium">Creator Dashboard</span>
                  </div>
                  <Badge className="bg-[#1A7A4A] text-white text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-secondary">
                      <p className="text-2xl font-serif font-semibold text-foreground">$24.5K</p>
                      <p className="text-xs text-muted-foreground mt-1">Total Earnings</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-secondary">
                      <p className="text-2xl font-serif font-semibold text-[#1A7A4A]">98%</p>
                      <p className="text-xs text-muted-foreground mt-1">Delivery Rate</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-secondary">
                      <p className="text-2xl font-serif font-semibold text-[#C9943A]">12</p>
                      <p className="text-xs text-muted-foreground mt-1">Active Deals</p>
                    </div>
                  </div>

                  {/* AI Match Preview */}
                  <div className="border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#C9943A]" />
                        <span className="text-sm font-medium">AI Match Found</span>
                      </div>
                      <Badge variant="outline" className="text-[#1A7A4A] border-[#1A7A4A]">97% Fit</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0D0D0B] flex items-center justify-center">
                        <span className="text-[#C9943A] font-bold text-sm">N</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">NordVPN</p>
                        <p className="text-xs text-muted-foreground">$5,000 - $8,000 • Tech/Security</p>
                      </div>
                    </div>
                  </div>

                  {/* Escrow Status */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#1A7A4A]/10 border border-[#1A7A4A]/20">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-[#1A7A4A]" />
                      <div>
                        <p className="text-sm font-medium text-foreground">$6,500 in Escrow</p>
                        <p className="text-xs text-muted-foreground">Protected until content approved</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-[#1A7A4A] hover:bg-[#1A7A4A]/90 text-white">
                      View
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -left-8 top-1/4 bg-card border border-border rounded-xl p-3 shadow-lg hidden lg:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1A7A4A]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#1A7A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Deal Completed</p>
                    <p className="text-xs text-muted-foreground">+$4,750</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -right-4 bottom-1/4 bg-card border border-border rounded-xl p-3 shadow-lg hidden lg:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C9943A]/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#C9943A]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">New AI Match</p>
                    <p className="text-xs text-muted-foreground">Squarespace • 91%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
