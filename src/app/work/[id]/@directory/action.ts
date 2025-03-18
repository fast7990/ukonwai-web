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
