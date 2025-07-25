import { getUserInfo } from '@/lib/session'
import { db } from '@/db/db'
import { NextRequest, NextResponse } from "next/server";
import { getParams } from '@/utils'

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUserInfo()
    if (user == null) return Response.json({ error: 401, msg: 'Unauthorized' })

    const body = await request.json()
    const { name, avatar } = body
    await db.user.update({
      where: { id: user.id },
      data: {
        name,
        image: avatar,
        // 暂不更新 email
      },
    })

    return NextResponse.json({ error: 0, msg: 'Update success' })
  } catch (error) {
    console.error('Update user failed:', error)
    return NextResponse.json({ error: 1, msg: 'Update failed' })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserInfo()
    if (user == null) return Response.json({ error: 401, msg: 'Unauthorized' })
  
    // 获取URL查询参数
    const params = getParams(request)
    console.log(params)
    return NextResponse.json({ error: 0, msg: 'Get user success', data: user })
  } catch (error) {
    console.error('Get user failed:', error)
    return NextResponse.json({ error: 1, msg: 'Get user failed' })
  }
}