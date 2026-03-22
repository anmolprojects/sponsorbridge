import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import CreatorDashboardNav from "./_components/CreatorDashboardNav"

export default async function CreatorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Server-side auth check — never trust middleware alone
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/creator/login")
  }

  // Fetch the full profile with creator-specific data
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, full_name, avatar_url, email, onboarding_complete")
    .eq("id", user.id)
    .single()

  if (!profile) {
    // Profile doesn't exist yet — unusual but possible during OAuth
    redirect("/creator/login")
  }

  if (profile.role !== "creator") {
    // Wrong role — send to company dashboard
    redirect("/company/dashboard")
  }

  const { data: creatorProfile } = await supabase
    .from("creator_profiles")
    .select("channel_name, subscribers, verified, verification_status, reputation_score")
    .eq("id", user.id)
    .single()

  return (
    <CreatorDashboardNav
      userProfile={{
        id: profile.id,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        email: profile.email,
        channel_name: creatorProfile?.channel_name || null,
        subscribers: creatorProfile?.subscribers || 0,
        verified: creatorProfile?.verified || false,
        verification_status: creatorProfile?.verification_status || "pending",
        onboarding_complete: profile.onboarding_complete,
      }}
    >
      {children}
    </CreatorDashboardNav>
  )
}
