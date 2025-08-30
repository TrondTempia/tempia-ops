'use client'
import Mermaid from '@/components/Mermaid'

const diagram = `
flowchart TD
  A[Start] --> B{Sjekk behov}
  B -->|Prosedyre| P[/PRO-001/]
  B -->|Instruks| I[/INS-010/]
  P --> C[Utfør]
  I --> C
  click P "/docs" "Åpne liste (finn PRO-001)"
  click I "/docs" "Åpne liste (finn INS-010)"
`
export default function Page(){ return <div className="p-6"><Mermaid chart={diagram} /></div> }
