'use client'

import { z } from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import fetch from 'node-fetch'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, { message: 'name must be least 2 characters' }),
  avatar: z.string().optional(),
})

interface IProps {
  email: string
  name: string
  avatar: string
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
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
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
                  <Input placeholder="Input your name" {...field} />
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
                  <Input placeholder="https://github.com/username.png" {...field} />
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
