import DragHandle from '@tiptap/extension-drag-handle-react'
import { Editor } from '@tiptap/react'
import { GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
      <Button>
        <GripVertical size={16} />
      </Button>
    </DragHandle>
  )
}
