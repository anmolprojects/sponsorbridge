import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
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
  FileText,
  MessageSquare,
  Search,
  Sparkles,
  Plus,
  Shield,
  AlertCircle,
} from "lucide-react"

export default async function CompanyDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const supabase = await createClient()
  const params = await searchParams

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/company/login")

  // Fetch all dashboard data in parallel
  const [
    companyProfileResult,
    campaignsResult,
    dealsResult,
    matchesResult,
    unreadMessagesResult,
  ] = await Promise.all([
    supabase
      .from("company_profiles")
      .select("*")
      .eq("id", user.id)
      .single(),
    supabase
      .from("campaigns")
      .select("id, name, status, budget, spent, impressions, engagement_rate")
      .eq("company_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("deals")
      .select(`
        id, title, amount, status, deadline, escrow_funded,
        creator_profiles!inner(
          id,
          channel_name,
          subscribers,
          verified,
          profiles!inner(full_name, avatar_url)
        )
      `)
      .eq("company_id", user.id)
      .neq("status", "completed")
      .neq("status", "cancelled")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("ai_matches")
      .select(`
        id, fit_score, category, status,
        creator_profiles!inner(
          channel_name, subscribers, engagement_rate, verified, niche,
          profiles!inner(full_name, avatar_url)
        )
      `)
      .eq("company_id", user.id)
      .order("fit_score", { ascending: false })
      .limit(3),
    supabase
      .from("messages")
      .select("id", { count: "exact" })
      .eq("read", false)
      .neq("sender_id", user.id)
      .limit(1),
  ])

  const companyProfile = companyProfileResult.data
  const campaigns = campaignsResult.data || []
  const activeDeals = dealsResult.data || []
  const aiMatches = matchesResult.data || []
  const unreadCount = unreadMessagesResult.count || 0

  const activeCampaignsCount = campaigns.filter(
    (c) => c.status === "active"
  ).length
  const totalReach = campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0)
  const avgEngagement =
    campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + (c.engagement_rate || 0), 0) /
        campaigns.length
      : 0

  const isNewUser = params.welcome === "true"

  return (
    <div className="space-y-8">
      {/* Welcome banner for new company */}
      {isNewUser && (
        <div className="bg-[#1A7A4A]/10 border border-[#1A7A4A]/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1A7A4A]/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#1A7A4A]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Welcome to SponsorBridge!
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Your 30-day free trial is active. Start by creating your first
                campaign and our AI will match you with the perfect creators.
              </p>
              <Button
                asChild
                size="sm"
                className="bg-[#1A7A4A] text-white hover:bg-[#1A7A4A]/90"
              >
                <Link href="/company/dashboard/campaigns">
                  <Plus className="w-4 h-4 mr-1" />
                  Create First Campaign
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Welcome back, {companyProfile?.company_name || "Company"}
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
          <Button
            asChild
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            <Link href="/company/dashboard/campaigns">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Link>
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
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  ${(companyProfile?.total_spent || 0).toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Lifetime on SponsorBridge
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
                <p className="text-sm text-muted-foreground">
                  Active Campaigns
                </p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {activeCampaignsCount}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {campaigns.length} total campaigns
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
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {totalReach >= 1000000
                    ? `${(totalReach / 1000000).toFixed(1)}M`
                    : totalReach >= 1000
                    ? `${(totalReach / 1000).toFixed(0)}K`
                    : totalReach.toString() || "—"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Across all campaigns
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
                <p className="text-sm text-muted-foreground">
                  Avg. Engagement
                </p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {avgEngagement > 0 ? `${avgEngagement.toFixed(1)}%` : "—"}
                </p>
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
              {campaigns.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-8 h-8 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">
                    No campaigns yet. Create your first one.
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link href="/company/dashboard/campaigns">
                      <Plus className="w-4 h-4 mr-1" />
                      Create Campaign
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">
                              {campaign.name}
                            </h4>
                            <Badge
                              variant="outline"
                              className={
                                campaign.status === "active"
                                  ? "bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20"
                                  : campaign.status === "draft"
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-muted text-muted-foreground"
                              }
                            >
                              {campaign.status.charAt(0).toUpperCase() +
                                campaign.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {(campaign.impressions || 0) >= 1000000
                              ? `${((campaign.impressions || 0) / 1000000).toFixed(1)}M`
                              : (campaign.impressions || 0) >= 1000
                              ? `${((campaign.impressions || 0) / 1000).toFixed(0)}K`
                              : campaign.impressions || 0}{" "}
                            impressions ·{" "}
                            {campaign.engagement_rate
                              ? `${campaign.engagement_rate}%`
                              : "0%"}{" "}
                            engagement
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            ${(campaign.spent || 0).toLocaleString()} /{" "}
                            ${(campaign.budget || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Progress
                          value={
                            campaign.budget
                              ? ((campaign.spent || 0) / campaign.budget) * 100
                              : 0
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Recommended Creators */}
          <Card className="border-[#C9943A]/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#C9943A]" />
                <CardTitle className="font-serif">
                  AI-Recommended Creators
                </CardTitle>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/company/dashboard/discover">
                  Discover More
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {aiMatches.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">
                    No matches yet. Complete your company profile to unlock AI
                    matching.
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link href="/company/dashboard/profile">
                      Update Profile
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {aiMatches.map((match: any) => {
                    const creator = match.creator_profiles
                    const profile = creator?.profiles
                    const name =
                      creator?.channel_name ||
                      profile?.full_name ||
                      "Creator"
                    const subs = creator?.subscribers || 0
                    const subsFormatted =
                      subs >= 1000000
                        ? `${(subs / 1000000).toFixed(1)}M`
                        : subs >= 1000
                        ? `${(subs / 1000).toFixed(0)}K`
                        : subs.toString()

                    return (
                      <div
                        key={match.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-4">
                          {profile?.avatar_url ? (
                            <img
                              src={profile.avatar_url}
                              alt={name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#C9943A] to-[#C9943A]/60 font-semibold text-background">
                              {name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground">
                                {name}
                              </p>
                              <Badge
                                variant="outline"
                                className="bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20"
                              >
                                {match.fit_score}% match
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {subsFormatted} subscribers ·{" "}
                              {creator?.engagement_rate
                                ? `${creator.engagement_rate}%`
                                : "—"}{" "}
                              engagement
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Pending Deals */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Active Deals</CardTitle>
            </CardHeader>
            <CardContent>
              {activeDeals.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  <Shield className="w-6 h-6 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No active deals yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeDeals.slice(0, 3).map((deal: any) => {
                    const creator = deal.creator_profiles
                    const name =
                      creator?.channel_name ||
                      creator?.profiles?.full_name ||
                      "Creator"
                    return (
                      <div
                        key={deal.id}
                        className="rounded-lg border border-border p-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground text-sm">
                            {name}
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20 text-xs"
                          >
                            {deal.status
                              .split("_")
                              .map(
                                (w: string) =>
                                  w.charAt(0).toUpperCase() + w.slice(1)
                              )
                              .join(" ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {deal.title}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span className="font-semibold">
                            ${deal.amount.toLocaleString()}
                          </span>
                          {deal.deadline && (
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Due{" "}
                              {new Date(deal.deadline).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              <Button
                variant="outline"
                className="mt-4 w-full"
                asChild
              >
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
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/company/dashboard/discover">
                  <Search className="mr-2 h-4 w-4" />
                  Search Creators
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/company/dashboard/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                  {unreadCount > 0 && (
                    <Badge className="ml-auto bg-[#C9943A] text-foreground">
                      {unreadCount}
                    </Badge>
                  )}
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/company/dashboard/spending">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Add Funds
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
