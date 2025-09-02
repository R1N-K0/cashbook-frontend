'use client'

import { getAllCategory } from '@/features/category/actions/categoryAction'
import type { CategoryRes } from '@/types'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

type Props = {
  initialData?: CategoryRes
}

export default function useCategorySWR({ initialData }: Props) {
  const router = useRouter()

  const fetcher = async () => {
    return await getAllCategory()
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

  return { data, error, isLoading, mutate }
}
