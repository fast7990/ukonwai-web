'use client'

import { BubbleMenu } from '@tiptap/react/menus'
import { Editor } from '@tiptap/react'
import HighlightMenu from '@/components/editor/menus/text-menu/highlight-menu'
import AlignMenu from '@/components/editor/menus/text-menu/align-menu'
import MoreMenu from '@/components/editor/menus/text-menu/more-menu'
import ContentTypeMenu from '@/components/editor/menus/text-menu/content-type'
import BasicMenu from '@/components/editor/menus/text-menu/basic-menu'
import { isTextSelected } from '@/components/editor/utils/isTextSelected'

interface IProps {
  editor: Editor | null
}

export default function TextMenu(props: IProps) {
  const { editor } = props
  if (editor == null) return

  function shouldShow(editor: Editor) {
    // 某些类型，不显示文本菜单
    if (editor.isActive('codeBlock')) {
      return false
    }
    return isTextSelected({ editor })
  }

  return (
    <BubbleMenu
      editor={editor}
      updateDelay={100}
      shouldShow={() => shouldShow(editor)}
    >
      <div
        className="
          border rounded p-1 shadow
          bg-background dark:bg-background-dark dark:border-gray-800 dark:shadow-lg
          inline-flex space-x-1
        "
      >
        <ContentTypeMenu editor={editor} />
        <BasicMenu editor={editor} />
        <HighlightMenu editor={editor} />
        <AlignMenu editor={editor} />
        <MoreMenu editor={editor} />
      </div>
    </BubbleMenu>
  )
}
