"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Search,
  FileText,
  DollarSign,
  MessageSquare,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"

const navigation = [
  { name: "Dashboard", href: "/company/dashboard", icon: LayoutDashboard },
  { name: "Find Creators", href: "/company/dashboard/discover", icon: Search },
  { name: "Campaigns", href: "/company/dashboard/campaigns", icon: FileText },
  { name: "Spending", href: "/company/dashboard/spending", icon: DollarSign },
  { name: "Messages", href: "/company/dashboard/messages", icon: MessageSquare },
  { name: "Company Profile", href: "/company/dashboard/profile", icon: Building2 },
]

interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  email: string | null
  company_name: string
  verified: boolean
  verification_status: string
  subscription_status: string
  trial_ends_at: string | null
}

export default function CompanyDashboardClient({
  children,
  userProfile,
}: {
  children: React.ReactNode
  userProfile: UserProfile
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/company/login")
    router.refresh()
  }

  const displayName = userProfile.full_name || userProfile.email?.split("@")[0] || "User"

  const initials = userProfile.company_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const trialDaysLeft = userProfile.trial_ends_at
    ? Math.max(
        0,
        Math.ceil(
          (new Date(userProfile.trial_ends_at).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <span className="font-serif text-sm font-bold text-background">
                  S
                </span>
              </div>
              <span className="font-serif text-lg font-semibold text-foreground">
                SponsorBridge
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1 hover:bg-muted lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Trial / Status Banner */}
          {userProfile.subscription_status === "trial" && trialDaysLeft > 0 && (
            <div className="mx-4 mt-4 rounded-lg bg-[#C9943A]/10 border border-[#C9943A]/20 px-3 py-2">
              <p className="text-xs font-medium text-[#C9943A]">
                Free trial: {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} left
              </p>
            </div>
          )}

          {/* New Campaign Button */}
          <div className="p-4">
            <Button
              asChild
              className="w-full bg-[#C9943A] text-foreground hover:bg-[#C9943A]/90"
            >
              <Link href="/company/dashboard/campaigns">
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Link>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-border p-4">
            <Link
              href="/company/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground mt-1"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-muted lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden lg:block">
              <h2 className="font-serif text-lg font-semibold text-foreground">
                Company Dashboard
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Verification badge */}
            {userProfile.verified ? (
              <Badge className="hidden sm:flex bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            ) : (
              <Badge className="hidden sm:flex bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20">
                <Clock className="w-3 h-3 mr-1" />
                Pending Verification
              </Badge>
            )}

            {/* Notifications */}
            <button className="relative rounded-lg p-2 hover:bg-muted">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                  {userProfile.avatar_url ? (
                    <img
                      src={userProfile.avatar_url}
                      alt={userProfile.company_name}
                      className="h-8 w-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background font-semibold text-sm">
                      {initials}
                    </div>
                  )}
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium text-foreground">
                      {userProfile.company_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Company Account
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium truncate">
                    {userProfile.company_name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userProfile.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/company/dashboard/profile">
                    <Building2 className="mr-2 h-4 w-4" />
                    Company Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/company/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
