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
  return text.replace(/\s+/g, '').length
}

// 防抖函数
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

// 节流函数
export const throttle = (func: Function, delay: number) => {
  let lastCall = 0
  let timeoutId: NodeJS.Timeout | null = null
  return (...args: any[]) => {
    const now = Date.now()
    console.log('节流检查: 当前时间', now, '上次调用时间', lastCall, '时间差', now - lastCall)
    if (now - lastCall >= delay) {
      console.log('直接执行函数')
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      func(...args)
      lastCall = now
    } else if (!timeoutId) {
      const remaining = delay - (now - lastCall)
      console.log('设置超时执行，剩余时间', remaining)
      timeoutId = setTimeout(() => {
        console.log('超时后执行函数')
        func(...args)
        lastCall = Date.now()
        timeoutId = null
      }, remaining)
    } else {
      // 原逻辑：忽略当前调用；改为：更新定时器参数
      clearTimeout(timeoutId)
      const remaining = delay - (now - lastCall)
      timeoutId = setTimeout(() => {
        console.log('超时后执行函数')
        func(...args) // 使用展开运算符传递参数，避免this绑定问题
        lastCall = Date.now()
        timeoutId = null
      }, remaining)
    }
  }
}
