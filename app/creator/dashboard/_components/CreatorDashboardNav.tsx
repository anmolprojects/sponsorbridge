"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Sparkles,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
  Bell,
  User,
  Shield,
  ChevronDown,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"

interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  email: string | null
  channel_name: string | null
  subscribers: number
  verified: boolean
  verification_status: string
  onboarding_complete: boolean
}

const navItems = [
  { href: "/creator/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/creator/dashboard/matches", label: "AI Matches", icon: Sparkles, badge: "new" },
  { href: "/creator/dashboard/deals", label: "Active Deals", icon: Shield },
  { href: "/creator/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/creator/dashboard/earnings", label: "Earnings", icon: DollarSign },
  { href: "/creator/dashboard/settings", label: "Settings", icon: Settings },
]

export default function CreatorDashboardNav({
  children,
  userProfile,
}: {
  children: React.ReactNode
  userProfile: UserProfile
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/creator/login")
    router.refresh()
  }

  const displayName =
    userProfile.full_name ||
    userProfile.channel_name ||
    userProfile.email?.split("@")[0] ||
    "Creator"

  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const subscribersFormatted =
    userProfile.subscribers >= 1000000
      ? `${(userProfile.subscribers / 1000000).toFixed(1)}M`
      : userProfile.subscribers >= 1000
      ? `${(userProfile.subscribers / 1000).toFixed(0)}K`
      : userProfile.subscribers.toString()

  return (
    <div className="min-h-screen bg-secondary">
      {/* Top Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0D0D0B]">
                <span className="font-serif text-lg font-bold text-[#C9943A]">
                  S
                </span>
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground hidden sm:block">
                SponsorBridge
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#0D0D0B] text-[#FAFAF7]"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {item.badge && (
                      <Badge
                        className={`ml-1 text-xs ${
                          isActive
                            ? "bg-[#C9943A] text-[#0D0D0B]"
                            : "bg-[#C9943A]/10 text-[#C9943A]"
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Verification status badge */}
            {!userProfile.verified && (
              <Badge
                className={
                  userProfile.verification_status === "pending"
                    ? "bg-[#C9943A]/10 text-[#C9943A] border-[#C9943A]/20 hidden sm:flex"
                    : "hidden"
                }
              >
                <Clock className="w-3 h-3 mr-1" />
                Verification Pending
              </Badge>
            )}
            {userProfile.verified && (
              <Badge className="bg-[#1A7A4A]/10 text-[#1A7A4A] border-[#1A7A4A]/20 hidden sm:flex">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                  {userProfile.avatar_url ? (
                    <img
                      src={userProfile.avatar_url}
                      alt={displayName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9943A] to-[#8B6914] flex items-center justify-center">
                      <span className="text-[#0D0D0B] font-bold text-sm">
                        {initials}
                      </span>
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium">
                    {displayName}
                  </span>
                  {subscribersFormatted !== "0" && (
                    <span className="hidden sm:block text-xs text-muted-foreground">
                      {subscribersFormatted} subs
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userProfile.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/creator/dashboard/settings">
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Nav */}
        <nav className="lg:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[#0D0D0B] text-[#FAFAF7]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
