'use client'

import { getFinanceReportData } from '@/features/finance/action/financeAction'
import type { FetchError, ReportRes } from '@/types'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

type Props = {
  year: number
  month: number
}

export default function useReportSWR({ year, month }: Props) {
  const router = useRouter()

  const fetcher = async (year: number, month: number) => {
    const res = await getFinanceReportData(year, month)

    if (!res.success) {
      const error = new Error(res.message ?? '不明なエラーです') as Error & {
        status: number
      }
      error.status = res.status
      throw error
    }

    return res.data
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<ReportRes>(
    ['/api/finance/report', year, month],
    () => fetcher(year, month),
    {
      onErrorRetry: (error: FetchError) => {
        if (error.status === 401) router.push('/auth')
      },
      revalidateOnMount: true,
      revalidateIfStale: true,
      dedupingInterval: 0,
      keepPreviousData: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return { data, error, isLoading, isValidating, mutate }
}
