import { FileText } from 'lucide-react'
import { create, getDocList } from './action'
import CreateSubmitButton from './create-submit-button'
import { cn } from '@/lib/utils'

export default async function Directory(props: { params: { id: string } }) {
  const params = await props.params
  const list = await getDocList()
  return (
    <div>
      {list.map((doc) => {
        const { uid, title } = doc
        let isCurrent = false
        if ((uid === params.id, 10)) isCurrent = true

        return (
          <div
            key={uid}
            className={cn(
              'inline-flex items-center w-full p-2 py-1 cursor-pointer hover:text-secondary-foreground',
              isCurrent ? 'bg-card' : 'hover:bg-card'
            )}
          >
            <FileText className="h-4 w-4" />
            &nbsp;{title || '<无标题>'}
          </div>
        )
      })}

      <form action={create}>
        <CreateSubmitButton />
      </form>
    </div>
  )
}
