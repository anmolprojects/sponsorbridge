"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  Sparkles,
  Users,
  Eye,
  TrendingUp,
  Play,
  Heart,
  MessageSquare,
  CheckCircle2,
  SlidersHorizontal,
  X,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const creators = [
  {
    id: 1,
    name: "TechCreator Pro",
    avatar: "TC",
    verified: true,
    subscribers: 245000,
    avgViews: 85000,
    engagement: 8.5,
    categories: ["Technology", "Reviews", "Tutorials"],
    rate: 3500,
    matchScore: 98,
    recentVideos: 156,
    description: "Tech enthusiast creating in-depth reviews and tutorials on software and gadgets.",
  },
  {
    id: 2,
    name: "DevLife Daily",
    avatar: "DD",
    verified: true,
    subscribers: 180000,
    avgViews: 62000,
    engagement: 9.2,
    categories: ["Development", "Tutorials", "Career"],
    rate: 2800,
    matchScore: 95,
    recentVideos: 203,
    description: "Daily dev tips, coding tutorials, and tech career advice for aspiring developers.",
  },
  {
    id: 3,
    name: "StartupStories",
    avatar: "SS",
    verified: true,
    subscribers: 320000,
    avgViews: 110000,
    engagement: 7.8,
    categories: ["Business", "Startups", "Technology"],
    rate: 4200,
    matchScore: 92,
    recentVideos: 89,
    description: "Documenting the startup journey with founder interviews and business insights.",
  },
  {
    id: 4,
    name: "CloudMaster",
    avatar: "CM",
    verified: true,
    subscribers: 156000,
    avgViews: 48000,
    engagement: 10.1,
    categories: ["Cloud", "DevOps", "Tutorials"],
    rate: 2500,
    matchScore: 89,
    recentVideos: 178,
    description: "Cloud computing tutorials and DevOps best practices for modern teams.",
  },
  {
    id: 5,
    name: "AI Insights",
    avatar: "AI",
    verified: true,
    subscribers: 420000,
    avgViews: 145000,
    engagement: 8.9,
    categories: ["AI", "Machine Learning", "Technology"],
    rate: 5500,
    matchScore: 87,
    recentVideos: 134,
    description: "Making AI accessible with clear explanations and practical applications.",
  },
  {
    id: 6,
    name: "ProductHunt Pro",
    avatar: "PP",
    verified: false,
    subscribers: 89000,
    avgViews: 32000,
    engagement: 11.2,
    categories: ["Products", "SaaS", "Reviews"],
    rate: 1800,
    matchScore: 85,
    recentVideos: 245,
    description: "Daily product reviews and SaaS tool breakdowns for productivity enthusiasts.",
  },
]

const categories = [
  "Technology",
  "Development",
  "Business",
  "AI/ML",
  "Cloud/DevOps",
  "Reviews",
  "Tutorials",
  "SaaS",
  "Startups",
  "Career",
]

export default function DiscoverCreatorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [subscriberRange, setSubscriberRange] = useState([50000, 500000])
  const [engagementMin, setEngagementMin] = useState(5)
  const [budgetMax, setBudgetMax] = useState(10000)
  const [sortBy, setSortBy] = useState("matchScore")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const filteredCreators = creators
    .filter((c) => {
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (selectedCategories.length > 0 && !c.categories.some((cat) => selectedCategories.includes(cat))) {
        return false
      }
      if (c.subscribers < subscriberRange[0] || c.subscribers > subscriberRange[1]) {
        return false
      }
      if (c.engagement < engagementMin) {
        return false
      }
      if (c.rate > budgetMax) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === "matchScore") return b.matchScore - a.matchScore
      if (sortBy === "subscribers") return b.subscribers - a.subscribers
      if (sortBy === "engagement") return b.engagement - a.engagement
      if (sortBy === "rate") return a.rate - b.rate
      return 0
    })

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <Label className="text-sm font-medium">Categories</Label>
        <div className="mt-3 flex flex-wrap gap-2">
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
              {selectedCategories.includes(cat) && <CheckCircle2 className="mr-1 h-3 w-3" />}
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Subscriber Range */}
      <div>
        <Label className="text-sm font-medium">Subscriber Range</Label>
        <div className="mt-3 px-2">
          <Slider
            value={subscriberRange}
            onValueChange={setSubscriberRange}
            min={10000}
            max={1000000}
            step={10000}
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{(subscriberRange[0] / 1000).toFixed(0)}K</span>
            <span>{(subscriberRange[1] / 1000).toFixed(0)}K</span>
          </div>
        </div>
      </div>

      {/* Minimum Engagement */}
      <div>
        <Label className="text-sm font-medium">Min. Engagement Rate</Label>
        <div className="mt-3 px-2">
          <Slider
            value={[engagementMin]}
            onValueChange={(v) => setEngagementMin(v[0])}
            min={1}
            max={15}
            step={0.5}
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{engagementMin}%</span>
            <span>15%</span>
          </div>
        </div>
      </div>

      {/* Budget */}
      <div>
        <Label className="text-sm font-medium">Max. Budget (per integration)</Label>
        <div className="mt-3 px-2">
          <Slider
            value={[budgetMax]}
            onValueChange={(v) => setBudgetMax(v[0])}
            min={500}
            max={20000}
            step={500}
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>${budgetMax.toLocaleString()}</span>
            <span>$20,000</span>
          </div>
        </div>
      </div>

      {/* Reset */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([])
          setSubscriberRange([50000, 500000])
          setEngagementMin(5)
          setBudgetMax(10000)
        }}
      >
        Reset Filters
      </Button>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">Find Creators</h1>
        <p className="mt-1 text-muted-foreground">
          Discover the perfect creators for your brand with AI-powered matching
        </p>
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search creators by name, niche, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {selectedCategories.length > 0 && (
                  <Badge className="ml-2 bg-[#C9943A] text-foreground">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FiltersContent />
              </div>
            </SheetContent>
          </Sheet>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="matchScore">Best Match</option>
            <option value="subscribers">Most Subscribers</option>
            <option value="engagement">Highest Engagement</option>
            <option value="rate">Lowest Rate</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => toggleCategory(cat)}
            >
              {cat}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCategories([])}
            className="text-muted-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar Filters (Desktop) */}
        <Card className="hidden h-fit w-72 shrink-0 lg:block">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-lg">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FiltersContent />
          </CardContent>
        </Card>

        {/* Creator Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredCreators.length} creators found
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCreators.map((creator) => (
              <Card key={creator.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <CardContent className="p-0">
                  {/* Header with match score */}
                  <div className="flex items-center justify-between bg-muted/50 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#C9943A]" />
                      <span className="text-sm font-medium text-[#C9943A]">
                        {creator.matchScore}% match
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Creator Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#C9943A] to-[#C9943A]/60 text-lg font-semibold text-background">
                        {creator.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{creator.name}</h3>
                          {creator.verified && (
                            <CheckCircle2 className="h-4 w-4 text-[#1A7A4A]" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {(creator.subscribers / 1000).toFixed(0)}K subscribers
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                      {creator.description}
                    </p>

                    {/* Categories */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {creator.categories.slice(0, 3).map((cat) => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Eye className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {(creator.avgViews / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Avg Views</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingUp className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium">{creator.engagement}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Engagement</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Play className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium">{creator.recentVideos}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Videos</p>
                      </div>
                    </div>

                    {/* Rate & Actions */}
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-foreground">
                          ${creator.rate.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">per integration</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          Contact
                        </Button>
                        <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCreators.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 font-medium text-foreground">No creators found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategories([])
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
