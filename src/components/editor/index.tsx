'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import TextMenu from './menus/text-menu'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { SlashCommands } from '@/components/extensions/slash-commands'

interface IProps {
  rawContent: string
  handleUpdate: (content: string) => void
}

// 生成 JSON 内容
function gen_content(rawContent: string) {
  try {
    return JSON.parse(rawContent)
  } catch {
    return undefined
  }
}

const TiptapEditor = (props: IProps) => {
  const { rawContent, handleUpdate } = props

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      SubScript,
      Superscript,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: '请输入内容…',
      }),
      SlashCommands,
    ],
    content: gen_content(rawContent),
    onUpdate: ({ editor }) => {
      const data = editor.getJSON()
      handleUpdate(JSON.stringify(data))
    },
    editorProps: {
      attributes: {
        class: 'min-h-96 prose dark:prose-invert lg:prose-lg focus:outline-none max-w-none',
      },
    },
    immediatelyRender: false,
  })

  return (
    <>
      <EditorContent editor={editor} />
      <TextMenu editor={editor} />
    </>
  )
}

export default TiptapEditor
