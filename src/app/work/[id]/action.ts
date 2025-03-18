'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db/db'
import { getUserInfo } from '@/lib/session'

export async function getDoc(id: string) {
  const user = await getUserInfo()
  if (!user || !user.id) return null

  try {
    return await db.doc.findUnique({
      where: { id, userId: user.id },
    })
  } catch {
    return null
  }
}

export async function updateDoc(id: string, data: { title?: string; content?: string }) {
  const user = await getUserInfo()
  if (!user || !user.id) return null

  try {
    await db.doc.update({
      where: { id, userId: user.id },
      data,
    })

    // 重新验证路径，清空缓存
    revalidatePath(`/work/${id}`)
  } catch (ex) {
    console.error(ex)
  }
}
