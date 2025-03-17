'use server'

import { db } from '@/db/db'

export async function create() {
  await db.doc.create({
    data: {
      title: '新建文档',
      content: '文档内容',
    },
  })
}
