'use client'
import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Search, CircleAlert } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { getDocList } from '@/app/work/[id]/@directory/action'
import Link from 'next/link'
// 定义搜索结果项的类型，匹配getDocList返回值
interface SearchResultItem {
  id: string
  title: string
  parentId: string | null
}

export default function SearchFileButton() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([])
  const [loading, setLoading] = useState(false)
  // 使用useRef存储防抖状态
  const throttleRef = useRef<{
    timeoutId: NodeJS.Timeout | null
  }>({
    timeoutId: null,
  })

  // 使用useCallback确保handleSearch函数引用稳定
  const handleSearch = useCallback(async () => {
    console.log('handleSearch 被调用，搜索词:', searchTerm)
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    setLoading(true)
    try {
      // 获取文件列表，不需要类型断言，因为getDocList的返回类型已经匹配
      const allFiles = await getDocList()
      // 简单的模糊搜索实现
      // 过滤并转换为SearchResultItem类型
      const results = allFiles
        .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((item) => ({ ...item }) as SearchResultItem)
      setSearchResults(results)
    } catch (error) {
      console.error('搜索文件失败:', error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm])

  // 直接在组件中实现节流逻辑
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const delay = 500
      console.log('防抖检查: 清除已有定时器')

      // 清除之前的定时器
      if (throttleRef.current.timeoutId) {
        clearTimeout(throttleRef.current.timeoutId)
        throttleRef.current.timeoutId = null
      }

      // 设置新的定时器
      console.log('设置防抖定时器，延迟', delay, 'ms')
      throttleRef.current.timeoutId = setTimeout(() => {
        console.log('防抖延迟后执行函数')
        handleSearch()
        throttleRef.current.timeoutId = null
      }, delay)
    },
    [handleSearch]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start px-2 cursor-pointer" variant="ghost">
          <Search className="h-4 w-4 mr-2" />
          搜索
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-4 min-h-[400px] flex flex-col">
        <DialogTitle>搜索文件</DialogTitle>
        <DialogDescription asChild>
          <div className='flex flex-col flex-1'>
            <div className="mb-4">
              <div className="h-10 flex items-center border rounded p-1 pl-2 mt-3">
                <div className="flex items-center justify-center w-6 h-6">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  className="flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-none py-0 px-1 h-8 focus-visible:ring-transparent"
                  placeholder="输入文件名搜索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="mt-4 flex-1">
              {searchResults.length === 0 ? (
                <div className="text-center text-gray-500">
                  {loading ? (
                    '加载中...'
                  ) : (
                    <div className="flex flex-col items-center justify-center mt-20">
                      {/* 这里需要根据实际项目替换为对应的空页面图标组件 */}
                      <div className="w-16 h-16 bg-gray-200 rounded-full mb-2">
                        {/* 图标 SVG 可替换为实际的空页面图标 */}
                        <CircleAlert className="w-full h-full text-gray-400" />
                      </div>
                      <div className="text-gray-500">没有找到匹配的文件</div>
                    </div>
                  )}
                </div>
              ) : (
                <ul className="max-h-96 overflow-y-auto">
                  {searchResults.map((item) => (
                    <li key={item.id} className="mb-2">
                      <Link
                        href={`/work/${item.id}`}
                        className="block p-2 hover:bg-gray-100 rounded"
                        onClick={() => setOpen(false)}
                      >
                        {item.title || '<无标题>'}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
