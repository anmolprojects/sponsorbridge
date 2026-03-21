"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Wallet,
  CreditCard,
} from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "payment",
    company: "TechFlow AI",
    description: "Product Integration Video - Final Payment",
    amount: 4500,
    date: "Mar 15, 2026",
    status: "completed",
  },
  {
    id: 2,
    type: "payment",
    company: "StartupKit",
    description: "Brand Mention - Weekly Roundup",
    amount: 1500,
    date: "Mar 10, 2026",
    status: "completed",
  },
  {
    id: 3,
    type: "withdrawal",
    company: "Bank Transfer",
    description: "Withdrawal to **** 4521",
    amount: -5000,
    date: "Mar 8, 2026",
    status: "completed",
  },
  {
    id: 4,
    type: "payment",
    company: "DevTools Inc",
    description: "Tutorial Series - Milestone 2",
    amount: 3000,
    date: "Mar 5, 2026",
    status: "completed",
  },
  {
    id: 5,
    type: "pending",
    company: "CloudSync Pro",
    description: "Sponsored Review - In Escrow",
    amount: 3200,
    date: "Pending",
    status: "pending",
  },
]

const monthlyEarnings = [
  { month: "Oct", amount: 8500 },
  { month: "Nov", amount: 12300 },
  { month: "Dec", amount: 15200 },
  { month: "Jan", amount: 18900 },
  { month: "Feb", amount: 22400 },
  { month: "Mar", amount: 24500 },
]

export default function CreatorEarningsPage() {
  const availableBalance = 9000
  const pendingBalance = 11700
  const totalEarnings = 89500
  const thisMonth = 24500
  const lastMonth = 22400
  const growth = ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Earnings</h1>
          <p className="mt-1 text-muted-foreground">Track your income and manage withdrawals</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-[#C9943A]/20 bg-gradient-to-br from-[#C9943A]/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">${availableBalance.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9943A]/10">
                <Wallet className="h-6 w-6 text-[#C9943A]" />
              </div>
            </div>
            <Button className="mt-4 w-full bg-foreground text-background hover:bg-foreground/90">
              Withdraw Funds
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending (Escrow)</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">${pendingBalance.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Released upon content delivery approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">${thisMonth.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A7A4A]/10">
                <TrendingUp className="h-6 w-6 text-[#1A7A4A]" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-[#1A7A4A]">
              <ArrowUpRight className="h-4 w-4" />
              <span>+{growth}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">${totalEarnings.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <DollarSign className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Lifetime earnings on SponsorBridge
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Monthly Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-end gap-4">
            {monthlyEarnings.map((item, idx) => (
              <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-[#C9943A]/80 transition-all hover:bg-[#C9943A]"
                  style={{ height: `${(item.amount / 25000) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-serif">Transaction History</CardTitle>
          <Button variant="ghost" size="sm">
            View All
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      tx.type === "withdrawal"
                        ? "bg-muted"
                        : tx.status === "pending"
                        ? "bg-[#C9943A]/10"
                        : "bg-[#1A7A4A]/10"
                    }`}
                  >
                    {tx.type === "withdrawal" ? (
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    ) : tx.status === "pending" ? (
                      <Clock className="h-5 w-5 text-[#C9943A]" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-[#1A7A4A]" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{tx.company}</p>
                    <p className="text-sm text-muted-foreground">{tx.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-semibold ${
                      tx.amount < 0 ? "text-foreground" : "text-[#1A7A4A]"
                    }`}
                  >
                    {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{tx.date}</span>
                    {tx.status === "pending" && (
                      <Badge variant="outline" className="bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Bank Account</p>
                <p className="text-sm text-muted-foreground">**** **** **** 4521</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20">
              Primary
            </Badge>
          </div>
          <Button variant="outline" className="mt-4">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
