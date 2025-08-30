import Link from 'next/link'
import { supabaseServer } from '@/lib/supabaseServer'

export default async function DocsPage() {
  const supabase = await supabaseServer()

  const { data: procs = [] } = await supabase
    .from('procedures')
    .select('id,title,updated_at')
    .order('updated_at', { ascending: false })

  const { data: instr = [] } = await supabase
    .from('instructions')
    .select('id,title,updated_at')
    .order('updated_at', { ascending: false })

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Prosedyrer</h2>
      <ul className="list-disc pl-5">
        {procs.map((p: any) => (
          <li key={p.id}>
            <Link href={`/docs/procedure/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Instrukser</h2>
      <ul className="list-disc pl-5">
        {instr.map((i: any) => (
          <li key={i.id}>
            <Link href={`/docs/instruction/${i.id}`}>{i.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
