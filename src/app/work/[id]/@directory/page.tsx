import React from 'react'
import { getDocList } from './action'
import List from './list'
import CreateSubmitButton from './create-submit-button'


export default async function Page({ params }: { params: Promise<{ id: string }> }): Promise<React.ReactNode> {
  const { id } = await params
  try {
    const list = await getDocList()
    return (
      <div className='min-w-fit'>
        <List id={id} list={list} />
        <CreateSubmitButton
          className="flex cursor-pointer items-center w-full justify-start px-2 font-bold text-sm hover:text-secondary-foreground"
          text="创建文档"
          parentId={null}
        />
      </div>
    )
  } catch (error) {
    console.error('Failed to load document list:', error)
    return <div>Failed to load documents. Please try again later.</div>
  }
}
