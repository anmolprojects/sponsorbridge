"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  Shield,
  AlertCircle,
} from "lucide-react"

const deals = [
  {
    id: 1,
    company: "TechFlow AI",
    logo: "TF",
    title: "Product Integration Video",
    value: 4500,
    status: "active",
    stage: "content_creation",
    progress: 60,
    deadline: "Mar 25, 2026",
    description: "60-second integration showcasing AI workflow features",
    milestones: [
      { name: "Brief Accepted", completed: true },
      { name: "Script Approved", completed: true },
      { name: "Content Created", completed: false },
      { name: "Review & Publish", completed: false },
    ],
  },
  {
    id: 2,
    company: "CloudSync Pro",
    logo: "CS",
    title: "Sponsored Review",
    value: 3200,
    status: "pending",
    stage: "negotiation",
    progress: 25,
    deadline: "Apr 5, 2026",
    description: "Honest review of cloud storage solution",
    milestones: [
      { name: "Brief Accepted", completed: true },
      { name: "Script Approved", completed: false },
      { name: "Content Created", completed: false },
      { name: "Review & Publish", completed: false },
    ],
  },
  {
    id: 3,
    company: "DevTools Inc",
    logo: "DT",
    title: "Tutorial Series",
    value: 8500,
    status: "active",
    stage: "review",
    progress: 85,
    deadline: "Mar 20, 2026",
    description: "3-part tutorial series on developer productivity",
    milestones: [
      { name: "Brief Accepted", completed: true },
      { name: "Script Approved", completed: true },
      { name: "Content Created", completed: true },
      { name: "Review & Publish", completed: false },
    ],
  },
  {
    id: 4,
    company: "StartupKit",
    logo: "SK",
    title: "Brand Mention",
    value: 1500,
    status: "completed",
    stage: "completed",
    progress: 100,
    deadline: "Mar 10, 2026",
    description: "30-second mention in weekly roundup",
    milestones: [
      { name: "Brief Accepted", completed: true },
      { name: "Script Approved", completed: true },
      { name: "Content Created", completed: true },
      { name: "Review & Publish", completed: true },
    ],
  },
]

const statusConfig = {
  active: { label: "Active", color: "bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20" },
  pending: { label: "Pending", color: "bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20" },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground" },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive" },
}

export default function CreatorDealsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredDeals = activeTab === "all" 
    ? deals 
    : deals.filter(d => d.status === activeTab)

  const totalActive = deals.filter(d => d.status === "active").reduce((sum, d) => sum + d.value, 0)
  const totalPending = deals.filter(d => d.status === "pending").reduce((sum, d) => sum + d.value, 0)
  const totalCompleted = deals.filter(d => d.status === "completed").reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">My Deals</h1>
        <p className="mt-1 text-muted-foreground">Track and manage your sponsorship deals</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A7A4A]/10">
                <DollarSign className="h-5 w-5 text-[#1A7A4A]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Value</p>
                <p className="text-2xl font-semibold">${totalActive.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C9943A]/10">
                <Clock className="h-5 w-5 text-[#C9943A]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold">${totalPending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-semibold">${totalCompleted.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C9943A]/10">
                <Shield className="h-5 w-5 text-[#C9943A]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Escrow</p>
                <p className="text-2xl font-semibold">${(totalActive + totalPending).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deals List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Deals</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Deal Info */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-foreground text-background font-semibold">
                            {deal.logo}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{deal.title}</h3>
                              <Badge variant="outline" className={statusConfig[deal.status as keyof typeof statusConfig].color}>
                                {statusConfig[deal.status as keyof typeof statusConfig].label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{deal.company}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-foreground">${deal.value.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Deal Value</p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-muted-foreground">{deal.description}</p>

                      <div className="mt-4 flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {deal.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>Contract Signed</span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{deal.progress}%</span>
                        </div>
                        <Progress value={deal.progress} className="h-2" />
                        
                        {/* Milestones */}
                        <div className="mt-4 flex gap-2">
                          {deal.milestones.map((milestone, idx) => (
                            <div
                              key={idx}
                              className={`flex-1 rounded-md border p-2 text-center text-xs ${
                                milestone.completed
                                  ? "border-[#1A7A4A]/20 bg-[#1A7A4A]/5 text-[#1A7A4A]"
                                  : "border-border bg-muted/50 text-muted-foreground"
                              }`}
                            >
                              {milestone.completed && <CheckCircle2 className="mx-auto mb-1 h-3 w-3" />}
                              {milestone.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions Sidebar */}
                    <div className="flex flex-row gap-2 border-t bg-muted/30 p-4 lg:w-48 lg:flex-col lg:border-l lg:border-t-0">
                      <Button variant="outline" size="sm" className="flex-1 lg:w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 lg:w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Contract
                      </Button>
                      <Button size="sm" className="flex-1 bg-foreground text-background hover:bg-foreground/90 lg:w-full">
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredDeals.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No deals found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
