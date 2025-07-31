'use client'

import { updateDoc } from './action'
import TiptapEditor from '@/components/editor'
import { debounce } from 'lodash-es'

const saveContent = debounce((id: string, content: string) => {
  updateDoc(id, { content }).then()
}, 1000)

export default function Content(props: { id: string; content: string }) {
  const { id, content = '' } = props

  function handleUpdate(content: string) {
    saveContent(id, content)
  }

  return <TiptapEditor workId={id} rawContent={content} handleUpdate={handleUpdate} />
}
