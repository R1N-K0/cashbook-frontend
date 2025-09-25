'use client'

import { Button } from '@/components/ui/button'
import DateField from '@/features/components/fields/DateField'
import { FormError } from '@/features/components/fields/FormError'
import InputField from '@/features/components/fields/InputFiled'
import NumberField from '@/features/components/fields/NumberField'
import CategorySelectField from '@/features/transactions/components/fields/CategorySelectField'
import UserSelectField from '@/features/transactions/components/fields/UserSelectField'
import { useTransactionForm } from '@/features/transactions/hooks/useTransactionForm'
import useCategorySWR from '@/hooks/useCategorySWR'
import useUsersSWR from '@/hooks/useUsersSWR'
import { FormProvider } from 'react-hook-form'

export default function TransactionForm() {
  const { data: categoryData } = useCategorySWR()
  const { data: userData } = useUsersSWR()
  const { methods, onSubmit, selectedUser } = useTransactionForm({
    userData,
    categoryData,
  })

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

        <p className="text-sm text-gray-500 mt-0">
          残り上限: {selectedUser?.remainingAmount}円
        </p>

        <div className="flex flex-row justify-start items-center space-x-7">
          <DateField name="date" label="取引日" />

          <CategorySelectField
            name="categoryId"
            label="カテゴリー"
            data={categoryData}
          />

          <UserSelectField
            name="createdUserId"
            label="担当者"
            data={userData}
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
