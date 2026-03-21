"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Check, Sparkles, Shield, Youtube, Mail, Lock, User, Globe, DollarSign, Clock } from "lucide-react"

const niches = [
  "Tech/Reviews", "Gaming", "Comedy/Entertainment", "Lifestyle/Vlog", 
  "Education", "Beauty/Fashion", "Fitness/Health", "Food/Cooking",
  "Travel", "Music", "Finance/Business", "DIY/Crafts", "Other"
]

const subscriberRanges = [
  "Under 10K", "10K - 50K", "50K - 100K", "100K - 500K", 
  "500K - 1M", "1M - 5M", "5M+"
]

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", 
  "Germany", "France", "India", "Brazil", "Japan", "Other"
]

const paymentMethods = [
  "Bank Transfer (ACH)", "PayPal", "Wise", "Stripe"
]

export default function CreatorSignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    youtubeUrl: "",
    niche: "",
    subscriberRange: "",
    minimumRate: "",
    country: "",
    paymentMethod: "",
    bio: "",
    agreeToTerms: false,
    agreeToVerification: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGoogleSignIn = () => {
    // Simulate Google OAuth flow
    updateFormData("email", "creator@gmail.com")
    updateFormData("fullName", "John Doe")
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsComplete(true)
  }

  const canProceedStep1 = formData.fullName && formData.email && formData.password && formData.password === formData.confirmPassword
  const canProceedStep2 = formData.youtubeUrl && formData.niche && formData.subscriberRange && formData.minimumRate
  const canProceedStep3 = formData.country && formData.paymentMethod && formData.agreeToTerms && formData.agreeToVerification

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#C9943A]/10 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-[#C9943A]" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">
            Verification Pending
          </h1>
          <p className="text-muted-foreground mb-6">
            Your account has been created. We're now verifying your YouTube channel through Google OAuth. 
            This typically takes 1-2 business days.
          </p>
          <div className="bg-[#C9943A]/5 border border-[#C9943A]/20 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-[#C9943A]" />
              <span className="text-sm font-medium text-foreground">Check your email</span>
            </div>
            <p className="text-sm text-muted-foreground">
              We've sent a confirmation to {formData.email}. You'll receive another email once verification is complete.
            </p>
          </div>
          <Button asChild className="bg-[#0D0D0B] text-[#FAFAF7]">
            <Link href="/">Return to Home</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0D0D0B]">
                <span className="font-serif text-lg font-bold text-[#C9943A]">S</span>
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
                SponsorBridge
              </span>
            </Link>
            <Link href="/creator/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Already have an account? <span className="text-[#C9943A]">Sign in</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                    step >= s
                      ? "bg-[#0D0D0B] text-[#FAFAF7]"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`hidden sm:block w-24 lg:w-32 h-0.5 mx-2 transition-colors ${
                      step > s ? "bg-[#0D0D0B]" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>Account</span>
            <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>Channel</span>
            <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>Details</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Account Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Step 1 of 3
                </Badge>
                <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  Create your account
                </h1>
                <p className="text-muted-foreground">
                  Start your journey to verified sponsorships
                </p>
              </div>

              {/* Google OAuth Button */}
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full h-12 mb-6 border-border hover:bg-secondary"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-[#C0392B] mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full mt-8 h-12 bg-[#0D0D0B] text-[#FAFAF7] hover:bg-[#0D0D0B]/90"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Channel Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20">
                  <Youtube className="w-3 h-3 mr-1" />
                  Step 2 of 3
                </Badge>
                <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  Connect your channel
                </h1>
                <p className="text-muted-foreground">
                  We'll verify your stats through Google OAuth
                </p>
              </div>

              <div className="bg-[#1A7A4A]/5 border border-[#1A7A4A]/20 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#1A7A4A] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Google OAuth Verification</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your stats will be pulled directly from YouTube's API. Companies will see verified, real-time data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="youtubeUrl" className="text-sm font-medium">YouTube Channel URL</Label>
                  <div className="relative mt-1">
                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="youtubeUrl"
                      placeholder="https://youtube.com/@yourchannel"
                      value={formData.youtubeUrl}
                      onChange={(e) => updateFormData("youtubeUrl", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="niche" className="text-sm font-medium">Content Niche</Label>
                  <Select value={formData.niche} onValueChange={(v) => updateFormData("niche", v)}>
                    <SelectTrigger className="h-11 mt-1">
                      <SelectValue placeholder="Select your primary niche" />
                    </SelectTrigger>
                    <SelectContent>
                      {niches.map((niche) => (
                        <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subscriberRange" className="text-sm font-medium">Subscriber Range</Label>
                  <Select value={formData.subscriberRange} onValueChange={(v) => updateFormData("subscriberRange", v)}>
                    <SelectTrigger className="h-11 mt-1">
                      <SelectValue placeholder="Select your subscriber range" />
                    </SelectTrigger>
                    <SelectContent>
                      {subscriberRanges.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">This will be verified via Google OAuth</p>
                </div>

                <div>
                  <Label htmlFor="minimumRate" className="text-sm font-medium">Minimum Rate per Sponsorship</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="minimumRate"
                      type="number"
                      placeholder="1000"
                      value={formData.minimumRate}
                      onChange={(e) => updateFormData("minimumRate", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Companies below this budget won't be matched with you</p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="h-12"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 h-12 bg-[#0D0D0B] text-[#FAFAF7] hover:bg-[#0D0D0B]/90"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Final Details */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20">
                  <Check className="w-3 h-3 mr-1" />
                  Step 3 of 3
                </Badge>
                <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  Final details
                </h1>
                <p className="text-muted-foreground">
                  Almost there! Just a few more details.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="country" className="text-sm font-medium">Country</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select value={formData.country} onValueChange={(v) => updateFormData("country", v)}>
                      <SelectTrigger className="h-11 pl-10">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="paymentMethod" className="text-sm font-medium">Preferred Payment Method</Label>
                  <Select value={formData.paymentMethod} onValueChange={(v) => updateFormData("paymentMethod", v)}>
                    <SelectTrigger className="h-11 mt-1">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>{method}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-sm font-medium">Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell companies about yourself and your content..."
                    value={formData.bio}
                    onChange={(e) => updateFormData("bio", e.target.value)}
                    className="mt-1 min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">This will be visible on your public profile</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      I agree to the <Link href="/terms" className="text-[#C9943A] hover:underline">Terms of Service</Link> and{" "}
                      <Link href="/privacy" className="text-[#C9943A] hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeToVerification"
                      checked={formData.agreeToVerification}
                      onCheckedChange={(checked) => updateFormData("agreeToVerification", checked as boolean)}
                    />
                    <label htmlFor="agreeToVerification" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      I understand that my YouTube stats will be verified via Google OAuth and displayed publicly
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="h-12"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedStep3 || isSubmitting}
                  className="flex-1 h-12 bg-[#C9943A] text-[#0D0D0B] hover:bg-[#C9943A]/90"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0D0D0B]/30 border-t-[#0D0D0B] rounded-full animate-spin mr-2" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <Sparkles className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
