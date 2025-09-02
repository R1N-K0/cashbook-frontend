'use client' // クライアントコンポーネントでのみ使用

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
    try {
      return await getAllCategory()
    } catch (err: unknown) {
      if (err instanceof Error) {
        const maybeError = err as FetchError
        if (maybeError.status === 401) {
          router.push('/auth')
        }
        throw err
      }
      throw err
    }
  }

  const { data, error, isLoading, mutate } = useSWR<CategoryRes>(
    '/api/categories',
    fetcher,
    {
      fallbackData: initialData ?? { income: [], expense: [] },
      revalidateOnMount: false,
    },
  )

  return { data, error, isLoading, mutate }
}
