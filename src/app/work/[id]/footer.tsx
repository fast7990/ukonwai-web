import React, { useEffect, useState } from 'react'
const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 p-1 text-left text-sm">
      <p>
        <span>创建时间：{new Date().toLocaleString()}</span>
        <span>文档ID：1</span>
      </p>
    </footer>
  )
}

export default Footer
