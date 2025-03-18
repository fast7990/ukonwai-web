import { redirect } from 'next/navigation'
import { getUserInfo } from '@/lib/session'
import React from 'react'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserInfo()
  if (user != null) {
    return <>{children}</>
  } else {
    redirect('/user-info')
  }
}
