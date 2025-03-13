export default async function OneWork(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  return <div>Work Page, id: {params.id}</div>
}
