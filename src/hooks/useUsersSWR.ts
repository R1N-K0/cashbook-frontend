import { getTransactionUsers } from '@/features/transaction-users/transactionUserAction'
import type { FetchError } from '@/types'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

export default function useUsersSWR() {
  const router = useRouter()
  const fetcher = async () => {
    const res = await getTransactionUsers()
    if (!res.success) {
      const errorData = res.message
      const error = new Error(
        errorData ?? '不明なエラーが発生しました',
      ) as Error & { status: number }
      error.status = res.status
      throw error
    }
    return res.data
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    '/api/transaction-users',
    fetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      onErrorRetry: (
        error: FetchError,
        key,
        config,
        revalidate,
        { retryCount },
      ) => {
        if (error.status === 401) router.push('/auth')
        if (error.status === 404) return
        if (retryCount >= 3) return
        setTimeout(() => revalidate(), 5000)
      },
    },
  )

  return { data: data ?? [], error, isLoading, mutate, isValidating }
}
