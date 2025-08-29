'use client'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import CategoryTag from '@/features/transactions/components/CategoryTag'
import type { TransactionFormValue } from '@/features/transactions/lib/schemas/transactionSchema.ts'
import { transactionSchema } from '@/features/transactions/lib/schemas/transactionSchema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'

export default function TransactionForm() {
  const methods = useForm<TransactionFormValue>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      date: '',
      memo: null,
      amount: 0,
      categoryId: 1,
    },
  })

  const onSubmit: SubmitHandler<TransactionFormValue> = (data) => {
    console.log('フォームデータ:', data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={methods.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>取引内容</FormLabel>
              <FormControl>
                <Input placeholder="取引内容" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>金額</FormLabel>
              <FormControl>
                <Input placeholder="金額" {...field} type="number" min={0} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>取引理由</FormLabel>
              <FormControl>
                <Input
                  placeholder="取引理由"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">
                    <CategoryTag />
                  </SelectItem>
                  <SelectItem value="2">
                    <CategoryTag />
                  </SelectItem>
                  <SelectItem value="3">
                    <CategoryTag />
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
