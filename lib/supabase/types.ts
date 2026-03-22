export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'creator' | 'company'
          full_name: string | null
          avatar_url: string | null
          email: string | null
          onboarding_complete: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'creator' | 'company'
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
          onboarding_complete?: boolean
        }
        Update: {
          role?: 'creator' | 'company'
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
          onboarding_complete?: boolean
        }
      }
      creator_profiles: {
        Row: {
          id: string
          youtube_channel_url: string | null
          youtube_channel_id: string | null
          channel_name: string | null
          subscribers: number
          avg_views: number
          engagement_rate: number
          niche: string | null
          subscriber_range: string | null
          minimum_rate: number
          bio: string | null
          country: string | null
          payment_method: string | null
          verified: boolean
          verification_status: 'pending' | 'approved' | 'rejected'
          google_oauth_connected: boolean
          reputation_score: number
          total_deals_completed: number
          total_earned: number
          website: string | null
          twitter: string | null
          instagram: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          youtube_channel_url?: string | null
          channel_name?: string | null
          subscribers?: number
          avg_views?: number
          engagement_rate?: number
          niche?: string | null
          subscriber_range?: string | null
          minimum_rate?: number
          bio?: string | null
          country?: string | null
          payment_method?: string | null
        }
        Update: Partial<Database['public']['Tables']['creator_profiles']['Insert']>
      }
      company_profiles: {
        Row: {
          id: string
          company_name: string
          website: string | null
          industry: string | null
          company_size: string | null
          description: string | null
          tagline: string | null
          target_audience: string | null
          budget_range: string | null
          contact_name: string | null
          contact_role: string | null
          logo_url: string | null
          verified: boolean
          verification_status: 'pending' | 'approved' | 'rejected'
          subscription_status: 'trial' | 'active' | 'cancelled' | 'expired'
          trial_ends_at: string | null
          total_spent: number
          twitter: string | null
          linkedin: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          company_name?: string
          website?: string | null
          industry?: string | null
          company_size?: string | null
          description?: string | null
          target_audience?: string | null
          budget_range?: string | null
          contact_name?: string | null
          contact_role?: string | null
        }
        Update: Partial<Database['public']['Tables']['company_profiles']['Insert']>
      }
      deals: {
        Row: {
          id: string
          creator_id: string
          company_id: string
          campaign_id: string | null
          title: string
          description: string | null
          amount: number
          status: string
          deadline: string | null
          content_type: string | null
          escrow_funded: boolean
          escrow_amount: number
          contract_signed: boolean
          milestones: Json
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          creator_id: string
          company_id: string
          title: string
          amount: number
          description?: string | null
          status?: string
          deadline?: string | null
          content_type?: string | null
          campaign_id?: string | null
        }
        Update: Partial<Database['public']['Tables']['deals']['Insert']>
      }
      ai_matches: {
        Row: {
          id: string
          creator_id: string
          company_id: string
          fit_score: number
          budget_min: number | null
          budget_max: number | null
          category: string | null
          description: string | null
          content_type: string | null
          status: 'new' | 'viewed' | 'interested' | 'declined'
          created_at: string
        }
        Insert: {
          creator_id: string
          company_id: string
          fit_score: number
          budget_min?: number | null
          budget_max?: number | null
          category?: string | null
          description?: string | null
          content_type?: string | null
          status?: 'new' | 'viewed' | 'interested' | 'declined'
        }
        Update: Partial<Database['public']['Tables']['ai_matches']['Insert']>
      }
      campaigns: {
        Row: {
          id: string
          company_id: string
          name: string
          description: string | null
          status: string
          budget: number
          spent: number
          start_date: string | null
          end_date: string | null
          content_types: string[] | null
          target_audience: string | null
          impressions: number
          clicks: number
          conversions: number
          engagement_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          company_id: string
          name: string
          description?: string | null
          status?: string
          budget?: number
          start_date?: string | null
          end_date?: string | null
          content_types?: string[] | null
          target_audience?: string | null
        }
        Update: Partial<Database['public']['Tables']['campaigns']['Insert']>
      }
      conversations: {
        Row: {
          id: string
          creator_id: string
          company_id: string
          deal_id: string | null
          last_message_at: string
          created_at: string
        }
        Insert: { creator_id: string; company_id: string; deal_id?: string | null }
        Update: { last_message_at?: string }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          attachment: Json | null
          read: boolean
          created_at: string
        }
        Insert: {
          conversation_id: string
          sender_id: string
          content: string
          attachment?: Json | null
          read?: boolean
        }
        Update: { read?: boolean }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row']
export type CompanyProfile = Database['public']['Tables']['company_profiles']['Row']
export type Deal = Database['public']['Tables']['deals']['Row']
export type AIMatch = Database['public']['Tables']['ai_matches']['Row']
export type Campaign = Database['public']['Tables']['campaigns']['Row']
export type Conversation = Database['public']['Tables']['conversations']['Row']
export type Message = Database['public']['Tables']['messages']['Row']

export type CreatorFullProfile = Profile & { creator_profiles: CreatorProfile | null }
export type CompanyFullProfile = Profile & { company_profiles: CompanyProfile | null }
