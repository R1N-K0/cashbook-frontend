'use client'

import { getAllTransaction } from '@/features/transactions/actions/transactionAction'
import type { Transaction } from '@/types'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

type Props = {
  initialData?: Transaction[]
}

export default function useTransactionSWR({ initialData }: Props) {
  const router = useRouter()

  const fetcher = async () => {
    return await getAllTransaction()
  }

  const { data, error, isLoading, mutate } = useSWR<Transaction[]>(
    '/api/categories',
    fetcher,
    {
      fallbackData: initialData ?? [],
      revalidateOnMount: false,
      onErrorRetry: (error) => {
        if (error.status === 401) router.push('/auth')
      },
    },
  )

  return { data, error, isLoading, mutate }
}
