import { getDoc } from './action'
import Title from './title'
import Content from './content'

export default async function OneWork(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id

  const doc = await getDoc(id)

  if (doc == null)
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>找不到文档...</p>
      </div>
    )

  return (
    <>
      <div id="work-content-container" className="max-w-[900px] mx-auto my-10">
        <Title id={id} title={doc.title} />
        <Content id={id} content={doc.content} />
      </div>
    </>
  )
}
