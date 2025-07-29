'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FileText, Trash2, Plus, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { del } from '@/app/work/[id]/@directory/action'
import CreateSubmitButton from './create-submit-button'
interface IProps {
  id: string
  title: string
  isCurrent: boolean
}

export default function Item(props: IProps) {
  const { id, title, isCurrent } = props
  return (
    <div
      className={cn(
        'text-sm flex justify-between w-full p-2 cursor-pointer hover:text-secondary-foreground group mb-0.5 px-1 pl-3 text-secondary-foreground font-bold bg-active rounded-sm',
        isCurrent ? 'bg-card' : 'hover:bg-card'
      )}
    >
      <Link href={`/work/${id}`} className="cursor-pointer flex-auto overflow-hidden py-1.5 px-0.5 flex items-center">
        <FileText className="mr-1" />
        <span className="truncate flex-auto">{title || '<无标题>'}</span>
      </Link>
      <div className="inline-flex items-center invisible group-hover:visible">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex">
              <button className="p-1 hover:bg-muted rounded-md">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>其他操作</DropdownMenuItem>
            <DropdownMenuItem>其他操作</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => del(id)}>
              <Trash2 className="h-4 w-4 mr-2 text-destructive" />
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateSubmitButton
          className="p-1 hover:bg-muted rounded-md"
          text=""
          parentId={id}
        />
      </div>
    </div>
  )
}
