'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db/db'

export async function getDoc(uid: string) {
  try {
    return await db.doc.findUnique({
      where: { uid },
    })
  } catch {
    return null
  }
}

export async function updateDoc(uid: string, data: { title?: string; content?: string }) {
  try {
    await db.doc.update({
      where: { uid },
      data,
    })

    // 重新验证路径，清空缓存
    revalidatePath(`/work/${uid}`)
  } catch (ex) {
    console.error(ex)
  }
}
