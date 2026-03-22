import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  Shield,
  Sparkles,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  MessageSquare,
  Users,
  Youtube,
  TrendingUp,
  AlertCircle,
  Plus,
} from "lucide-react"

const statusLabels: Record<string, { label: string; color: string }> = {
  content_review: { label: "Content Review", color: "#C9943A" },
  in_progress: { label: "In Progress", color: "#1A7A4A" },
  awaiting_approval: { label: "Awaiting Approval", color: "#C9943A" },
  content_creation: { label: "Creating Content", color: "#1A7A4A" },
  completed: { label: "Completed", color: "#1A7A4A" },
  negotiation: { label: "Negotiation", color: "#C9943A" },
  pending: { label: "Pending", color: "#6B6B67" },
}

export default async function CreatorDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const supabase = await createClient()
  const params = await searchParams

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/creator/login")

  // Fetch all dashboard data in parallel
  const [
    profileResult,
    dealsResult,
    matchesResult,
    unreadMessagesResult,
    escrowResult,
  ] = await Promise.all([
    supabase
      .from("creator_profiles")
      .select("*")
      .eq("id", user.id)
      .single(),
    supabase
      .from("deals")
      .select(`
        id, title, amount, status, deadline, escrow_funded, escrow_amount, company_id,
        company_profiles!inner(company_name, logo_url, verified)
      `)
      .eq("creator_id", user.id)
      .neq("status", "completed")
      .neq("status", "cancelled")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("ai_matches")
      .select(`
        id, fit_score, budget_min, budget_max, category, status, description,
        company_profiles!inner(company_name, industry, verified)
      `)
      .eq("creator_id", user.id)
      .order("fit_score", { ascending: false })
      .limit(5),
    supabase
      .from("messages")
      .select("id, conversation_id", { count: "exact" })
      .eq("read", false)
      .neq("sender_id", user.id)
      .limit(1),
    supabase
      .from("deals")
      .select("escrow_amount, status")
      .eq("creator_id", user.id)
      .eq("escrow_funded", true)
      .neq("status", "completed"),
  ])

  const creatorProfile = profileResult.data
  const activeDeals = dealsResult.data || []
  const aiMatches = matchesResult.data || []
  const unreadCount = unreadMessagesResult.count || 0

  // Calculate escrow total
  const escrowTotal = (escrowResult.data || []).reduce(
    (sum, deal) => sum + (deal.escrow_amount || 0),
    0
  )

  const pendingEscrow = (escrowResult.data || [])
    .filter((d) => d.status === "awaiting_approval")
    .reduce((sum, deal) => sum + (deal.escrow_amount || 0), 0)

  const isNewUser =
    !creatorProfile?.youtube_channel_url && params.welcome === "true"

  return (
    <div className="space-y-8">
      {/* Welcome Banner for new users */}
      {isNewUser && (
        <div className="bg-[#C9943A]/10 border border-[#C9943A]/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C9943A]/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#C9943A]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Welcome to SponsorBridge!
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Complete your profile to start getting matched with brands. Add
                your YouTube channel to unlock AI matching.
              </p>
              <Button asChild size="sm" className="bg-[#C9943A] text-[#0D0D0B] hover:bg-[#C9943A]/90">
                <Link href="/creator/dashboard/settings">
                  Complete Your Profile
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Verification pending banner */}
      {creatorProfile && !creatorProfile.verified && !isNewUser && (
        <div className="bg-[#C9943A]/5 border border-[#C9943A]/20 rounded-xl p-4 flex items-center gap-4">
          <Clock className="w-5 h-5 text-[#C9943A] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Verification in progress
            </p>
            <p className="text-xs text-muted-foreground">
              Your YouTube channel is being verified. You&apos;ll receive an
              email once approved.
            </p>
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
            Welcome back
          </h1>
          <p className="text-muted-foreground mt-1">
            {activeDeals.length > 0
              ? `You have ${activeDeals.length} active deal${activeDeals.length > 1 ? "s" : ""} in progress.`
              : "Here's what's happening with your sponsorships today."}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {creatorProfile?.verified ? (
            <Badge className="bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              Google Verified
            </Badge>
          ) : (
            <Badge className="bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20">
              <Clock className="w-3 h-3 mr-1" />
              Verification Pending
            </Badge>
          )}
          {creatorProfile?.subscribers != null && creatorProfile.subscribers > 0 && (
            <Badge className="bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20">
              <Youtube className="w-3 h-3 mr-1" />
              {creatorProfile.subscribers >= 1000000
                ? `${(creatorProfile.subscribers / 1000000).toFixed(1)}M`
                : creatorProfile.subscribers >= 1000
                ? `${(creatorProfile.subscribers / 1000).toFixed(0)}K`
                : creatorProfile.subscribers}{" "}
              subs
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#C9943A]/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#C9943A]" />
              </div>
              <Badge variant="outline" className="text-[#1A7A4A] border-[#1A7A4A]/30 text-xs">
                Lifetime
              </Badge>
            </div>
            <p className="font-serif text-2xl font-semibold text-foreground">
              ${(creatorProfile?.total_earned || 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total Earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#1A7A4A]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#1A7A4A]" />
              </div>
              <Badge variant="outline" className="text-[#C9943A] border-[#C9943A]/30 text-xs">
                {activeDeals.length > 0 ? "Active" : "None"}
              </Badge>
            </div>
            <p className="font-serif text-2xl font-semibold text-foreground">
              {activeDeals.length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Active Deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#C9943A]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#C9943A]" />
              </div>
              <Badge variant="outline" className="text-[#1A7A4A] border-[#1A7A4A]/30 text-xs">
                {aiMatches.filter((m: any) => m.status === "new").length > 0
                  ? "New"
                  : "All seen"}
              </Badge>
            </div>
            <p className="font-serif text-2xl font-semibold text-foreground">
              {aiMatches.length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">AI Matches</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#1A7A4A]/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-[#1A7A4A]" />
              </div>
              <Badge variant="outline" className="text-[#1A7A4A] border-[#1A7A4A]/30 text-xs">
                {(creatorProfile?.reputation_score || 0) >= 90
                  ? "Excellent"
                  : (creatorProfile?.reputation_score || 0) >= 70
                  ? "Good"
                  : "Building"}
              </Badge>
            </div>
            <p className="font-serif text-2xl font-semibold text-foreground">
              {creatorProfile?.reputation_score
                ? `${creatorProfile.reputation_score}%`
                : "—"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Reputation Score
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Matches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C9943A]" />
              Latest AI Matches
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/creator/dashboard/matches">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiMatches.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p className="text-sm">
                  No matches yet. Complete your profile to get matched with
                  brands.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href="/creator/dashboard/settings">
                    Complete Profile
                  </Link>
                </Button>
              </div>
            ) : (
              aiMatches.map((match: any) => {
                const company = match.company_profiles
                const budgetDisplay =
                  match.budget_min && match.budget_max
                    ? `$${match.budget_min.toLocaleString()} - $${match.budget_max.toLocaleString()}`
                    : "Budget TBD"
                return (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0D0D0B] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#C9943A] font-bold text-sm">
                          {company.company_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground text-sm">
                            {company.company_name}
                          </p>
                          {match.status === "new" && (
                            <Badge className="bg-[#C9943A] text-[#0D0D0B] text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {budgetDisplay} · {match.category || company.industry}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        match.fit_score >= 90
                          ? "text-[#1A7A4A] border-[#1A7A4A]/30"
                          : "text-[#C9943A] border-[#C9943A]/30"
                      }
                    >
                      {match.fit_score}% Fit
                    </Badge>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        {/* Active Deals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#1A7A4A]" />
              Active Deals
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/creator/dashboard/deals">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeDeals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Shield className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No active deals yet.</p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href="/creator/dashboard/matches">
                    Browse Matches
                  </Link>
                </Button>
              </div>
            ) : (
              activeDeals.map((deal: any) => {
                const status = statusLabels[deal.status] || {
                  label: deal.status,
                  color: "#6B6B67",
                }
                const company = deal.company_profiles
                return (
                  <div
                    key={deal.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A7A4A]/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-[#1A7A4A]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground text-sm">
                            {company.company_name}
                          </p>
                          <Badge
                            className="text-xs"
                            style={{
                              backgroundColor: `${status.color}15`,
                              color: status.color,
                              borderColor: `${status.color}30`,
                            }}
                          >
                            {status.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>${deal.amount.toLocaleString()} in escrow</span>
                          {deal.deadline && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Due{" "}
                                {new Date(deal.deadline).toLocaleDateString(
                                  "en-US",
                                  { month: "short", day: "numeric" }
                                )}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Escrow Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#C9943A]" />
            Escrow Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-[#1A7A4A]/5 border border-[#1A7A4A]/20">
              <p className="font-serif text-3xl font-semibold text-[#1A7A4A]">
                ${escrowTotal.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Funds in Escrow
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Protected until content approved
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-secondary">
              <p className="font-serif text-3xl font-semibold text-foreground">
                ${pendingEscrow.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Pending Release
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Awaiting company approval
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-secondary">
              <p className="font-serif text-3xl font-semibold text-foreground">
                ${(creatorProfile?.total_earned || 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Total Earned</p>
              <p className="text-xs text-muted-foreground mt-2">
                {creatorProfile?.total_deals_completed || 0} deals completed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Button
          asChild
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2"
        >
          <Link href="/creator/dashboard/matches">
            <Sparkles className="w-5 h-5 text-[#C9943A]" />
            <span>Browse AI Matches</span>
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2"
        >
          <Link href="/creator/dashboard/messages">
            <MessageSquare className="w-5 h-5 text-[#1A7A4A]" />
            <span>Open Messages</span>
            {unreadCount > 0 && (
              <Badge className="bg-[#C9943A]/10 text-[#C9943A]">
                {unreadCount} unread
              </Badge>
            )}
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2"
        >
          <Link href="/creator/dashboard/settings">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span>Update Profile</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
