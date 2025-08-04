import { connectDeepSeekStream, parseDeepSeekStream } from '@/lib/mode/deepseek'
import { NextRequest, NextResponse } from 'next/server'
import { AIChatParams } from '@/type/aichat'
export async function POST(request: NextRequest) {
  try {
    // 获取请求主体数据
    const params = await request.json()
    console.log('Received params:', params)
    if (!params) {
      return NextResponse.json({ error: 1, msg: '缺少 prompt 参数', code: 1 })
    }
    
    // 创建流式响应
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const reader = await connectDeepSeekStream(params)
          
          // 处理流式数据
          await parseDeepSeekStream(reader, (chunk) => {
            // 将数据发送给客户端
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content: chunk })}\n\n`))
          })
          
          // 发送结束信号
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('处理流式数据出错:', error)
          controller.error(error)
        }
      },
    })
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('连接 DeepSeek 出错:', error)
    return NextResponse.json({ error: 1, msg: '连接 DeepSeek 出错', code: 1 })
  }
}