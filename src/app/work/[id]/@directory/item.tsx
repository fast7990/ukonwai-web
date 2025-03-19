'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FileText, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { del } from '@/app/work/[id]/@directory/action'

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
        'flex justify-between w-full p-2 cursor-pointer hover:text-secondary-foreground group',
        isCurrent ? 'bg-card' : 'hover:bg-card'
      )}
    >
      <Link href={`/work/${id}`} className="inline-flex items-center">
        <FileText className="h-4 w-4" />
        &nbsp;{title || '<无标题>'}
      </Link>
      <div className="inline-flex items-center invisible group-hover:visible">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" onClick={() => del(id)}>
                <Trash2 className="h-4 w-4" />
                &nbsp;删除
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>其他操作</DropdownMenuItem>
              <DropdownMenuItem>其他操作</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </div>
  )
}
