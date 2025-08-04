'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import AIChatList from './list'
import MultiLineInput from './input'
import { AIChatMessage } from '@/type/aichat'
import { generateUUID } from '@/utils'

export default function Page(): React.ReactNode {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [messages, setMessages] = useState<AIChatMessage[]>([])

  const sendMessage = async (message: AIChatMessage) => {
    console.log('Received content:', message.content)
    let params = {
      model: 'Qwen2.5-Coder-32B-Instruct-zx',
      max_tokens: 8096,
      stream: true,
      systemPrompt: '', // 传递系统提示词
      messages: [
        {
          role: message.role,
          content: message.content,
        },
      ],
    }
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    const reader = response.body?.getReader()
    if (!reader) {
      return
    }
    const decoder = new TextDecoder()
    let done = false
    // 创建AI回复的初始消息，使用固定ID
    const aiMessageId = generateUUID()
    // 初始为空内容
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: aiMessageId,
        content: '',
        role: 'assistant',
      },
    ])
    // 用于累积chunk的缓冲区
    let accumulatedContent = ''
    while (!done) {
      const { value, done: streamDone } = await reader.read()
      if (streamDone) {
        done = true
        break
      }
      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter((line) => line.trim().startsWith('data: '))
      for (const line of lines) {
        const jsonStr = line.trim().substring(6)
        const jsonData = JSON.parse(jsonStr)
        if (jsonData.choices && jsonData.choices[0] && jsonData.choices[0].delta && jsonData.choices[0].delta.content) {
          accumulatedContent += jsonData.choices[0].delta.content
        }
      }
      // 更新现有消息的content
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.id === aiMessageId) {
            return { ...msg, content: accumulatedContent }
          }
          return msg
        })
      )
      console.log('Received chunk:', chunk)
    }
  }
  const handleSend = (content: string) => {
    const uuid = generateUUID()
    const message: AIChatMessage = {
      id: uuid,
      content,
      role: 'user',
    }
    setMessages([...messages, message])
    sendMessage(message)
  }

  try {
    return (
      <div className="min-w-fit flex flex-col items-center justify-center h-[100%]">
        <div className="flex justify-between w-full p-1 py-2 border-b border-b-secondary text-muted-foreground font-bold">
          AI 写作/聊天
        </div>
        <div className="flex-auto w-full p-2 overflow-y-auto">
          <AIChatList messages={messages} />
        </div>
        <div className="w-full p-4">
          <MultiLineInput onSend={handleSend} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to load document list:', error)
    return <div>Failed to load documents. Please try again later.</div>
  }
}
