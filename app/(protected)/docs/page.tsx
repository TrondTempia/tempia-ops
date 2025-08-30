import Link from 'next/link'
import { supabaseServer } from '@/lib/supabaseServer'

type DocRow = {
  id: string
  title: string
  updated_at: string
}

export default async function DocsPage() {
  const supabase = await supabaseServer()

  // Prosedyrer
  const procsRes = await supabase
    .from('procedures')
    .select('id,title,updated_at')
    .order('updated_at', { ascending: false })

  const procs: DocRow[] = procsRes.data ?? []

  // Instrukser
  const instrRes = await supabase
    .from('instructions')
    .select('id,title,updated_at')
    .order('updated_at', { ascending: false })

  const instr: DocRow[] = instrRes.data ?? []

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Prosedyrer</h2>
      <ul className="list-disc pl-5">
        {procs.length === 0 ? (
          <li className="text-gray-500">Ingen prosedyrer enda</li>
        ) : (
          procs.map((p) => (
            <li key={p.id}>
              <Link href={`/docs/procedure/${p.id}`}>{p.title}</Link>
            </li>
          ))
        )}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Instrukser</h2>
      <ul className="list-disc pl-5">
        {instr.length === 0 ? (
          <li className="text-gray-500">Ingen instrukser enda</li>
        ) : (
          instr.map((i) => (
            <li key={i.id}>
              <Link href={`/docs/instruction/${i.id}`}>{i.title}</Link>
            </li>
          ))
        )}
      </ul>
    </>
  )
}
