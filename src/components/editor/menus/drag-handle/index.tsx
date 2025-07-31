import DragHandle from '@tiptap/extension-drag-handle-react'
import { Editor } from '@tiptap/react'
import { GripVertical, Plus } from 'lucide-react'
import { useState } from 'react'
import { Node } from '@tiptap/pm/model'
interface IProps {
  editor: Editor | null
}
export default function DragHandleComponent(props: IProps) {
  const { editor } = props
  const [currentNode, setCurrentNode] = useState<Node | null>(null)
  const [currentNodePos, setCurrentNodePos] = useState<number>(1)
  if (editor == null) {
    return null
  }
  const handleNodeChange = (data: { node: Node | null; editor: Editor; pos: number }) => {
    const { node, editor, pos } = data
    setCurrentNode(node)
    setCurrentNodePos(pos)
  }
  const handleAdd = () => {
    console.log('handleAdd called', new Date().toISOString())
    console.log('currentNodePos', currentNodePos)
    if (currentNodePos !== -1) {
      const currentNodeSize = currentNode?.nodeSize || 0
      const insertPos = currentNodePos + currentNodeSize
      // 在当前节点下方插入新段落
      editor
        .chain()
        .command(({ dispatch, tr, state }) => {
          if (dispatch) {
            // 始终在当前节点后插入一个新的空段落
            tr.insert(insertPos, state.schema.nodes.paragraph.create())
            return dispatch(tr)
          }
          return true
        })
        .focus(insertPos + 1) // 聚焦到新段落的开始位置
        .run()
    }
  }
  return (
    <DragHandle
      editor={editor}
      onNodeChange={handleNodeChange}
      pluginKey="dragHandle"
    >
      <ul className="flex mr-1">
        <li className="flex items-center justify-center p-[6px] hover:bg-gray-200 rounded-md">
          <Plus
            size={16}
            onClick={(e) => {
              e.stopPropagation()
              handleAdd()
            }}
          />
        </li>
        <li className="flex items-center justify-center p-[6px] cursor-grab hover:bg-gray-200 rounded-md">
          <GripVertical size={16} />
        </li>
      </ul>
    </DragHandle>
  )
}
