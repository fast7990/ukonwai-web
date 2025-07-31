
// import { useWorkStore } from '@/store/work'
import React from 'react'
const Footer: React.FC = () => {
//   const { workId } = useWorkStore()
  return (
    <footer className="bg-slate-100 p-1 text-left text-sm">
      <p>
        <span>创建时间：{new Date().toLocaleString()}</span>
        {/* <span>文档ID：{workId}</span> */}
      </p>
    </footer>
  )
}

export default Footer
