import DragHandle from '@tiptap/extension-drag-handle-react'
import { Editor } from '@tiptap/react'
interface IProps {
  editor: Editor | null
}
export default function DragHandleComponent(props: IProps) {
  const { editor } = props
  if (editor == null) {
    return null
  }
  return (
    <DragHandle editor={editor}>
      <div className="w-4 h-4 bg-foreground rounded-md" />
    </DragHandle>
  )
}
