import { createTransaction } from '@/features/transactions/actions/transactionAction'
import utsToJst from '@/features/transactions/components/utils/ustToJst'
import {
  transactionSchema,
  type TransactionFormValue,
} from '@/features/transactions/lib/schemas/transactionSchema.ts'
import type { CategoryRes, TransactionReq, TransactionUsers } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  userData: TransactionUsers[]
  categoryData: CategoryRes
}

export const useTransactionForm = ({ userData, categoryData }: Props) => {
  const router = useRouter()
  const methods = useForm<TransactionFormValue>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      memo: null,
      amount: 0,
      categoryId: Number(categoryData?.expense[0]?.id) ?? 1,
      createdUserId: Number(userData[0]?.id) ?? 1,
    },
  })

  const createdUserId = methods.watch('createdUserId')
  const selectedUser = userData.find(
    (user) => Number(user.id) === createdUserId,
  )

  const onSubmit: SubmitHandler<TransactionFormValue> = async (data) => {
    const formattedData: TransactionReq = {
      ...data,
      memo: data.memo ?? undefined,
      date: data.date ? utsToJst(data.date).toISOString().split('T')[0] : '',
      amount: Number(data.amount || 0),
    }

    if (formattedData.amount > (selectedUser?.remainingAmount ?? 0)) {
      toast.error('取引金額が担当者の残り上限を超えています')
      return
    }
    const res = await createTransaction(formattedData)

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

  return { methods, onSubmit, selectedUser }
}
