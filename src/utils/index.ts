import { NextRequest } from 'next/server'

// 获取请求参数
export function getParams(request: NextRequest) {
  const url = new URL(request.url)
  const params: Record<string, string> = {}
  url.searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}
