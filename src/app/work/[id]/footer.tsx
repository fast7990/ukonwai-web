'use client'
import React, { useEffect, useState } from 'react'
import WordCounter from './WordCounter'
// 定义 Footer 组件的 props 类型
interface FooterProps {
  doc: any
}
const Footer: React.FC<FooterProps> = ({ doc }) => {
  const [createdTime, setCreatedTime] = useState<string>()
  // console.log(doc)
  useEffect(() => {
    setCreatedTime(new Date(doc.createdAt).toLocaleString())
  }, [doc.createdAt])
  return (
    <footer className="border-t flex items-center justify-between px-3 py-1 text-sm text-muted-foreground">
      <p>
        <span className="mr-2">创建时间：{createdTime}</span>
        <WordCounter />
      </p>
    </footer>
  )
}

export default Footer
