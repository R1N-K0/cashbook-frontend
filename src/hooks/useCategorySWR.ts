import { getAllCategory } from '@/features/category/actions/categoryAction'
import type { CategoryRes } from '@/types'
import useSWR from 'swr'

type Props = {
  initialData?: CategoryRes[]
}

export default function useCategorySWR({ initialData }: Props) {
  const fetcher = async () => {
    return await getAllCategory()
  }

  const { data, error, isLoading, mutate } = useSWR<CategoryRes[]>(
    '/api/categories',
    fetcher,

    { fallbackData: initialData ?? [], revalidateOnMount: true },
  )

  return { data, error, isLoading, mutate }
}
