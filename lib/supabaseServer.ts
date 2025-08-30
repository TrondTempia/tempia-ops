import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function supabaseServer() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Ikke tillat skriving av cookies i server components
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},     // no-op på server
        remove() {},  // no-op på server
      },
      // Slå av alt som kan forsøke å persistere/auto-refreshe på server
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
}
