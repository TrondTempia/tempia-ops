import { supabaseServer } from '@/lib/supabaseServer'

export default async function InstrPage({ params }: { params: { id: string } }) {
  const supabase = supabaseServer()
  const { data } = await supabase.from('instructions').select('*').eq('id', params.id).single()
  if (!data) return <div className="p-6">Fant ikke instruks.</div>
  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <article className="whitespace-pre-wrap border rounded p-4">{data.content}</article>
    </div>
  )
}
