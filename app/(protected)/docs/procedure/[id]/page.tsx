import Link from "next/link";

type PageProps = {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function ProcedurePage({ params }: PageProps) {
  const { id } = params;

  return (
    <main className="p-6">
      <h1 className="text-xl font-medium">Prosedyre #{id}</h1>
      <p>Her kommer innholdet for prosedyren.</p>
      <Link href="/docs">← Tilbake til dokumenter</Link>
    </main>
  );
}
