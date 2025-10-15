import {
  createTransaction,
  updateTransaction,
} from '@/features/transactions/actions/transactionAction'
import utsToJst from '@/features/transactions/components/utils/ustToJst'
import {
  transactionSchema,
  type TransactionFormValue,
} from '@/features/transactions/lib/schemas/transactionSchema.ts'
import type {
  CategoryRes,
  formPageType,
  TransactionReq,
  TransactionUpdateReq,
  TransactionUsers,
} from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  userData: TransactionUsers[]
  categoryData: CategoryRes
  formPageType: formPageType
  transactionId?: string
}

export const useTransactionForm = ({
  userData,
  categoryData,
  formPageType,
  transactionId,
}: Props) => {
  const router = useRouter()
  const methods = useForm<TransactionFormValue>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      memo: null,
      amount: 0,
      status: false,
      categoryId: Number(categoryData?.expense[0]?.id) ?? 1,
      createdUserId: Number(userData[0]?.id) ?? 1,
    },
  })

  const status = methods.watch('status')
  const createdUserId = methods.watch('createdUserId')
  const selectedUser = userData.find(
    (user) => Number(user.id) === createdUserId,
  )

  const onSubmit: SubmitHandler<TransactionFormValue> = async (data) => {
    const createFormattedData: TransactionReq = {
      ...data,
      memo: data.memo ?? undefined,
      date: data.date ? utsToJst(data.date).toISOString().split('T')[0] : '',
      amount: Number(data.amount || 0),
    }

    const selectedCategory = categoryData.expense.find(
      (category) => Number(category.id) === Number(data.categoryId),
    )
    if (
      createFormattedData.amount > (selectedUser?.remainingAmount ?? 0) &&
      selectedCategory
    ) {
      toast.error('取引金額が担当者の残り上限を超えています')
      return
    }

    if (formPageType === 'create') {
      const res = await createTransaction(createFormattedData)
      if (!res.success) {
        methods.setError('root', {
          type: 'server',
          message: JSON.stringify(res.message),
        })
        return
      }
      toast.success('登録が完了しました')
      methods.reset()
      router.push('/transactions')
    }

    if (formPageType === 'edit' && transactionId && selectedUser) {
      const { createdUserId, ...rest } = createFormattedData
      const updateformattedData: TransactionUpdateReq = {
        ...rest,
        updatedUserId: Number(selectedUser?.id),
      }

      const res = await updateTransaction(updateformattedData, transactionId)
      if (!res.success) {
        methods.setError('root', {
          type: 'server',
          message: JSON.stringify(res.message),
        })
      }
      toast.success('更新が完了しました')
      methods.reset()
      router.push('/transactions')
    }
  }

  return { methods, onSubmit, selectedUser, status }
}
