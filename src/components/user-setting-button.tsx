'use client'
import type { User } from '@/type/user'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import UserAvatar from './ui/user-avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { UserProfileForm } from '@/components/user-profile-form'

export default function UserSettingButton(props: { user: User | null }) {
  const { user } = props
  const [open, setOpen] = useState(false)
  if (!user) return null
  const { name, image, email } = user

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start px-2 cursor-pointer" variant="ghost">
          <UserAvatar user={user} />
          &nbsp;&nbsp;账户/设置
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>修改用户信息</DialogTitle>
          <DialogDescription asChild>
            <UserProfileForm
              name={name || ''}
              avatar={image || ''}
              email={email || ''}
              onClose={handleClose}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
