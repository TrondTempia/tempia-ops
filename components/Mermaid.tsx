'use client'
import mermaid from 'mermaid'
import { useEffect, useRef } from 'react'

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' })
    mermaid.render('diagram1', chart).then(({ svg }) => {
      if (ref.current) ref.current.innerHTML = svg
    })
  }, [chart])
  return <div ref={ref} />
}
