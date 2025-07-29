import { create, getDocList } from './action'
import CreateSubmitButton from './create-submit-button'
import Item from '@/app/work/[id]/@directory/item'
import List from '@/app/work/[id]/@directory/list'
export default async function Directory(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const list = await getDocList()
  return (
    <div>
      {/* {list.map((doc) => {
        const { id, title } = doc
        let isCurrent = false
        if (id === params.id) isCurrent = true
        return <Item key={id} id={id} title={title} isCurrent={isCurrent} />
      })}
      <CreateSubmitButton className="flex cursor-pointer items-center w-full justify-start px-2 font-bold" text="创建文档" parentId={null} /> */}
      <List list={list} />
    </div>
  )
}
