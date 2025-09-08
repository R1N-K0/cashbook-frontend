'use client'

import { getAllCategory } from '@/features/category/actions/categoryAction'
import type { CategoryRes, FetchError } from '@/types'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

type Props = {
  initialData?: CategoryRes
}

export default function useCategorySWR({ initialData }: Props) {
  const router = useRouter()

  const fetcher = async () => {
    const res = await getAllCategory()

    if (!res.success) {
      const error = new Error(
        res.message ?? '不明なエラーが発生しました',
      ) as FetchError
      error.status = res.status

      throw error
    }

    return res.data
  }

  const { data, error, isLoading, mutate } = useSWR<CategoryRes>(
    '/api/categories',
    fetcher,
    {
      fallbackData: initialData ?? { income: [], expense: [] },
      revalidateOnMount: false,
      onErrorRetry: (error) => {
        if (error.status === 401) router.push('/auth')
      },
    },
  )

  return { data: data ?? { income: [], expense: [] }, error, isLoading, mutate }
}
