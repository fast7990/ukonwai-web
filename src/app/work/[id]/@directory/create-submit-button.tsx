'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { create } from './action'
export default function CreateSubmitButton(props: { className: string; text: string; parentId: string | null }) {
  const status = useFormStatus()
  return (
    <button className={props.className} disabled={status.pending} onClick={() => create({ parentId: props.parentId })}>
      <Plus className="h-4 w-4 mr-2" />
      {props.text}
    </button>
  )
}
