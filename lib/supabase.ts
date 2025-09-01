import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from '../utils/supabase/info'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
)

// Types for better TypeScript support
export type Database = {
  public: {
    Tables: {
      buildings: {
        Row: {
          id: string
          number: number
          name: string | null
          address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          number: number
          name?: string | null
          address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          number?: number
          name?: string | null
          address?: string | null
          created_at?: string
        }
      }
      procedures: {
        Row: {
          id: string
          code: string | null
          title: string
          link: string
          created_at: string
        }
        Insert: {
          id?: string
          code?: string | null
          title: string
          link: string
          created_at?: string
        }
        Update: {
          id?: string
          code?: string | null
          title?: string
          link?: string
          created_at?: string
        }
      }
    }
  }
}

// Auth helpers
export const auth = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  getUserRole: async () => {
    const { user } = await auth.getUser()
    return user?.app_metadata?.role || 'viewer'
  }
}