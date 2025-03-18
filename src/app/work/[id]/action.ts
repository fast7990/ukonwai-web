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

    if (data.title) {
      // 修改 title 时，重新生成页面
      revalidatePath(`/work/${uid}`)
    }
  } catch (ex) {
    console.error(ex)
  }
}
