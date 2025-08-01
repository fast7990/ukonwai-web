import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import React from 'react'
import WorkNav from '@/components/work-nav'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { LogOut, Search, Star, Trash2, Users } from 'lucide-react'
import UserSettingButton from '@/components/user-setting-button'
import SignOutButton from '@/components/sign-out-button'
import Footer from '@/app/work/[id]/footer'
import { fetchDoc } from './lib/doc' // 导入共享函数
import { getUserInfo } from '@/lib/session'
import SearchFileButton from '@/components/search/search-file-button'

// 声明布局接收的参数类型，包含 metadata
type LayoutProps = {
  params: Promise<{ id: string }>
  children: React.ReactNode
  directory: React.ReactNode
}
export default async function Layout({
  params,
  children,
  directory, // parallel route
}: LayoutProps) {
  const { id = '0' } = await params
  const doc = await fetchDoc(id) // 直接获取文档数据
  const user = await getUserInfo() // 获取用户信息
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      <ResizablePanel defaultSize={15} minSize={15} maxSize={50} className="min-w-[200px]">
        <div className="flex flex-col h-screen bg-muted text-muted-foreground p-2">
          <div>
            <UserSettingButton user={user} />
            <SearchFileButton />
            {/* <Button className="w-full justify-start px-2 cursor-pointer" variant="ghost">
              <Search className="h-4 w-4" />
              &nbsp;&nbsp;搜索
            </Button> */}
            <Button className="w-full justify-start px-2 cursor-pointer" variant="ghost">
              <Star className="h-4 w-4" />
              &nbsp;&nbsp;收藏夹
            </Button>
            <Button className="w-full justify-start px-2 cursor-pointer" variant="ghost">
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
          <Footer doc={doc} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
