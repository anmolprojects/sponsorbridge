"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-[#0D0D0B] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9943A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9943A]/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#FAFAF7] leading-tight text-balance">
            Ready to transform your{" "}
            <span className="text-[#C9943A]">sponsorship experience</span>?
          </h2>
          
          <p className="mt-6 text-lg text-[#FAFAF7]/70 max-w-2xl mx-auto text-pretty">
            Join thousands of creators and companies already using SponsorBridge. 
            Start free, scale with confidence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#C9943A] hover:bg-[#C9943A]/90 text-[#0D0D0B] h-14 px-8 text-base">
              <Link href="/creator/signup">
                <Sparkles className="mr-2 h-5 w-5" />
                Join as Creator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-[#FAFAF7]/20 text-[#FAFAF7] hover:bg-[#FAFAF7]/10 h-14 px-8 text-base">
              <Link href="/company/signup">
                <Shield className="mr-2 h-5 w-5" />
                Start Company Trial
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8 text-sm text-[#FAFAF7]/60">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google OAuth Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#1A7A4A]" />
              <span>Escrow Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#C9943A]" />
              <span>AI-Powered</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
