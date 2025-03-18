import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (session?.user) {
    return <>{children}</>
  } else {
    redirect('/user-info')
  }
}
