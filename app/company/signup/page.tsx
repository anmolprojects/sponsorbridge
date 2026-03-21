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
import { ArrowLeft, ArrowRight, Check, Building2, Shield, Globe, Mail, Lock, User, DollarSign, Clock, Sparkles, Gift } from "lucide-react"

const industries = [
  "Technology/Software", "E-commerce", "Finance/Fintech", "Health/Wellness",
  "Food/Beverage", "Fashion/Apparel", "Gaming", "Education",
  "Travel/Hospitality", "Entertainment", "Home/Lifestyle", "B2B/SaaS", "Other"
]

const companySizes = [
  "1-10 employees", "11-50 employees", "51-200 employees",
  "201-500 employees", "501-1000 employees", "1000+ employees"
]

const budgetRanges = [
  "Under $1,000/month", "$1,000 - $5,000/month", "$5,000 - $10,000/month",
  "$10,000 - $25,000/month", "$25,000 - $50,000/month", "$50,000+/month"
]

const contentTypes = [
  "Dedicated Video", "Integrated Mention", "Product Review",
  "Tutorial/How-to", "Unboxing", "Livestream", "Short-form (Shorts/Reels)"
]

export default function CompanySignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    industry: "",
    companySize: "",
    productDescription: "",
    targetAudience: "",
    budgetRange: "",
    contentTypes: [] as string[],
    contactName: "",
    contactEmail: "",
    contactRole: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const updateFormData = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleContentType = (type: string) => {
    const current = formData.contentTypes
    if (current.includes(type)) {
      updateFormData("contentTypes", current.filter((t) => t !== type))
    } else {
      updateFormData("contentTypes", [...current, type])
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsComplete(true)
  }

  const canProceedStep1 = formData.companyName && formData.website && formData.industry && formData.companySize
  const canProceedStep2 = formData.productDescription && formData.targetAudience && formData.budgetRange && formData.contentTypes.length > 0
  const canProceedStep3 = formData.contactName && formData.contactEmail && formData.password && formData.password === formData.confirmPassword && formData.agreeToTerms

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#1A7A4A]/10 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-[#1A7A4A]" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">
            Verification Pending
          </h1>
          <p className="text-muted-foreground mb-6">
            Your company account has been created. We're verifying your business details. 
            This typically takes 1-2 business days.
          </p>
          
          <div className="bg-[#C9943A]/5 border border-[#C9943A]/20 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-[#C9943A]" />
              <span className="text-sm font-medium text-foreground">30-Day Free Trial Activated</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your free trial starts once verification is complete. No credit card required.
            </p>
          </div>

          <div className="bg-secondary rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Check your email</span>
            </div>
            <p className="text-sm text-muted-foreground">
              We've sent a confirmation to {formData.contactEmail}. You'll receive another email once verification is complete.
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
            <Link href="/company/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Already have an account? <span className="text-[#C9943A]">Sign in</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Free Trial Banner */}
        <div className="bg-[#1A7A4A]/5 border border-[#1A7A4A]/20 rounded-xl p-4 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1A7A4A]/10 flex items-center justify-center flex-shrink-0">
            <Gift className="w-6 h-6 text-[#1A7A4A]" />
          </div>
          <div>
            <p className="font-medium text-foreground">30-Day Free Trial</p>
            <p className="text-sm text-muted-foreground">No credit card required. Full access to all features.</p>
          </div>
        </div>

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
            <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>Company</span>
            <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>Campaign</span>
            <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>Contact</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Company Details */}
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
                  <Building2 className="w-3 h-3 mr-1" />
                  Step 1 of 3
                </Badge>
                <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  Tell us about your company
                </h1>
                <p className="text-muted-foreground">
                  This helps us verify your business and match you with the right creators
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="text-sm font-medium">Company Name</Label>
                  <div className="relative mt-1">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      placeholder="Acme Inc."
                      value={formData.companyName}
                      onChange={(e) => updateFormData("companyName", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website" className="text-sm font-medium">Company Website</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="https://yourcompany.com"
                      value={formData.website}
                      onChange={(e) => updateFormData("website", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">We'll verify your business through your website</p>
                </div>

                <div>
                  <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
                  <Select value={formData.industry} onValueChange={(v) => updateFormData("industry", v)}>
                    <SelectTrigger className="h-11 mt-1">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="companySize" className="text-sm font-medium">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(v) => updateFormData("companySize", v)}>
                    <SelectTrigger className="h-11 mt-1">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

          {/* Step 2: Campaign Details */}
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
                  <Sparkles className="w-3 h-3 mr-1" />
                  Step 2 of 3
                </Badge>
                <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  Define your campaign
                </h1>
                <p className="text-muted-foreground">
                  Help our AI find the perfect creators for your product
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="productDescription" className="text-sm font-medium">Product/Service Description</Label>
                  <Textarea
                    id="productDescription"
                    placeholder="Describe what your company offers and what you want to promote..."
                    value={formData.productDescription}
                    onChange={(e) => updateFormData("productDescription", e.target.value)}
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="targetAudience" className="text-sm font-medium">Target Audience</Label>
                  <Textarea
                    id="targetAudience"
                    placeholder="Describe your ideal customer (age, interests, location, etc.)..."
                    value={formData.targetAudience}
                    onChange={(e) => updateFormData("targetAudience", e.target.value)}
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <div>
                  <Label htmlFor="budgetRange" className="text-sm font-medium">Monthly Sponsorship Budget</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select value={formData.budgetRange} onValueChange={(v) => updateFormData("budgetRange", v)}>
                      <SelectTrigger className="h-11 pl-10">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Preferred Content Types</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {contentTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleContentType(type)}
                        className={`p-3 rounded-lg border text-sm text-left transition-colors ${
                          formData.contentTypes.includes(type)
                            ? "border-[#C9943A] bg-[#C9943A]/5 text-foreground"
                            : "border-border hover:border-[#C9943A]/50 text-muted-foreground"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Select all that apply</p>
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

          {/* Step 3: Contact Details */}
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
                  <User className="w-3 h-3 mr-1" />
                  Step 3 of 3
                </Badge>
                <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
                  Contact details
                </h1>
                <p className="text-muted-foreground">
                  Who will be managing your creator partnerships?
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="contactName" className="text-sm font-medium">Your Full Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="contactName"
                      placeholder="John Smith"
                      value={formData.contactName}
                      onChange={(e) => updateFormData("contactName", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactEmail" className="text-sm font-medium">Work Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.contactEmail}
                      onChange={(e) => updateFormData("contactEmail", e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactRole" className="text-sm font-medium">Your Role (Optional)</Label>
                  <Input
                    id="contactRole"
                    placeholder="Marketing Manager"
                    value={formData.contactRole}
                    onChange={(e) => updateFormData("contactRole", e.target.value)}
                    className="h-11 mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium">Create Password</Label>
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

                <div className="pt-4 border-t border-border">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      I agree to the <Link href="/terms" className="text-[#C9943A] hover:underline">Terms of Service</Link> and{" "}
                      <Link href="/privacy" className="text-[#C9943A] hover:underline">Privacy Policy</Link>. 
                      I understand that after the 30-day free trial, the subscription is $5/month.
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
                      Start Free Trial
                      <Gift className="ml-2 h-4 w-4" />
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
