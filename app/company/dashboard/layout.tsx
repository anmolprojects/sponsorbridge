import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import CompanyDashboardClient from "./_components/CompanyDashboardClient"

export default async function CompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/company/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, full_name, avatar_url, email")
    .eq("id", user.id)
    .single()

  if (!profile) {
    redirect("/company/login")
  }

  if (profile.role !== "company") {
    redirect("/creator/dashboard")
  }

  const { data: companyProfile } = await supabase
    .from("company_profiles")
    .select("company_name, verified, verification_status, subscription_status, trial_ends_at, logo_url")
    .eq("id", user.id)
    .single()

  return (
    <CompanyDashboardClient
      userProfile={{
        id: profile.id,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url || companyProfile?.logo_url || null,
        email: profile.email,
        company_name: companyProfile?.company_name || "My Company",
        verified: companyProfile?.verified || false,
        verification_status: companyProfile?.verification_status || "pending",
        subscription_status: companyProfile?.subscription_status || "trial",
        trial_ends_at: companyProfile?.trial_ends_at || null,
      }}
    >
      {children}
    </CompanyDashboardClient>
  )
}
