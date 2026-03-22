"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Youtube,
  Shield,
  DollarSign,
  Globe,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const niches = [
  "Tech/Reviews", "Gaming", "Comedy/Entertainment", "Lifestyle/Vlog",
  "Education", "Beauty/Fashion", "Fitness/Health", "Food/Cooking",
  "Travel", "Music", "Finance/Business", "DIY/Crafts", "Other",
]

const subscriberRanges = [
  "Under 10K", "10K - 50K", "50K - 100K", "100K - 500K",
  "500K - 1M", "1M - 5M", "5M+",
]

const countries = [
  "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "India", "Brazil", "Japan", "Other",
]

const paymentMethods = [
  "Bank Transfer (ACH)", "PayPal", "Wise", "Stripe",
]

export default function CreatorOnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(2) // starts at step 2 — Google already did step 1
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userName, setUserName] = useState("")

  const [formData, setFormData] = useState({
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

  // Verify user is logged in and is a creator
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.replace("/creator/login")
        return
      }

      // Check they haven't already completed onboarding
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, onboarding_complete, full_name")
        .eq("id", user.id)
        .single()

      if (!profile || profile.role !== "creator") {
        router.replace("/creator/login")
        return
      }

      if (profile.onboarding_complete) {
        router.replace("/creator/dashboard")
        return
      }

      setUserName(profile.full_name || user.email?.split("@")[0] || "")
      setLoading(false)
    }

    checkUser()
  }, [router])

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceedStep2 =
    formData.youtubeUrl &&
    formData.niche &&
    formData.subscriberRange &&
    formData.minimumRate

  const canProceedStep3 =
    formData.country &&
    formData.paymentMethod &&
    formData.agreeToTerms &&
    formData.agreeToVerification

  const handleFinish = async () => {
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.replace("/creator/login")
      return
    }

    // 1. Update creator_profiles with all collected data
    const { error: creatorError } = await supabase
      .from("creator_profiles")
      .update({
        youtube_channel_url: formData.youtubeUrl,
        niche: formData.niche,
        subscriber_range: formData.subscriberRange,
        minimum_rate: parseFloat(formData.minimumRate) || 0,
        country: formData.country,
        payment_method: formData.paymentMethod,
        bio: formData.bio || null,
        verification_status: "pending",
      })
      .eq("id", user.id)

    if (creatorError) {
      setError("Failed to save your details. Please try again.")
      setSaving(false)
      return
    }

    // 2. Mark onboarding complete on the base profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ onboarding_complete: true })
      .eq("id", user.id)

    if (profileError) {
      setError("Failed to complete setup. Please try again.")
      setSaving(false)
      return
    }

    // 3. Done — go to dashboard
    router.push("/creator/dashboard?welcome=true")
  }

  // ── Loading state ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
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
            {userName && (
              <p className="text-sm text-muted-foreground">
                Setting up account for{" "}
                <span className="text-foreground font-medium">{userName}</span>
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Progress steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                    s < step
                      ? "bg-[#1A7A4A] text-white"   // completed
                      : s === step
                      ? "bg-[#0D0D0B] text-[#FAFAF7]" // current
                      : "bg-secondary text-muted-foreground" // upcoming
                  }`}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`hidden sm:block w-24 lg:w-32 h-0.5 mx-2 transition-colors ${
                      s < step ? "bg-[#1A7A4A]" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#1A7A4A] font-medium">
              ✓ Account
            </span>
            <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>
              Channel
            </span>
            <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>
              Details
            </span>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ── STEP 2: Channel Details ────────────────────────────── */}
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
                  Step 2 of 3 — Channel Info
                </Badge>
                <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  Connect your channel
                </h1>
                <p className="text-muted-foreground">
                  We&apos;ll verify your stats through YouTube&apos;s API
                </p>
              </div>

              {/* Verification notice */}
              <div className="bg-[#1A7A4A]/5 border border-[#1A7A4A]/20 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#1A7A4A] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Google OAuth Verification
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your stats will be pulled directly from YouTube&apos;s API.
                      Companies see verified, real-time data — no fake numbers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="youtubeUrl">YouTube Channel URL</Label>
                  <div className="relative mt-1">
                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="youtubeUrl"
                      placeholder="https://youtube.com/@yourchannel"
                      value={formData.youtubeUrl}
                      onChange={(e) => update("youtubeUrl", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div>
                  <Label>Content Niche</Label>
                  <Select
                    value={formData.niche}
                    onValueChange={(v) => update("niche", v)}
                  >
                    <SelectTrigger className="h-11 mt-1">
                      <SelectValue placeholder="Select your primary niche" />
                    </SelectTrigger>
                    <SelectContent>
                      {niches.map((n) => (
                        <SelectItem key={n} value={n}>{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Subscriber Range</Label>
                  <Select
                    value={formData.subscriberRange}
                    onValueChange={(v) => update("subscriberRange", v)}
                  >
                    <SelectTrigger className="h-11 mt-1">
                      <SelectValue placeholder="Select your subscriber range" />
                    </SelectTrigger>
                    <SelectContent>
                      {subscriberRanges.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    This will be verified via Google OAuth
                  </p>
                </div>

                <div>
                  <Label htmlFor="minimumRate">
                    Minimum Rate per Sponsorship
                  </Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="minimumRate"
                      type="number"
                      min="0"
                      placeholder="1000"
                      value={formData.minimumRate}
                      onChange={(e) => update("minimumRate", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Companies below this budget won&apos;t be matched with you
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="w-full mt-8 h-12 bg-[#0D0D0B] text-[#FAFAF7] hover:bg-[#0D0D0B]/90"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* ── STEP 3: Final Details ──────────────────────────────── */}
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
                  Step 3 of 3 — Final Details
                </Badge>
                <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  Almost there!
                </h1>
                <p className="text-muted-foreground">
                  Just a few more details to complete your profile
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Country</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select
                      value={formData.country}
                      onValueChange={(v) => update("country", v)}
                    >
                      <SelectTrigger className="h-11 pl-10">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Preferred Payment Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(v) => update("paymentMethod", v)}
                  >
                    <SelectTrigger className="h-11 mt-1">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bio">
                    Bio{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell companies about yourself and your content..."
                    value={formData.bio}
                    onChange={(e) => update("bio", e.target.value)}
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(c) =>
                        update("agreeToTerms", c as boolean)
                      }
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#C9943A] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#C9943A] hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeToVerification"
                      checked={formData.agreeToVerification}
                      onCheckedChange={(c) =>
                        update("agreeToVerification", c as boolean)
                      }
                    />
                    <label
                      htmlFor="agreeToVerification"
                      className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                    >
                      I understand that my YouTube stats will be verified via
                      Google OAuth and displayed to potential sponsors
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  disabled={saving}
                  className="h-12"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleFinish}
                  disabled={!canProceedStep3 || saving}
                  className="flex-1 h-12 bg-[#C9943A] text-[#0D0D0B] hover:bg-[#C9943A]/90"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Setting up your account...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <Check className="ml-2 h-4 w-4" />
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
