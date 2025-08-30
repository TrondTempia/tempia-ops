import Link from "next/link"
import { supabaseServer } from "@/lib/supabaseServer"

export default async function DocsPage() {
  const supabase = await supabaseServer()
  const { data: procs } = await supabase.from("procedures").select("id,title,updated_at").order("updated_at", { ascending: false })
  const { data: instr } = await supabase.from("instructions").select("id,title,updated_at").order("updated_at", { ascending: false })
  ...
}

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Prosedyrer</h2>
          <Link className="underline" href="/docs/new-procedure">Ny</Link>
        </div>
        <ul className="space-y-2">
          {procs?.map(p => (
            <li key={p.id} className="border rounded p-3">
              <Link className="underline" href={`/docs/procedure/${p.id}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Instrukser</h2>
          <Link className="underline" href="/docs/new-instruction">Ny</Link>
        </div>
        <ul className="space-y-2">
          {instr?.map(i => (
            <li key={i.id} className="border rounded p-3">
              <Link className="underline" href={`/docs/instruction/${i.id}`}>{i.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
