import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export default async function Layout(
  props: Readonly<{
    params: { id: string }
    children: React.ReactNode
  }>
) {
  const params = await props.params

  const { children } = props

  const { id = '0' } = params
  return (
    <ResizablePanelGroup direction="horizontal" className=" min-h-screen">
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar {id}</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
