import { LucideBot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
export default function ItemAI({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-1 my-1">
      <div className="w-5">
        <LucideBot />
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-2 py-1 rounded-md mr-2 flex-auto">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div className="text-transparent h-1">...</div>
      </div>
    </div>
  )
}
