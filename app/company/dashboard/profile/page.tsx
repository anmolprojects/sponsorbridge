"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Building2,
  Camera,
  Globe,
  Twitter,
  Linkedin,
  Save,
  Eye,
  Plus,
  CheckCircle2,
  Users,
  DollarSign,
  Target,
} from "lucide-react"

const industries = [
  "Technology",
  "SaaS",
  "E-commerce",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Consumer Goods",
  "Gaming",
  "Media",
]

const targetAudiences = [
  "Developers",
  "Entrepreneurs",
  "Small Business",
  "Enterprise",
  "Students",
  "Professionals",
  "Consumers",
  "Creators",
]

export default function CompanyProfilePage() {
  const [selectedIndustries, setSelectedIndustries] = useState(["Technology", "SaaS"])
  const [selectedAudiences, setSelectedAudiences] = useState(["Developers", "Entrepreneurs"])
  const [isPublic, setIsPublic] = useState(true)

  const toggleIndustry = (ind: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    )
  }

  const toggleAudience = (aud: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(aud) ? prev.filter((a) => a !== aud) : [...prev, aud]
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Company Profile</h1>
          <p className="mt-1 text-muted-foreground">Manage your company information and preferences</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Company Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Company Information</CardTitle>
              <CardDescription>This information will be shown to creators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-foreground text-3xl font-bold text-background">
                    TF
                  </div>
                  <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#C9943A] text-foreground">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    defaultValue="TechFlow AI"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  defaultValue="AI-powered workflow automation for modern teams"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  defaultValue="TechFlow AI helps teams automate repetitive tasks and streamline workflows using cutting-edge artificial intelligence. Our platform integrates with 100+ tools and saves teams an average of 20 hours per week."
                  className="mt-1.5"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Describe your company and what makes it unique
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="founded">Founded</Label>
                  <Input id="founded" defaultValue="2023" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="size">Company Size</Label>
                  <Input id="size" defaultValue="50-100 employees" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="location">Headquarters</Label>
                  <Input id="location" defaultValue="San Francisco, CA" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="funding">Funding Stage</Label>
                  <Input id="funding" defaultValue="Series A" className="mt-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industries */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Industry</CardTitle>
              <CardDescription>Select your company&apos;s industry focus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <Badge
                    key={ind}
                    variant="outline"
                    className={`cursor-pointer transition-colors ${
                      selectedIndustries.includes(ind)
                        ? "border-[#C9943A] bg-[#C9943A]/10 text-[#C9943A]"
                        : "hover:border-[#C9943A]/50"
                    }`}
                    onClick={() => toggleIndustry(ind)}
                  >
                    {selectedIndustries.includes(ind) && (
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                    )}
                    {ind}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Target Audience */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Target Audience</CardTitle>
              <CardDescription>Who are you trying to reach with sponsorships?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {targetAudiences.map((aud) => (
                  <Badge
                    key={aud}
                    variant="outline"
                    className={`cursor-pointer transition-colors ${
                      selectedAudiences.includes(aud)
                        ? "border-[#C9943A] bg-[#C9943A]/10 text-[#C9943A]"
                        : "hover:border-[#C9943A]/50"
                    }`}
                    onClick={() => toggleAudience(aud)}
                  >
                    {selectedAudiences.includes(aud) && (
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                    )}
                    {aud}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sponsorship Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Sponsorship Goals</CardTitle>
              <CardDescription>Help creators understand what you&apos;re looking for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="goals">Campaign Goals</Label>
                <Textarea
                  id="goals"
                  rows={3}
                  defaultValue="Looking for authentic product integrations with tech-focused creators who can demonstrate our AI workflow automation in action. Prefer educational content that shows real use cases."
                  className="mt-1.5"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="avgBudget">Average Budget per Campaign</Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input id="avgBudget" defaultValue="15,000" className="pl-7" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="frequency">Campaign Frequency</Label>
                  <Input id="frequency" defaultValue="Monthly" className="mt-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Profile Visibility */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Profile Visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Public Profile</p>
                  <p className="text-sm text-muted-foreground">Allow creators to find you</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
            </CardContent>
          </Card>

          {/* Social & Web Links */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Links</CardTitle>
              <CardDescription>Add your company&apos;s web presence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input defaultValue="https://techflow.ai" className="mt-1.5" />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Label>
                <Input defaultValue="@techflowai" className="mt-1.5" />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Label>
                <Input defaultValue="company/techflow-ai" className="mt-1.5" />
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Your Stats</CardTitle>
              <CardDescription>Platform activity overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Campaigns</span>
                </div>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Creators Worked With</span>
                </div>
                <span className="font-semibold">28</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Total Spent</span>
                </div>
                <span className="font-semibold">$113,600</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Completion Rate</span>
                </div>
                <span className="font-semibold">98%</span>
              </div>
              <p className="pt-2 text-xs text-muted-foreground">
                Member since October 2025
              </p>
            </CardContent>
          </Card>

          {/* Verification */}
          <Card className="border-[#1A7A4A]/20 bg-[#1A7A4A]/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A7A4A]/10">
                  <CheckCircle2 className="h-5 w-5 text-[#1A7A4A]" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Verified Company</p>
                  <p className="text-sm text-muted-foreground">
                    Your company has been verified
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
