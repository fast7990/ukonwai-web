'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Item from './item'
import { ChevronDown, ChevronRight, FileText } from 'lucide-react'
// 定义 DocItem 类型的占位符，实际使用时需要根据业务需求补充完整
export type DocItem = {
  id: string
  title: string
  parentId?: string | null
  children?: DocItem[]
}

export default function List({ id, list }: { id: string; list: DocItem[] }) {
  function arrayToTree(
    items: DocItem[],
    options: { idKey: keyof DocItem; parentKey: keyof DocItem; rootParentId?: string | null }
  ) {
    const { idKey = 'id', parentKey = 'parentId', rootParentId = null } = options

    // 创建哈希表和结果树
    const itemMap: Record<string, DocItem> = {}
    const result: DocItem[] = []

    // 第一次遍历：将所有项存入哈希表
    for (const item of items) {
      if (!item[idKey]) {
        continue // 跳过无效项
      }
      const key = item[idKey] as string
      itemMap[key] = {
        ...item,
        children: [], // 初始化children数组
      }
    }

    // 第二次遍历：建立父子关系
    for (const item of Object.values(itemMap)) {
      const parentId = item[parentKey]

      // 确保 parentId 是有效索引类型
      if (parentId === rootParentId || parentId === undefined) {
        // 根节点直接加入结果
        result.push(item)
      } else if (typeof parentId === 'string' || typeof parentId === 'number') {
        // 使用可选链操作符安全访问
        itemMap[parentId]?.children?.push(item)
      }
      // 否则为孤立节点，不处理
    }

    return result
  }

  const treeData = arrayToTree(list, {
    idKey: 'id',
    parentKey: 'parentId',
    rootParentId: null,
  })

  // 状态管理：跟踪哪些节点是展开的
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({})
  // 添加层级参数，默认为0表示一级节点
  const renderItems = (items: DocItem[], level: number = 0): React.ReactNode => {
    return items.map((item) => {
      const isCurrent = item.id === id
      const hasChildren = item.children && item.children.length > 0
      const isExpanded = expandedNodes[item.id] || false
      const className = level > 0 ? 'ml-4' : ''

      // 切换节点展开/折叠状态的处理函数
      const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation()
        setExpandedNodes((prev) => ({
          ...prev,
          [item.id]: !isExpanded,
        }))
      }

      return (
        <div key={item.id} className={className}>
          <div
            className={cn(
              'flex items-center hover:text-secondary-foreground hover:bg-card mb-0.5 rounded-sm',
              isCurrent && 'bg-card text-secondary-foreground'
            )}
          >
            {hasChildren ? (
              <button onClick={toggleExpand} className="mr-1 p-1 hover:bg-card cursor-pointer rounded">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            ) : (
              <button className="mr-1 p-1 hover:bg-card cursor-pointer rounded">
                <FileText className="h-4 w-4" />
              </button>
            )}
            <Item id={item.id} title={item.title} isCurrent={isCurrent} />
          </div>
          {hasChildren && isExpanded && renderItems(item.children!, level + 1)}
        </div>
      )
    })
  }
  return <>{renderItems(treeData)}</>
}
