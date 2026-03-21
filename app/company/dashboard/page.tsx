"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Play,
  FileText,
  MessageSquare,
  Search,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const activeCampaigns = [
  {
    id: 1,
    name: "Product Launch Q1",
    creators: 5,
    budget: 25000,
    spent: 18500,
    status: "active",
    impressions: "2.4M",
    engagement: "8.2%",
  },
  {
    id: 2,
    name: "Brand Awareness",
    creators: 3,
    budget: 15000,
    spent: 12000,
    status: "active",
    impressions: "1.8M",
    engagement: "7.5%",
  },
  {
    id: 3,
    name: "Tutorial Series",
    creators: 2,
    budget: 10000,
    spent: 10000,
    status: "completed",
    impressions: "890K",
    engagement: "9.1%",
  },
]

const recommendedCreators = [
  {
    id: 1,
    name: "TechCreator Pro",
    avatar: "TC",
    subscribers: "245K",
    engagement: "8.5%",
    categories: ["Technology", "Reviews"],
    matchScore: 98,
    rate: "$3,500",
  },
  {
    id: 2,
    name: "DevLife Daily",
    avatar: "DD",
    subscribers: "180K",
    engagement: "9.2%",
    categories: ["Development", "Tutorials"],
    matchScore: 95,
    rate: "$2,800",
  },
  {
    id: 3,
    name: "StartupStories",
    avatar: "SS",
    subscribers: "320K",
    engagement: "7.8%",
    categories: ["Business", "Technology"],
    matchScore: 92,
    rate: "$4,200",
  },
]

const pendingDeals = [
  {
    id: 1,
    creator: "CloudReviews",
    title: "Product Integration",
    value: 3500,
    deadline: "Mar 22",
    stage: "Script Review",
  },
  {
    id: 2,
    creator: "TechTutorials",
    title: "Tutorial Video",
    value: 4200,
    deadline: "Mar 25",
    stage: "Negotiation",
  },
]

export default function CompanyDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Welcome back, TechFlow AI
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here&apos;s what&apos;s happening with your campaigns
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/company/dashboard/discover">
              <Search className="mr-2 h-4 w-4" />
              Find Creators
            </Link>
          </Button>
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            <FileText className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">$40,500</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-[#1A7A4A]">
                  <ArrowUpRight className="h-3 w-3" />
                  +12% this month
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9943A]/10">
                <DollarSign className="h-6 w-6 text-[#C9943A]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">3</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  2 pending approval
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reach</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">5.1M</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-[#1A7A4A]">
                  <ArrowUpRight className="h-3 w-3" />
                  +28% vs last month
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A7A4A]/10">
                <Eye className="h-6 w-6 text-[#1A7A4A]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Engagement</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">8.3%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Industry avg: 4.2%
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Active Campaigns */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif">Active Campaigns</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/company/dashboard/campaigns">
                  View All
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">{campaign.name}</h4>
                          <Badge
                            variant="outline"
                            className={
                              campaign.status === "active"
                                ? "bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {campaign.status === "active" ? "Active" : "Completed"}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {campaign.creators} creators • {campaign.impressions} impressions
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {campaign.engagement} engagement
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress
                        value={(campaign.spent / campaign.budget) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommended Creators */}
          <Card className="border-[#C9943A]/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#C9943A]" />
                <CardTitle className="font-serif">AI-Recommended Creators</CardTitle>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/company/dashboard/discover">
                  Discover More
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedCreators.map((creator) => (
                  <div
                    key={creator.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#C9943A] to-[#C9943A]/60 font-semibold text-background">
                        {creator.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{creator.name}</p>
                          <Badge
                            variant="outline"
                            className="bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20"
                          >
                            {creator.matchScore}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {creator.subscribers} subscribers • {creator.engagement} engagement
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{creator.rate}</p>
                        <p className="text-xs text-muted-foreground">per integration</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Pending Deals */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Pending Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{deal.creator}</p>
                      <Badge variant="outline" className="bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20">
                        {deal.stage}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{deal.title}</p>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="font-semibold">${deal.value.toLocaleString()}</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Due {deal.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/company/dashboard/campaigns">
                  View All Deals
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/company/dashboard/discover">
                  <Search className="mr-2 h-4 w-4" />
                  Search Creators
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/company/dashboard/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                  <Badge className="ml-auto bg-[#C9943A] text-foreground">5</Badge>
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/company/dashboard/spending">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Add Funds
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A7A4A]/10">
                    <CheckCircle2 className="h-4 w-4 text-[#1A7A4A]" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      Content approved for TechCreator Pro
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9943A]/10">
                    <Play className="h-4 w-4 text-[#C9943A]" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      New video published by DevLife Daily
                    </p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      New message from StartupStories
                    </p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
