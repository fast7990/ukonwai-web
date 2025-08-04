'use client'
import React, { useState } from 'react'

interface InputProps {
  onSend: (content: string) => void
}

const MultiLineInput: React.FC<InputProps> = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (inputValue.trim()) {
        onSend(inputValue.trim())
        setInputValue('')
      }
    }
  }

  return (
    <div className="w-full rounded-xl p-1 py-0 border shadow border-secondary-foreground hover:border-blue-400 relative overflow-hidden">
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="请输入内容，按回车发送"
        rows={1}
        style={{ width: '100%' }}
        maxLength={300}
        className="flex min-h-[80px] rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full h-12 mt-2 bg-inherit border-none focus-visible:ring-offset-0 focus-visible:ring-0"
      />
    </div>
  )
}

export default MultiLineInput
