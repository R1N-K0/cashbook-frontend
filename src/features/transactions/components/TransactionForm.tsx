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
import utsToJst from '@/features/transactions/components/utils/ustToJst'
import { useManager } from '@/features/transactions/hooks/useManager'
import { useTransactionForm } from '@/features/transactions/hooks/useTransactionForm'
import useCategorySWR from '@/hooks/useCategorySWR'
import useTransactionSWR from '@/hooks/useTransactionSWR'
import useUsersSWR from '@/hooks/useUsersSWR'
import type { formPageType } from '@/types'
import { useEffect, useState } from 'react'
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
  const [inputPossible, setInputPossible] = useState(true)
  const [pageType, setPageType] = useState<formPageType>(formPageType)

  const { methods, onSubmit, selectedUser, status } = useTransactionForm({
    userData,
    categoryData,
    formPageType,
    transactionId,
  })

  const transaction = transactionDatas.find((data) => data.id === transactionId)
  const managerId = useManager(transaction, userData)

  const changePageType = (pageType: formPageType) => {
    if (pageType === 'detail') {
      setInputPossible(true)
      setPageType(pageType)
    }
  }

  useEffect(() => {
    if (pageType === 'create') {
      setInputPossible(false)
    }
  }, [pageType])

  useEffect(() => {
    if (transactionDatas && transactionId && pageType !== 'create') {
      if (transaction) {
        console.log('useEffect')
        methods.setValue('title', transaction.title)
        methods.setValue('description', transaction.description)
        methods.setValue('memo', transaction.memo ?? '')
        methods.setValue('amount', transaction.amount)
        methods.setValue('status', transaction.status)
      }
    }
  }, [transactionDatas, transactionId, pageType, methods, transaction])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto px-8 lg:container-fluid container lg:max-w-5xl"
      >
        <div className="flex flex-row justify-end items-center space-x-3 px-55">
          {inputPossible !== true && (
            <Button
              type="button"
              variant="outline"
              onClick={
                pageType !== 'create'
                  ? () => {
                      changePageType('detail')
                      methods.reset()
                    }
                  : () => methods.reset()
              }
            >
              キャンセル
            </Button>
          )}

          {inputPossible !== true &&
            (pageType === 'create' || pageType === 'edit') && (
              <Button type="submit">
                {pageType === 'create' ? '取引を登録する' : '取引を更新する'}
              </Button>
            )}

          {inputPossible &&
            pageType !== 'create' &&
            (transaction?.editable !== false ? (
              <Button
                type="button"
                onClick={() => {
                  setInputPossible(false)
                  setPageType('edit')
                }}
              >
                編集する
              </Button>
            ) : (
              <div className="px-2 py-1 bg-orange-200 text-orange-800 rounded-sm text-sm font-medium">
                締め処理済みデータ
              </div>
            ))}
        </div>
        <FormError />
        <div className="flex flex-row justify-start items-center space-x-3">
          <DateField
            name="date"
            label="取引日"
            defaultValue={
              transaction?.date
                ? utsToJst(new Date(transaction?.date))
                : undefined
            }
            disabled={inputPossible}
          />
          <div className="flex flex-row items-end space-x-2">
            <UserSelectField
              name="createdUserId"
              label="申請者"
              data={userData}
              style={pageType === 'detail' ? { pointerEvents: 'none' } : {}}
              managerId={managerId}
              disabled={inputPossible}
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
              disabled={inputPossible}
            />
          </div>
          <CategorySelectField
            name="categoryId"
            label="カテゴリー"
            data={categoryData}
            style={formPageType === 'detail' ? { pointerEvents: 'none' } : {}}
            disabled={inputPossible}
          />
        </div>
        <div className="grid grid-cols-5 items-center space-x-3">
          <div className="col-span-3">
            <InputField
              control={methods.control}
              name="description"
              label="取引理由"
              placeholder="取引理由を入力"
              className="flex-grow w-full"
              disabled={inputPossible}
            />
          </div>
          <NumberField
            control={methods.control}
            name="amount"
            placeholder="取引金額を入力"
            label="取引金額"
            disabled={inputPossible}
          />
        </div>
        <BoolSelectField
          control={methods.control}
          name="status"
          label="申請許可"
          defaultValue={transaction?.status?.toString() ?? undefined}
          disabled={inputPossible}
        />
        {status === false ? (
          <TextField
            control={methods.control}
            name="memo"
            placeholder="却下理由を入力"
            label="却下理由"
            defaultValue={transaction?.memo ?? ''}
            disabled={inputPossible}
          />
        ) : null}
      </form>
    </FormProvider>
  )
}
