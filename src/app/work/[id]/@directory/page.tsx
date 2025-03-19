import { create, getDocList } from './action'
import CreateSubmitButton from './create-submit-button'
import Item from '@/app/work/[id]/@directory/item'

export default async function Directory(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const list = await getDocList()
  return (
    <div>
      {list.map((doc) => {
        const { id, title } = doc
        let isCurrent = false
        if (id === params.id) isCurrent = true

        return <Item key={id} id={id} title={title} isCurrent={isCurrent} />
      })}

      <form action={create}>
        <CreateSubmitButton />
      </form>
    </div>
  )
}
