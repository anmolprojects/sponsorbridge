import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const role = searchParams.get('role') || 'creator'
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/error?error=no_code`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(`${origin}/auth/error?error=${error?.message}`)
  }

  const user = data.user

  // Check if profile already exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id, role, onboarding_complete')
    .eq('id', user.id)
    .single()

  if (existingProfile) {
    // Existing user — redirect to their dashboard
    if (existingProfile.role === 'creator') {
      return NextResponse.redirect(`${origin}/creator/dashboard`)
    } else {
      return NextResponse.redirect(`${origin}/company/dashboard`)
    }
  }

  // New user — determine role and create profile records
  // role comes from the OAuth redirect URL param we set during signIn
  const userRole = (user.user_metadata?.role as 'creator' | 'company') || role

  // 1. Create base profile
  const { error: profileError } = await supabase.from('profiles').insert({
    id: user.id,
    role: userRole as 'creator' | 'company',
    full_name:
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split('@')[0] ||
      'User',
    avatar_url:
      user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
    email: user.email || null,
    onboarding_complete: false,
  })

  if (profileError) {
    console.error('Profile creation error:', profileError)
    return NextResponse.redirect(
      `${origin}/auth/error?error=profile_creation_failed`
    )
  }

  // 2. Create role-specific profile
  if (userRole === 'creator') {
    await supabase.from('creator_profiles').insert({
      id: user.id,
      channel_name: user.user_metadata?.name || null,
      google_oauth_connected: true,
    } as any)
    return NextResponse.redirect(`${origin}/creator/dashboard?welcome=true`)
  } else {
    await supabase.from('company_profiles').insert({
      id: user.id,
      company_name: user.user_metadata?.name || 'My Company',
      contact_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
    } as any)
    return NextResponse.redirect(`${origin}/company/dashboard?welcome=true`)
  }
}
