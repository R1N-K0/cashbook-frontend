'use client'

import { getAllTransaction } from '@/features/transactions/actions/transactionAction'
import type { FetchError, TransactionData } from '@/types'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

export default function useTransactionSWR() {
  const router = useRouter()

  const fetcher = async (): Promise<TransactionData[]> => {
    const res = await getAllTransaction()

    if (!res.success) {
      const error = new Error(res.message ?? '不明なエラーです') as Error & {
        status: number
      }
      error.status = res.status
      throw error
    }

    return res.data
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    TransactionData[]
  >('/api/transactions', fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    onErrorRetry: (error: FetchError) => {
      if (error.status === 401) router.push('/auth')
    },
  })

  return { data: data ?? [], error, isLoading, isValidating, mutate }
}
