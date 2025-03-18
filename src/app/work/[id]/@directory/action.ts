'use server'

import { db } from '@/db/db'
import { redirect } from 'next/navigation'

export async function create() {
  const newDoc = await db.doc.create({
    data: {
      title: `新建文档${Date.now().toString().slice(-4)}`,
      content: '',
    },
  })
  redirect(`/work/${newDoc.id}`)
}

export async function getDocList() {
  return db.doc.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      id: 'asc',
    },
  })
}

export async function del(id: string) {
  // 删除
  await db.doc.delete({
    where: {
      id,
    },
  })

  const list = await getDocList()
  const idList = list.map((doc) => doc.id)
  const otherId = idList.find((id) => id !== id)

  redirect(`/work/${otherId}`) // 删除以后，定位到其他文档
}
