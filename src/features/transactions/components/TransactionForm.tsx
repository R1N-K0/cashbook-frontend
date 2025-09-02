'use client'

import { Button } from '@/components/ui/button'
import DateField from '@/features/components/fields/DateField'
import { FormError } from '@/features/components/fields/FormError'
import InputField from '@/features/components/fields/InputFiled'
import NumberField from '@/features/components/fields/NumberField'
import { createTransaction } from '@/features/transactions/actions/transactionAction'
import CategorySelectField from '@/features/transactions/components/fields/CategorySelectField'
import type { TransactionFormValue } from '@/features/transactions/lib/schemas/transactionSchema.ts'
import { transactionSchema } from '@/features/transactions/lib/schemas/transactionSchema.ts'
import type { TransactionReq } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'

export default function TransactionForm() {
  const route = useRouter()
  const methods = useForm<TransactionFormValue>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      memo: null,
      amount: 0,
      categoryId: 1,
      createdUser: '',
    },
  })

  const onSubmit: SubmitHandler<TransactionFormValue> = async (data) => {
    const formattedData: TransactionReq = {
      ...data,
      memo: data.memo ?? undefined,
      date: data.date ? data.date.toISOString().split('T')[0] : '',
      amount: Number(data.amount || 0),
    }

    const res = await createTransaction(formattedData)

    if (!res.success) {
      methods.setError('root', {
        type: 'server',
        message: JSON.stringify(res.message),
      })
      return
    }
    alert('登録が完了しました')
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto px-8 lg:container-fluid container lg:max-w-5xl"
      >
        <FormError />
        <InputField
          control={methods.control}
          name="description"
          label="取引内容"
          placeholder="取引内容を入力"
        />

        <InputField
          control={methods.control}
          name="memo"
          placeholder="取引理由を入力"
          label="取引理由"
        />

        <NumberField
          control={methods.control}
          name="amount"
          placeholder="取引金額を入力"
          label="取引金額"
        />

        <div className="flex flex-row justify-start items-center space-x-7">
          <DateField name="date" label="取引日" />

          <CategorySelectField name="categoryId" label="カテゴリー" />

          <InputField
            name="createdUser"
            label="担当者"
            placeholder="担当者の名前を入力"
          />
        </div>

        <div className="grid grid-cols-2 w-full gap-5">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => methods.reset()}
          >
            キャンセル
          </Button>

          <Button type="submit" className="w-full">
            取引を登録する
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
