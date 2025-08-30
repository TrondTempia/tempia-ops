'use client'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

export default function Login() {
  const [loading, setLoading] = useState(false)

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get('email')),
      password: String(fd.get('password'))
    })
    setLoading(false)
    if (error) alert(error.message); else window.location.href = '/'
  }

  return (
    <div className="max-w-sm mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Logg inn</h1>
      <form onSubmit={signIn} className="space-y-2">
        <input name="email" type="email" placeholder="E-post" className="border rounded p-2 w-full" required />
        <input name="password" type="password" placeholder="Passord" className="border rounded p-2 w-full" required />
        <button className="border rounded px-4 py-2 w-full" disabled={loading}>
          {loading ? 'Logger inn…' : 'Logg inn'}
        </button>
      </form>
    </div>
  )
}
