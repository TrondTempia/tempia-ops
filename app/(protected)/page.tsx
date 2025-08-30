export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Tempia Ops</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li><a className="underline" href="/docs">Prosedyrer & Instrukser</a></li>
        <li><a className="underline" href="/process">Prosess-skjema</a></li>
        <li><a className="underline" href="/kpi">KPI</a></li>
      </ul>
    </main>
  )
}
