import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// Synkron variant med type-cast som funker i Next 15 build
export function supabaseServer() {
  // Noen Next-versjoner typer cookies() som Promise<...>. Vi caster for å kompilere stabilt.
  const cookieStore = cookies() as unknown as { 
    get: (name: string) => { value?: string } | undefined
    set: (opts: { name: string; value: string } & CookieOptions) => void
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
