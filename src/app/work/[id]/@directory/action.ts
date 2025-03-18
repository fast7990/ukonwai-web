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
  redirect(`/work/${newDoc.uid}`)
}

export async function getDocList() {
  return db.doc.findMany({
    select: {
      uid: true,
      title: true,
    },
    orderBy: {
      uid: 'asc',
    },
  })
}

export async function del(uid: string) {
  // 删除
  await db.doc.delete({
    where: {
      uid,
    },
  })

  const list = await getDocList()
  const uidList = list.map((doc) => doc.uid)
  const otherUid = uidList.find((id) => id !== uid)

  redirect(`/work/${otherUid}`) // 删除以后，定位到其他文档
}
