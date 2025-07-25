import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-transparent',
        'disabled:opacity-50 border-none p-0 text-4xl font-bold disabled:cursor-not-allowed',
        'placeholder:text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}      
export { Input }
