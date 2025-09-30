'use client'

import { Button } from '@/components/ui/button'
import DateField from '@/features/components/fields/DateField'
import { FormError } from '@/features/components/fields/FormError'
import InputField from '@/features/components/fields/InputFiled'
import NumberField from '@/features/components/fields/NumberField'
import utsToJst from '@/features/transactions/components/utils/ustToJst'
import type { TransactionFormValue } from '@/features/transactions/lib/schemas/transactionSchema.ts'
import { updateTransactionSchema } from '@/features/transactions/lib/schemas/transactionSchema.ts'
import type { TransactionData, TransactionReq } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'

type props = {
  data: TransactionData
}

const TransactionEdit = ({ data }: props) => {
  const method = useForm({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      description: data.description,
      amount: data.amount,
      categoryId: Number(data.category.id),
      memo: data.memo ?? '',
      createdUser: data.createdUser,
      date: new Date(data.date),
      id: data.id,
    },
  })

  const onSubmit: SubmitHandler<TransactionFormValue> = async (data) => {
    const formattedDate: TransactionReq = {
      ...data,
      memo: data.memo ?? undefined,
      date: data.date ? utsToJst(data.date).toISOString().split('T')[0] : '',
      amount: Number(data.amount || 0),
    }
  }

  return (
    <div className="w-full h-full p-8 ">
      <FormProvider {...method}>
        <form className="space-y-5">
          <FormError />
          <InputField control={method.control} name="id" label="取引ID" />
          <DateField name="date" label="作成日" />
          <InputField name="createdUser" label="担当者" />
          <InputField
            control={method.control}
            name="description"
            label="取引内容"
          />
          <InputField control={method.control} name="memo" label="取引理由" />
          <NumberField
            control={method.control}
            name="amount"
            label="取引金額"
          />

          <div className="grid grid-cols-2 w-full gap-5 ">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => method.reset()}
            >
              キャンセル
            </Button>

            <Button type="submit" className="w-full">
              取引を登録する
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default TransactionEdit
