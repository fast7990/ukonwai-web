// src/app/work/[id]/lib/doc.ts
import { getDoc } from '../action'

export async function fetchDoc(id: string) {
  const doc = await getDoc(id)
  return doc
}
