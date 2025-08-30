'use client'
import { supabase } from '@/lib/supabaseClient'

export default function NewProcedure() {
  return (
    <form className="max-w-xl p-6 space-y-3" onSubmit={async e=>{
      e.preventDefault()
      const fd = new FormData(e.currentTarget as HTMLFormElement)
      const { error } = await supabase.from('procedures').insert({
        title: fd.get('title'),
        content: fd.get('content')
      })
      if (error) alert(error.message); else window.location.href = '/docs'
    }}>
      <input name="title" className="border rounded p-2 w-full" placeholder="Tittel" required />
      <textarea name="content" className="border rounded p-2 w-full h-40" placeholder="Innhold" required />
      <button className="border rounded px-4 py-2">Lagre</button>
    </form>
  )
}
