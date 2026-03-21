"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  Eye,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ArrowUpRight,
  MoreVertical,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const campaigns = [
  {
    id: 1,
    name: "Product Launch Q1",
    description: "Launch campaign for our new AI workflow tool",
    status: "active",
    budget: 25000,
    spent: 18500,
    creators: [
      { name: "TechCreator Pro", avatar: "TC", status: "delivered" },
      { name: "DevLife Daily", avatar: "DD", status: "in_progress" },
      { name: "AI Insights", avatar: "AI", status: "in_progress" },
      { name: "CloudMaster", avatar: "CM", status: "pending" },
      { name: "StartupStories", avatar: "SS", status: "pending" },
    ],
    metrics: {
      impressions: 2400000,
      clicks: 86000,
      engagement: 8.2,
      conversions: 1240,
    },
    startDate: "Feb 15, 2026",
    endDate: "Apr 15, 2026",
  },
  {
    id: 2,
    name: "Brand Awareness",
    description: "Increase brand visibility in developer community",
    status: "active",
    budget: 15000,
    spent: 12000,
    creators: [
      { name: "DevLife Daily", avatar: "DD", status: "delivered" },
      { name: "ProductHunt Pro", avatar: "PP", status: "delivered" },
      { name: "CloudMaster", avatar: "CM", status: "in_progress" },
    ],
    metrics: {
      impressions: 1800000,
      clicks: 54000,
      engagement: 7.5,
      conversions: 890,
    },
    startDate: "Jan 20, 2026",
    endDate: "Mar 30, 2026",
  },
  {
    id: 3,
    name: "Tutorial Series",
    description: "Educational content series on using our platform",
    status: "completed",
    budget: 10000,
    spent: 10000,
    creators: [
      { name: "TechCreator Pro", avatar: "TC", status: "delivered" },
      { name: "CloudMaster", avatar: "CM", status: "delivered" },
    ],
    metrics: {
      impressions: 890000,
      clicks: 42000,
      engagement: 9.1,
      conversions: 650,
    },
    startDate: "Dec 1, 2025",
    endDate: "Feb 28, 2026",
  },
  {
    id: 4,
    name: "Summer Launch",
    description: "Upcoming summer product launch campaign",
    status: "draft",
    budget: 30000,
    spent: 0,
    creators: [],
    metrics: {
      impressions: 0,
      clicks: 0,
      engagement: 0,
      conversions: 0,
    },
    startDate: "Jun 1, 2026",
    endDate: "Aug 31, 2026",
  },
]

const statusConfig = {
  active: { label: "Active", color: "bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20", icon: Play },
  paused: { label: "Paused", color: "bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20", icon: Pause },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: Clock },
}

const creatorStatusConfig = {
  delivered: { color: "bg-[#1A7A4A]" },
  in_progress: { color: "bg-[#C9943A]" },
  pending: { color: "bg-muted-foreground" },
}

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredCampaigns = activeTab === "all"
    ? campaigns
    : campaigns.filter((c) => c.status === activeTab)

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0)
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Campaigns</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and track all your sponsorship campaigns
          </p>
        </div>
        <Button className="bg-[#C9943A] text-foreground hover:bg-[#C9943A]/90">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C9943A]/10">
                <DollarSign className="h-5 w-5 text-[#C9943A]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-semibold">${totalBudget.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A7A4A]/10">
                <TrendingUp className="h-5 w-5 text-[#1A7A4A]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-semibold">${totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Play className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-semibold">{activeCampaigns}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Creators</p>
                <p className="text-2xl font-semibold">
                  {campaigns.reduce((sum, c) => sum + c.creators.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => {
              const StatusIcon = statusConfig[campaign.status as keyof typeof statusConfig].icon
              return (
                <Card key={campaign.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Campaign Info */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-foreground">
                                {campaign.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className={statusConfig[campaign.status as keyof typeof statusConfig].color}
                              >
                                <StatusIcon className="mr-1 h-3 w-3" />
                                {statusConfig[campaign.status as keyof typeof statusConfig].label}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {campaign.description}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              {campaign.status === "active" && (
                                <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Date Range */}
                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>

                        {/* Budget Progress */}
                        <div className="mt-4">
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Budget Used</span>
                            <span className="font-medium">
                              ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                            </span>
                          </div>
                          <Progress
                            value={(campaign.spent / campaign.budget) * 100}
                            className="h-2"
                          />
                        </div>

                        {/* Creators */}
                        {campaign.creators.length > 0 && (
                          <div className="mt-4">
                            <p className="mb-2 text-sm text-muted-foreground">Creators</p>
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {campaign.creators.slice(0, 5).map((creator, idx) => (
                                  <div
                                    key={idx}
                                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-[#C9943A] to-[#C9943A]/60 text-xs font-semibold text-background"
                                  >
                                    {creator.avatar}
                                    <span
                                      className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background ${
                                        creatorStatusConfig[creator.status as keyof typeof creatorStatusConfig].color
                                      }`}
                                    />
                                  </div>
                                ))}
                              </div>
                              {campaign.creators.length > 5 && (
                                <span className="text-sm text-muted-foreground">
                                  +{campaign.creators.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Metrics Sidebar */}
                      <div className="flex flex-wrap gap-4 border-t bg-muted/30 p-6 lg:w-80 lg:flex-col lg:border-l lg:border-t-0">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                            <Eye className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Impressions</p>
                            <p className="font-semibold">
                              {campaign.metrics.impressions > 0
                                ? `${(campaign.metrics.impressions / 1000000).toFixed(1)}M`
                                : "-"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                            <TrendingUp className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Engagement</p>
                            <p className="font-semibold">
                              {campaign.metrics.engagement > 0
                                ? `${campaign.metrics.engagement}%`
                                : "-"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                            <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Conversions</p>
                            <p className="font-semibold">
                              {campaign.metrics.conversions > 0
                                ? campaign.metrics.conversions.toLocaleString()
                                : "-"}
                            </p>
                          </div>
                        </div>
                        <Button className="mt-auto w-full bg-foreground text-background hover:bg-foreground/90">
                          View Details
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {filteredCampaigns.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No campaigns found</p>
                  <Button className="mt-4 bg-[#C9943A] text-foreground hover:bg-[#C9943A]/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
