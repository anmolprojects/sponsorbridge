"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Mail, Lock, Building2, ArrowRight, Shield, Users, TrendingUp } from "lucide-react"

export default function CompanyLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/company/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0D0D0B]">
              <span className="font-serif text-lg font-bold text-[#C9943A]">S</span>
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
              SponsorBridge
            </span>
          </Link>

          <div className="mb-8">
            <Badge className="mb-4 bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20">
              <Building2 className="w-3 h-3 mr-1" />
              Company Portal
            </Badge>
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to manage your creator campaigns
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Work Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link href="/company/forgot-password" className="text-sm text-[#C9943A] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full h-12 bg-[#0D0D0B] text-[#FAFAF7] hover:bg-[#0D0D0B]/90"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#FAFAF7]/30 border-t-[#FAFAF7] rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link href="/company/signup" className="text-[#C9943A] hover:underline font-medium">
              Start free trial
            </Link>
          </p>

          {/* Creator Login Link */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Are you a YouTube creator?
            </p>
            <Link href="/creator/login" className="text-sm text-[#C9943A] hover:underline font-medium">
              Go to Creator Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-[#0D0D0B] items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-[#1A7A4A]/10 flex items-center justify-center mb-8">
            <Building2 className="w-10 h-10 text-[#1A7A4A]" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-[#FAFAF7] mb-4">
            Find your perfect creators
          </h2>
          <p className="text-[#FAFAF7]/70 mb-8">
            Access Google OAuth verified creators, AI-powered matching, and escrow-protected deals.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1A1A17] border border-[#3A3A35]">
              <div className="w-10 h-10 rounded-lg bg-[#C9943A]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#C9943A]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#FAFAF7]">2,500+ Verified Creators</p>
                <p className="text-xs text-[#FAFAF7]/60">All stats verified via Google OAuth</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1A1A17] border border-[#3A3A35]">
              <div className="w-10 h-10 rounded-lg bg-[#1A7A4A]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#1A7A4A]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#FAFAF7]">Escrow Protected</p>
                <p className="text-xs text-[#FAFAF7]/60">Funds only release when content is approved</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1A1A17] border border-[#3A3A35]">
              <div className="w-10 h-10 rounded-lg bg-[#C9943A]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#C9943A]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#FAFAF7]">ROI Tracking</p>
                <p className="text-xs text-[#FAFAF7]/60">Full funnel analytics for every campaign</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
