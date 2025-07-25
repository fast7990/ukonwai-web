import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import WorkNav from '@/components/work-nav'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { LogOut, Search, Star, Trash2, Users } from 'lucide-react'
import UserSettingButton from '@/components/user-setting-button'
import SignOutButton from '@/components/sign-out-button'
import React from 'react'

export default function Layout({
  params,
  children,
  directory, // parallel route
}: Readonly<{
  params: { id: string }
  children: React.ReactNode
  directory: React.ReactNode
}>) {
  const { id = '0' } = params

  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      <ResizablePanel defaultSize={15} minSize={15} maxSize={50}>
        <div className="flex flex-col h-screen bg-muted text-muted-foreground p-2">
          <div>
            <UserSettingButton />
            <Button className="w-full justify-start px-2" variant="ghost">
              <Search className="h-4 w-4" />
              &nbsp;&nbsp;搜索
            </Button>
            <Button className="w-full justify-start px-2" variant="ghost">
              <Star className="h-4 w-4" />
              &nbsp;&nbsp;收藏夹
            </Button>
            <Button className="w-full justify-start px-2" variant="ghost">
              <Users className="h-4 w-4" />
              &nbsp;&nbsp;协同文档
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="flex-auto overflow-y-auto">{directory}</div>
          <Separator className="my-4" />
          <div>
            <Button className="w-full justify-start px-2" variant="ghost">
              <Trash2 className="h-4 w-4" />
              &nbsp;&nbsp;回收站
            </Button>
            <SignOutButton className="w-full justify-start px-2 " variant="ghost">
              <LogOut className="h-4 w-4" />
              &nbsp;&nbsp;退出登录
            </SignOutButton>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-muted" />
      <ResizablePanel defaultSize={85} minSize={50} maxSize={100}>
        <div className="h-screen flex flex-col relative">
          {/* nav bar */}
          <WorkNav workId={id} />
          {/* content */}
          <div id="work-content-scroll-container" className="flex-auto overflow-y-auto">
            {children}
          </div>
          <div>sdasas</div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
