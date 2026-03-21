"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Sparkles, Search, Filter, DollarSign, Users, TrendingUp, 
  MessageSquare, ExternalLink, Star, Building2
} from "lucide-react"

const matches = [
  { 
    id: 1,
    company: "NordVPN", 
    fit: 97, 
    budget: "$5,000 - $8,000", 
    category: "Tech/Security",
    description: "Leading VPN service looking for tech reviewers and privacy-focused creators.",
    audience: "Tech-savvy, privacy-conscious users aged 18-35",
    contentType: "Dedicated Review",
    status: "new",
    verified: true,
    rating: 4.9,
    deals: 156
  },
  { 
    id: 2,
    company: "Squarespace", 
    fit: 91, 
    budget: "$4,000 - $6,000", 
    category: "Website Builder",
    description: "Website builder seeking creators who can showcase their platform to entrepreneurs.",
    audience: "Small business owners, freelancers, creators",
    contentType: "Integrated Mention",
    status: "new",
    verified: true,
    rating: 4.8,
    deals: 234
  },
  { 
    id: 3,
    company: "Raycon", 
    fit: 84, 
    budget: "$3,000 - $5,000", 
    category: "Audio/Tech",
    description: "Premium earbuds brand looking for lifestyle and tech content creators.",
    audience: "Young adults interested in tech and fitness",
    contentType: "Product Review",
    status: "viewed",
    verified: true,
    rating: 4.6,
    deals: 89
  },
  { 
    id: 4,
    company: "HelloFresh", 
    fit: 78, 
    budget: "$2,500 - $4,000", 
    category: "Food/Lifestyle",
    description: "Meal kit delivery service seeking family and lifestyle creators.",
    audience: "Busy professionals and families aged 25-45",
    contentType: "Cooking Demo",
    status: "viewed",
    verified: true,
    rating: 4.7,
    deals: 312
  },
  { 
    id: 5,
    company: "Skillshare", 
    fit: 75, 
    budget: "$2,000 - $3,500", 
    category: "Education",
    description: "Online learning platform looking for creative and educational content creators.",
    audience: "Learners and aspiring creators aged 18-40",
    contentType: "Integrated Mention",
    status: "new",
    verified: true,
    rating: 4.5,
    deals: 445
  },
]

export default function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("fit")

  const filteredMatches = matches
    .filter((match) => {
      if (searchQuery && !match.company.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (categoryFilter !== "all" && match.category !== categoryFilter) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === "fit") return b.fit - a.fit
      if (sortBy === "budget") return parseInt(b.budget.replace(/\D/g, "")) - parseInt(a.budget.replace(/\D/g, ""))
      return 0
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-[#C9943A]" />
            AI Matches
          </h1>
          <p className="text-muted-foreground mt-1">
            Companies matched to your content and audience by our AI
          </p>
        </div>
        <Badge className="bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20 w-fit">
          {matches.filter(m => m.status === "new").length} new matches
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Tech/Security">Tech/Security</SelectItem>
                <SelectItem value="Website Builder">Website Builder</SelectItem>
                <SelectItem value="Audio/Tech">Audio/Tech</SelectItem>
                <SelectItem value="Food/Lifestyle">Food/Lifestyle</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fit">Highest Fit</SelectItem>
                <SelectItem value="budget">Highest Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Match Cards */}
      <div className="space-y-4">
        {filteredMatches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:border-[#C9943A]/30 transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Company Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-[#0D0D0B] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#C9943A] font-bold text-xl">{match.company.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-lg font-semibold text-foreground">{match.company}</h3>
                        {match.verified && (
                          <Badge className="bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20 text-xs">
                            Verified
                          </Badge>
                        )}
                        {match.status === "new" && (
                          <Badge className="bg-[#C9943A] text-[#0D0D0B] text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{match.description}</p>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Audience:</span>
                          <span className="text-foreground">{match.audience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Content:</span>
                          <span className="text-foreground">{match.contentType}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-[#C9943A] fill-[#C9943A]" />
                          <span className="font-medium">{match.rating}</span>
                        </div>
                        <span className="text-muted-foreground">{match.deals} deals completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Match Score & Actions */}
                  <div className="flex flex-col items-center gap-4 lg:w-48">
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                        match.fit >= 90 
                          ? "bg-[#1A7A4A]/10 text-[#1A7A4A]" 
                          : match.fit >= 80 
                            ? "bg-[#C9943A]/10 text-[#C9943A]"
                            : "bg-secondary text-muted-foreground"
                      }`}>
                        <span className="font-serif text-2xl font-bold">{match.fit}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Match Score</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 text-foreground font-medium">
                        <DollarSign className="w-4 h-4" />
                        {match.budget}
                      </div>
                      <p className="text-xs text-muted-foreground">Budget Range</p>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <Button className="w-full bg-[#C9943A] hover:bg-[#C9943A]/90 text-[#0D0D0B]">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
