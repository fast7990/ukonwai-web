'use client';
import { useState, useEffect } from 'react';
import type { User } from '@/type/user';
import { Button } from '@/components/ui/button'
import UserAvatar from './ui/user-avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { UserProfileForm } from '@/components/user-profile-form'

export default function UserSettingButton() {
  const [user, setUser] = useState<User | null>(null);

  const handleAvatarUpdate = async () => {
    const updatedUser = await fetch('/api/user', {
      method: 'GET',
    }).then(res => res.json())
    console.log(updatedUser)
    setUser(updatedUser.data || null);
  };
  useEffect(() => {
    handleAvatarUpdate();
  }, []);
  if (!user) return null
  const { name, image, email } = user

  return (
    <Dialog>
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
            <UserProfileForm name={name || ''} avatar={image || ''} email={email || ''} onAvatarUpdate={handleAvatarUpdate} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
