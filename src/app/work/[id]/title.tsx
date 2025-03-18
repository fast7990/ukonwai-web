'use client'

import React, { useState } from 'react'
import { updateDoc } from '@/app/work/[id]/action'
import { debounce } from 'lodash-es'
import { Input } from '@/components/ui/input'

const saveTitle = debounce((id: string, title: string) => {
  updateDoc(id, { title }).then()
}, 1000)

export default function Title(props: { id: string; title: string }) {
  const [title, setTitle] = useState(props.title || '')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value
    setTitle(newTitle)
    saveTitle(props.id, newTitle)
  }

  return (
    <div className="mb-8">
      <Input
        placeholder="请输入内容..."
        value={title}
        onChange={handleChange}
        className="border-none p-0 text-4xl font-bold focus-visible:ring-transparent"
      />
      {/* 可能还会再增加其他功能，例如设置 Icon 、背景等 */}
    </div>
  )
}
