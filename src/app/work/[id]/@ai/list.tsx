'use client'
import React from 'react'
import ItemAI from './item-ai'
import ItemUser from './item-user'
import { AIChatMessage } from '@/type/aichat'
// AI对话列表组件
const AIChatList: React.FC<{ messages: AIChatMessage[] }> = ({ messages }) => {
  return (
    <div className="ai-chat-list">
      {messages.map((message) => (
        <div key={message.id} className="ai-chat-message">
          {message.role === 'user' ? <ItemUser content={message.content} /> : <ItemAI content={message.content} />}
        </div>
      ))}
    </div>
  )
}

export default AIChatList
