import { db } from '@/db/db'
import { redirect } from 'next/navigation'

export default async function Work() {
  // 找到第一篇文档，然后跳转过去
  const firstDoc = await db.doc.findFirst({
    // where: {},
    orderBy: {
      updatedAt: 'desc',
    },
  })

  let pathname = '/work/0'
  if (firstDoc != null) pathname = `/work/${firstDoc?.id}`

  redirect(pathname)
}
