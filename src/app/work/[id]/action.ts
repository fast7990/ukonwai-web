'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db/db'

export async function getDoc(id: string) {
  try {
    return await db.doc.findUnique({
      where: { id },
    })
  } catch {
    return null
  }
}

export async function updateDoc(id: string, data: { title?: string; content?: string }) {
  try {
    await db.doc.update({
      where: { id },
      data,
    })

    // 重新验证路径，清空缓存
    revalidatePath(`/work/${id}`)
  } catch (ex) {
    console.error(ex)
  }
}
