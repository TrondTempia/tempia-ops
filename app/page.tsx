import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Tempia Ops</h1>
      <p className="text-sm text-muted-foreground">
        Forsiden bygger – dette er en minimal test.
      </p>

      <nav className="space-y-2">
        <h2 className="text-lg font-medium">Områder</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link className="text-primary hover:underline" href="/docs">
              Prosedyrer & Instrukser
            </Link>
          </li>
          <li>
            <Link className="text-primary hover:underline" href="/process">
              Prosess-skjema
            </Link>
          </li>
          <li>
            <Link className="text-primary hover:underline" href="/kpi">
              KPI
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
