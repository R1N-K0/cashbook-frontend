'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'

export default function TransactionForm() {
  const methods = useForm<TransactionFormValue>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      memo: null,
      amount: 0,
      categoryId: 1,
    },
  })

  const onSubmit: SubmitHandler<TransactionFormValue> = (data) => {
    const formattedData = {
      ...data,
      date: data.date ? data.date.toISOString().split('T')[0] : null,
      amount: Number(data.amount || 0),
    }

    console.log(JSON.stringify(formattedData))
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
                <Input
                  placeholder="金額"
                  {...field}
                  type="number"
                  {...methods.register('amount', {
                    setValueAs: (value) => (value === '' ? '' : Number(value)),
                  })}
                />
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

        <FormField
          control={methods.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>取引日</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: ja })
                      ) : (
                        <span>取引日を入力してください</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
