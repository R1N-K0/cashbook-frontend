'use client'

import { Button } from '@/components/ui/button'
import DateField from '@/features/components/fields/DateField'
import { FormError } from '@/features/components/fields/FormError'
import InputField from '@/features/components/fields/InputFiled'
import NumberField from '@/features/components/fields/NumberField'
import TextField from '@/features/components/fields/TextField'
import BoolSelectField from '@/features/transactions/components/fields/BoolField'
import CategorySelectField from '@/features/transactions/components/fields/CategorySelectField'
import UserSelectField from '@/features/transactions/components/fields/UserSelectField'
import { useTransactionForm } from '@/features/transactions/hooks/useTransactionForm'
import useCategorySWR from '@/hooks/useCategorySWR'
import useTransactionSWR from '@/hooks/useTransactionSWR'
import useUsersSWR from '@/hooks/useUsersSWR'
import type { formPageType } from '@/types'
import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

type props = {
  formPageType: formPageType
  transactionId?: string
}

export default function TransactionForm({
  formPageType,
  transactionId,
}: props) {
  const { data: categoryData } = useCategorySWR()
  const { data: userData } = useUsersSWR()
  const { data: transactionDatas } = useTransactionSWR()

  const { methods, onSubmit, selectedUser, status } = useTransactionForm({
    userData,
    categoryData,
    formPageType,
    transactionId,
  })

  useEffect(() => {
    if (transactionDatas && transactionId && formPageType !== 'create') {
      const transaction = transactionDatas.find(
        (data) => data.id === transactionId,
      )
      if (transaction) {
        methods.setValue('description', transaction.description)
        methods.setValue('memo', transaction.memo ?? '')
        methods.setValue('amount', transaction.amount)
      }
    }
  }, [transactionDatas, transactionId, formPageType, methods])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto px-8 lg:container-fluid container lg:max-w-5xl"
      >
        <FormError />
        <div className="flex flex-row justify-start items-center space-x-3">
          <DateField name="date" label="取引日" />
          <div className="flex flex-row items-end space-x-2">
            <UserSelectField
              name="createdUserId"
              label="申請者"
              data={userData}
              style={formPageType === 'detail' ? { pointerEvents: 'none' } : {}}
            />
            <p className="text-sm text-gray-500 mt-0">
              残り上限: {selectedUser?.remainingAmount}円
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <div className="col-span-3">
            <InputField
              control={methods.control}
              name="title"
              label="取引内容"
              placeholder="取引内容を入力"
              readOnly={formPageType === 'detail'}
            />
          </div>
          <CategorySelectField
            name="categoryId"
            label="カテゴリー"
            data={categoryData}
            style={formPageType === 'detail' ? { pointerEvents: 'none' } : {}}
          />
        </div>

        <div className="grid grid-cols-5 items-center space-x-3">
          <div className="col-span-3">
            <InputField
              control={methods.control}
              name="description"
              label="取引理由"
              placeholder="取引理由を入力"
              readOnly={formPageType === 'detail'}
              className="flex-grow w-full"
            />
          </div>
          <NumberField
            control={methods.control}
            name="amount"
            placeholder="取引金額を入力"
            label="取引金額"
            readOnly={formPageType === 'detail'}
          />
        </div>

        <BoolSelectField
          control={methods.control}
          name="status"
          label="申請許可"
          disabled={formPageType === 'detail'}
        />

        {status === false && (
          <TextField
            control={methods.control}
            name="memo"
            placeholder="却下理由を入力"
            label="却下理由"
            disabled={formPageType === 'detail'}
          />
        )}

        {formPageType !== 'detail' && (
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
              {formPageType === 'create' ? '取引を登録する' : '取引を更新する'}
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  )
}
