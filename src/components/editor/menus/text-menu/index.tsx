'use client'

import { BubbleMenu, Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Bold, Code, Italic, Underline } from 'lucide-react'
import HighlightMenu from '@/components/editor/menus/text-menu/highlight-menu'
import AlignMenu from '@/components/editor/menus/text-menu/align-menu'
import MoreMenu from '@/components/editor/menus/text-menu/more-menu'

interface IProps {
  editor: Editor | null
}

export default function TextMenu(props: IProps) {
  const { editor } = props
  if (editor == null) return

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} updateDelay={100}>
      <div
        className="
          border rounded p-1 shadow
          bg-background dark:bg-background-dark dark:border-gray-800 dark:shadow-lg
          inline-flex space-x-1
        "
      >
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          variant={editor.isActive('code') ? 'secondary' : 'ghost'}
        >
          <Code className="h-4 w-4" />
        </Button>
        <HighlightMenu editor={editor} />
        <AlignMenu editor={editor} />
        <MoreMenu editor={editor} />
      </div>
    </BubbleMenu>
  )
}
