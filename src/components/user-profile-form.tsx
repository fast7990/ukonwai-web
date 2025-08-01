'use client'

import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, { message: 'name must be least 2 characters' }),
  avatar: z.string().optional(),
})

interface IProps {
  email: string
  name: string
  avatar: string
  onClose?: () => void
}

export function UserProfileForm(props: IProps) {
  const [successStatus, setSuccessStatus] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: props.email,
      name: props.name,
      avatar: props.avatar,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch('/api/user', {
      body: JSON.stringify({ ...values }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    })
    const data = await res.json()
    if (data.error === 0) {
      setSuccessStatus(true)
      // 提交成功后关闭父级弹框
      props.onClose?.()
    }
  }

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="text-sm" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="text-sm" placeholder="Input your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Avatar className="AvatarRoot">
                      <AvatarImage src={field.value || ''} alt={field.value || ''} />
                      <AvatarFallback>{field.value?.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <Input className="text-sm ml-1 flex-1" placeholder="头像地址" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={successStatus}>
            {successStatus ? '提交成功' : '提交'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
