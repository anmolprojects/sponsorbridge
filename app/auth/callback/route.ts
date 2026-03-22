import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const role = searchParams.get('role') || 'creator'

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/error?error=no_code`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(
      `${origin}/auth/error?error=${encodeURIComponent(error?.message || 'unknown')}`
    )
  }

  const user = data.user

  // Check if profile already exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id, role, onboarding_complete')
    .eq('id', user.id)
    .single()

  if (existingProfile) {
    if (existingProfile.role === 'creator') {
      // If they never finished onboarding, send them back to finish it
      if (!existingProfile.onboarding_complete) {
        return NextResponse.redirect(`${origin}/creator/onboarding`)
      }
      return NextResponse.redirect(`${origin}/creator/dashboard`)
    } else {
      if (!existingProfile.onboarding_complete) {
        return NextResponse.redirect(`${origin}/company/onboarding`)
      }
      return NextResponse.redirect(`${origin}/company/dashboard`)
    }
  }

  // ── Brand new user ────────────────────────────────────────────
  const userRole = (user.user_metadata?.role as string) || role

  // 1. Create base profile — onboarding_complete stays false until they fill details
  const { error: profileError } = await supabase.from('profiles').insert({
    id: user.id,
    role: userRole,
    full_name:
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split('@')[0] ||
      'User',
    avatar_url:
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      null,
    email: user.email || null,
    onboarding_complete: false,
  })

  if (profileError) {
    console.error('Profile creation error:', profileError)
    return NextResponse.redirect(
      `${origin}/auth/error?error=profile_creation_failed`
    )
  }

  // 2. Create minimal role-specific profile placeholder
  if (userRole === 'creator') {
    await supabase.from('creator_profiles').insert({
      id: user.id,
      channel_name: user.user_metadata?.name || null,
      google_oauth_connected: true,
    } as any)
    // → Go fill channel details (steps 2 & 3)
    return NextResponse.redirect(`${origin}/creator/onboarding`)
  } else {
    await supabase.from('company_profiles').insert({
      id: user.id,
      company_name: 'My Company',
      contact_name:
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        null,
    } as any)
    return NextResponse.redirect(`${origin}/company/onboarding`)
  }
}
