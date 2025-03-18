import { create, getDocList } from './action'
import CreateSubmitButton from './create-submit-button'
import Item from '@/app/work/[id]/@directory/item'

export default async function Directory(props: { params: { id: string } }) {
  const params = await props.params
  const list = await getDocList()
  return (
    <div>
      {list.map((doc) => {
        const { uid, title } = doc
        let isCurrent = false
        if ((uid === params.id, 10)) isCurrent = true

        return <Item key={uid} uid={uid} title={title} isCurrent={isCurrent} />
      })}

      <form action={create}>
        <CreateSubmitButton />
      </form>
    </div>
  )
}
