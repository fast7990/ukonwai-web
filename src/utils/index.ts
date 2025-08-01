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
 // 计算字数的函数
  export const calculateWordCount = (text: string) => {
    // 去除所有空白字符，然后计算长度
    return text.replace(/\s+/g, '').length;
  };