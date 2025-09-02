'use client'

import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'

export function FormError() {
  const {
    formState: { errors },
  } = useFormContext()
  const rootError = errors.root

  if (!rootError) {
    return null
  }

  return (
    <FormItem>
      <FormControl />
      <FormMessage>{rootError.message}</FormMessage>
    </FormItem>
  )
}
