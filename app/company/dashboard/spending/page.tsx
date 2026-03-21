"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Plus,
  CreditCard,
  Building2,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Shield,
  AlertCircle,
} from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "payment",
    creator: "TechCreator Pro",
    campaign: "Product Launch Q1",
    amount: 3500,
    date: "Mar 18, 2026",
    status: "completed",
  },
  {
    id: 2,
    type: "escrow",
    creator: "DevLife Daily",
    campaign: "Product Launch Q1",
    amount: 2800,
    date: "Mar 15, 2026",
    status: "in_escrow",
  },
  {
    id: 3,
    type: "payment",
    creator: "CloudMaster",
    campaign: "Brand Awareness",
    amount: 2500,
    date: "Mar 12, 2026",
    status: "completed",
  },
  {
    id: 4,
    type: "escrow",
    creator: "AI Insights",
    campaign: "Product Launch Q1",
    amount: 5500,
    date: "Mar 10, 2026",
    status: "in_escrow",
  },
  {
    id: 5,
    type: "payment",
    creator: "ProductHunt Pro",
    campaign: "Brand Awareness",
    amount: 1800,
    date: "Mar 8, 2026",
    status: "completed",
  },
  {
    id: 6,
    type: "deposit",
    creator: "Company Funds",
    campaign: "Account Deposit",
    amount: 25000,
    date: "Mar 1, 2026",
    status: "completed",
  },
]

const monthlySpending = [
  { month: "Oct", amount: 12500 },
  { month: "Nov", amount: 18200 },
  { month: "Dec", amount: 15800 },
  { month: "Jan", amount: 22400 },
  { month: "Feb", amount: 28600 },
  { month: "Mar", amount: 16100 },
]

export default function SpendingPage() {
  const accountBalance = 34500
  const inEscrow = 8300
  const totalSpent = 113600
  const thisMonth = 16100
  const lastMonth = 28600
  const change = ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Spending</h1>
          <p className="mt-1 text-muted-foreground">Track your budget and manage payments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-[#C9943A] text-foreground hover:bg-[#C9943A]/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Funds
          </Button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-[#C9943A]/20 bg-gradient-to-br from-[#C9943A]/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Account Balance</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">
                  ${accountBalance.toLocaleString()}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9943A]/10">
                <DollarSign className="h-6 w-6 text-[#C9943A]" />
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Available for new campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Escrow</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">
                  ${inEscrow.toLocaleString()}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Shield className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Held for active deals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">
                  ${thisMonth.toLocaleString()}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A7A4A]/10">
                <TrendingDown className="h-6 w-6 text-[#1A7A4A]" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-[#1A7A4A]">
              <TrendingDown className="h-4 w-4" />
              <span>{Math.abs(Number(change))}% less than last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">
                  ${totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Lifetime on SponsorBridge
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Spending Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Monthly Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-end gap-4">
            {monthlySpending.map((item, idx) => (
              <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-foreground/80 transition-all hover:bg-foreground"
                  style={{ height: `${(item.amount / 30000) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Transaction History */}
        <Card className="lg:col-span-2">
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
                        tx.type === "deposit"
                          ? "bg-[#1A7A4A]/10"
                          : tx.status === "in_escrow"
                          ? "bg-[#C9943A]/10"
                          : "bg-muted"
                      }`}
                    >
                      {tx.type === "deposit" ? (
                        <Plus className="h-5 w-5 text-[#1A7A4A]" />
                      ) : tx.status === "in_escrow" ? (
                        <Clock className="h-5 w-5 text-[#C9943A]" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx.creator}</p>
                      <p className="text-sm text-muted-foreground">{tx.campaign}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        tx.type === "deposit" ? "text-[#1A7A4A]" : "text-foreground"
                      }`}
                    >
                      {tx.type === "deposit" ? "+" : "-"}${tx.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{tx.date}</span>
                      {tx.status === "in_escrow" && (
                        <Badge variant="outline" className="bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20">
                          In Escrow
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Visa ending 4521</p>
                    <p className="text-sm text-muted-foreground">Expires 12/28</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20">
                  Primary
                </Badge>
              </div>
              <Button variant="outline" className="mt-4 w-full">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          {/* Billing Info */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">TechFlow AI, Inc.</p>
                    <p className="text-sm text-muted-foreground">
                      123 Tech Street, San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full">
                Edit Billing Info
              </Button>
            </CardContent>
          </Card>

          {/* Commission Info */}
          <Card className="border-[#C9943A]/20 bg-[#C9943A]/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9943A]/10">
                  <AlertCircle className="h-5 w-5 text-[#C9943A]" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Commission Rate</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Only <span className="font-semibold text-[#C9943A]">8%</span> commission on successful deals. 
                    The lowest in the industry.
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
