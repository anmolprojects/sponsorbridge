"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, TrendingUp, Shield, Sparkles, ArrowRight, 
  CheckCircle, Clock, MessageSquare, Star, Youtube, Users
} from "lucide-react"

const stats = [
  { label: "Total Earnings", value: "$24,500", change: "+12.5%", icon: DollarSign, color: "#C9943A" },
  { label: "Active Deals", value: "3", change: "+2", icon: Shield, color: "#1A7A4A" },
  { label: "AI Matches", value: "12", change: "New", icon: Sparkles, color: "#C9943A" },
  { label: "Reputation Score", value: "98%", change: "Excellent", icon: Star, color: "#1A7A4A" },
]

const recentMatches = [
  { company: "NordVPN", fit: 97, budget: "$5,000 - $8,000", category: "Tech/Security", status: "new" },
  { company: "Squarespace", fit: 91, budget: "$4,000 - $6,000", category: "Website Builder", status: "new" },
  { company: "Raycon", fit: 84, budget: "$3,000 - $5,000", category: "Audio/Tech", status: "viewed" },
]

const activeDeals = [
  { 
    company: "HelloFresh", 
    amount: "$4,500", 
    status: "content_review", 
    deadline: "Mar 25, 2026",
    escrow: true
  },
  { 
    company: "ExpressVPN", 
    amount: "$6,200", 
    status: "in_progress", 
    deadline: "Mar 28, 2026",
    escrow: true
  },
  { 
    company: "Skillshare", 
    amount: "$3,800", 
    status: "awaiting_approval", 
    deadline: "Mar 20, 2026",
    escrow: true
  },
]

const statusLabels: Record<string, { label: string; color: string }> = {
  content_review: { label: "Content Review", color: "#C9943A" },
  in_progress: { label: "In Progress", color: "#1A7A4A" },
  awaiting_approval: { label: "Awaiting Approval", color: "#C9943A" },
  completed: { label: "Completed", color: "#1A7A4A" },
}

export default function CreatorDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
            Welcome back, John
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your sponsorships today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Google Verified
          </Badge>
          <Badge className="bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20">
            <Youtube className="w-3 h-3 mr-1" />
            820K subs
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={stat.change.includes("+") || stat.change === "New" || stat.change === "Excellent" 
                        ? "text-[#1A7A4A] border-[#1A7A4A]/30" 
                        : "text-muted-foreground"
                      }
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="font-serif text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
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
            {recentMatches.map((match) => (
              <div
                key={match.company}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0D0D0B] flex items-center justify-center">
                    <span className="text-[#C9943A] font-bold text-sm">{match.company.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{match.company}</p>
                      {match.status === "new" && (
                        <Badge className="bg-[#C9943A] text-[#0D0D0B] text-xs">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{match.budget} • {match.category}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={match.fit >= 90 
                    ? "text-[#1A7A4A] border-[#1A7A4A]/30" 
                    : "text-[#C9943A] border-[#C9943A]/30"
                  }
                >
                  {match.fit}% Fit
                </Badge>
              </div>
            ))}
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
            {activeDeals.map((deal) => {
              const status = statusLabels[deal.status]
              return (
                <div
                  key={deal.company}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1A7A4A]/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#1A7A4A]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{deal.company}</p>
                        <Badge 
                          className="text-xs"
                          style={{ 
                            backgroundColor: `${status.color}15`, 
                            color: status.color,
                            borderColor: `${status.color}30`
                          }}
                        >
                          {status.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{deal.amount} in escrow</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Due {deal.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
              <p className="font-serif text-3xl font-semibold text-[#1A7A4A]">$14,500</p>
              <p className="text-sm text-muted-foreground mt-1">Funds in Escrow</p>
              <p className="text-xs text-muted-foreground mt-2">Protected until content approved</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-secondary">
              <p className="font-serif text-3xl font-semibold text-foreground">$6,200</p>
              <p className="text-sm text-muted-foreground mt-1">Pending Release</p>
              <p className="text-xs text-muted-foreground mt-2">Awaiting company approval</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-secondary">
              <p className="font-serif text-3xl font-semibold text-foreground">$24,500</p>
              <p className="text-sm text-muted-foreground mt-1">Total Earned</p>
              <p className="text-xs text-muted-foreground mt-2">After 5% commission</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
          <Link href="/creator/dashboard/matches">
            <Sparkles className="w-5 h-5 text-[#C9943A]" />
            <span>Browse AI Matches</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
          <Link href="/creator/dashboard/messages">
            <MessageSquare className="w-5 h-5 text-[#1A7A4A]" />
            <span>Open Messages</span>
            <Badge className="bg-[#C9943A]/10 text-[#C9943A]">5 unread</Badge>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
          <Link href="/creator/dashboard/settings">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span>Update Profile</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
