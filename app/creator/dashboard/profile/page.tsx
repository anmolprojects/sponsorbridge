"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Youtube,
  CheckCircle2,
  Plus,
  X,
  Camera,
  Globe,
  Twitter,
  Instagram,
  Save,
  Eye,
  Users,
  Play,
  TrendingUp,
} from "lucide-react"

const categories = [
  "Technology",
  "Gaming",
  "Lifestyle",
  "Education",
  "Finance",
  "Health & Fitness",
  "Travel",
  "Food",
  "Entertainment",
  "Business",
]

const sponsorshipTypes = [
  { id: "integration", label: "Product Integration", description: "Feature product naturally in content" },
  { id: "dedicated", label: "Dedicated Video", description: "Full video focused on sponsor" },
  { id: "mention", label: "Brand Mention", description: "Brief mention with call-to-action" },
  { id: "review", label: "Honest Review", description: "Authentic product review" },
  { id: "tutorial", label: "Tutorial/How-To", description: "Educational content featuring product" },
]

export default function CreatorProfilePage() {
  const [selectedCategories, setSelectedCategories] = useState(["Technology", "Education"])
  const [selectedTypes, setSelectedTypes] = useState(["integration", "review", "tutorial"])
  const [isPublic, setIsPublic] = useState(true)

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Creator Profile</h1>
          <p className="mt-1 text-muted-foreground">Manage your public profile and preferences</p>
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

      {/* YouTube Connected */}
      <Card className="border-[#1A7A4A]/20 bg-[#1A7A4A]/5">
        <CardContent className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF0000]">
              <Youtube className="h-6 w-6 text-background" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">TechCreator Pro</p>
                <CheckCircle2 className="h-4 w-4 text-[#1A7A4A]" />
                <Badge variant="outline" className="bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20">
                  Verified
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Connected via Google OAuth</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <p className="font-semibold text-foreground">245K</p>
              <p className="text-muted-foreground">Subscribers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">1.2M</p>
              <p className="text-muted-foreground">Views/Month</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">8.5%</p>
              <p className="text-muted-foreground">Engagement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Basic Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Profile Picture & Bio */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Basic Information</CardTitle>
              <CardDescription>This information will be shown to potential sponsors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#C9943A] to-[#C9943A]/60" />
                  <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    defaultValue="TechCreator Pro"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  defaultValue="Tech enthusiast creating in-depth tutorials and reviews on the latest software, gadgets, and productivity tools. Helping viewers make informed decisions about technology."
                  className="mt-1.5"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Write a compelling bio that highlights your unique value proposition
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="San Francisco, CA" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="language">Primary Language</Label>
                  <Input id="language" defaultValue="English" className="mt-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Content Categories</CardTitle>
              <CardDescription>Select categories that best describe your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    className={`cursor-pointer transition-colors ${
                      selectedCategories.includes(cat)
                        ? "border-[#C9943A] bg-[#C9943A]/10 text-[#C9943A]"
                        : "hover:border-[#C9943A]/50"
                    }`}
                    onClick={() => toggleCategory(cat)}
                  >
                    {selectedCategories.includes(cat) && (
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                    )}
                    {cat}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sponsorship Types */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Sponsorship Types</CardTitle>
              <CardDescription>Select the types of sponsorships you offer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sponsorshipTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                      selectedTypes.includes(type.id)
                        ? "border-[#C9943A] bg-[#C9943A]/5"
                        : "border-border hover:border-[#C9943A]/50"
                    }`}
                    onClick={() => toggleType(type.id)}
                  >
                    <div>
                      <p className="font-medium text-foreground">{type.label}</p>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    <Switch checked={selectedTypes.includes(type.id)} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rate Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Rate Card</CardTitle>
              <CardDescription>Set your pricing for different sponsorship types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="integrationRate">Product Integration</Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="integrationRate" defaultValue="3500" className="pl-7" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dedicatedRate">Dedicated Video</Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="dedicatedRate" defaultValue="8000" className="pl-7" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="mentionRate">Brand Mention</Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="mentionRate" defaultValue="1500" className="pl-7" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reviewRate">Honest Review</Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="reviewRate" defaultValue="4500" className="pl-7" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  These rates are visible to potential sponsors. You can negotiate individual deals.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Settings & Social */}
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
                  <p className="text-sm text-muted-foreground">Allow companies to find you</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Social Links</CardTitle>
              <CardDescription>Add your other social profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input defaultValue="https://techcreatorpro.com" className="mt-1.5" />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Label>
                <Input defaultValue="@techcreatorpro" className="mt-1.5" />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Label>
                <Input defaultValue="@techcreatorpro" className="mt-1.5" />
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Social Link
              </Button>
            </CardContent>
          </Card>

          {/* Stats Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Your Stats</CardTitle>
              <CardDescription>Auto-synced from YouTube</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Subscribers</span>
                </div>
                <span className="font-semibold">245,000</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Avg. Views</span>
                </div>
                <span className="font-semibold">85,000</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Engagement</span>
                </div>
                <span className="font-semibold">8.5%</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Play className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Videos</span>
                </div>
                <span className="font-semibold">156</span>
              </div>
              <p className="pt-2 text-xs text-muted-foreground">
                Last synced: Today at 2:45 PM
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
