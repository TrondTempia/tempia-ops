'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

type KPI = { id: string; name: string; unit: string | null; target: number | null }
type Entry = { value: number; recorded_at: string }

export default function KPIPage(){
  const [defs, setDefs] = useState<KPI[]>([])
  const [kpiId, setKpiId] = useState<string>('')
  const [data, setData] = useState<Entry[]>([])

  useEffect(() => {
    supabase.from('kpi_definitions').select('*').order('name', { ascending: true })
      .then(({ data }) => setDefs(data || []))
  }, [])

  useEffect(() => {
    if (!kpiId) return
    supabase.from('kpi_entries')
      .select('value, recorded_at')
      .eq('kpi_id', kpiId)
      .order('recorded_at', { ascending: true })
      .then(({ data }) => setData(data || []))
  }, [kpiId])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const kpi_id = String(fd.get('kpi_id'))
    const value = Number(fd.get('value'))
    const recorded_at = String(fd.get('date'))
    const { error } = await supabase.from('kpi_entries').insert({ kpi_id, value, recorded_at })
    if (error) return alert(error.message)
    setKpiId(kpi_id)
    ;(e.currentTarget as HTMLFormElement).reset()
  }

  return (
    <div className="p-6 space-y-6">
      <form className="flex flex-wrap gap-2 items-end" onSubmit={onSubmit}>
        <select name="kpi_id" className="border p-2 rounded" required onChange={(e)=>setKpiId(e.currentTarget.value)}>
          <option value="">Velg KPI…</option>
          {defs.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <input name="value" type="number" step="0.01" className="border p-2 rounded" placeholder="Verdi" required />
        <input name="date" type="date" className="border p-2 rounded" required />
        <button className="border px-4 py-2 rounded">Lagre</button>
      </form>

      <div className="overflow-x-auto">
        <LineChart width={800} height={320} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="recorded_at" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </div>
    </div>
  )
}
