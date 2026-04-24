import { useEffect, useState } from 'react'
import type { AnchorsFile } from './types'

let cache: AnchorsFile | null = null

async function loadAnchors(): Promise<AnchorsFile> {
  if (cache) return cache
  const res = await fetch('/anchors.json')
  if (!res.ok) throw new Error(`failed to load anchors.json: ${res.status}`)
  cache = (await res.json()) as AnchorsFile
  return cache
}

export function useAnchors(): AnchorsFile | null {
  const [data, setData] = useState<AnchorsFile | null>(null)
  useEffect(() => {
    let alive = true
    loadAnchors().then((d) => { if (alive) setData(d) })
    return () => { alive = false }
  }, [])
  return data
}
