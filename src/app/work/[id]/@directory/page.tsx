import React from 'react'
import { getDocList } from './action'
import Item from './item'
import CreateSubmitButton from './create-submit-button'

interface DocItem {
  id: string
  title: string
  parentId?: string | null
  children?: DocItem[]
}
export default async function Page({ params }: { params: Promise<{ id: string }> }): Promise<React.ReactNode> {
  const { id } = await params
  try {
    const list = await getDocList()
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

    console.log(treeData)
    const renderItems = (items: DocItem[]): React.ReactNode => {
      return items.map((item) => {
        const isCurrent = item.id === id
        return (
          <div key={item.id} className="ml-4">
            <Item id={item.id} title={item.title} isCurrent={isCurrent} />
            {item.children && item.children.length > 0 && renderItems(item.children)}
          </div>
        )
      })
    }

    return (
      <div>
        {renderItems(treeData)}
        <CreateSubmitButton
          className="flex cursor-pointer items-center w-full justify-start px-2 font-bold"
          text="创建文档"
          parentId={null}
        />
      </div>
    )
  } catch (error) {
    console.error('Failed to load document list:', error)
    return <div>Failed to load documents. Please try again later.</div>
  }
}
