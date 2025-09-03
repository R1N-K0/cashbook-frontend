'use server'

import type {
  BarChartData,
  LineChartData,
  PieChartData,
  TransactionData,
} from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getFinanceData(): Promise<
  | {
      barChartData: BarChartData[]
      categoryData: PieChartData[]
      lineChartData: LineChartData[]
      success: true
    }
  | { message: string; status: number; success: false }
> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
      credentials: 'include',
    },
  )

  if (!res.ok) {
    if (res.status === 401) redirect('/auth')
    const errorData = await res.json().catch(() => ({}))
    return {
      message: errorData.message ?? '不明なエラーが発生しました',
      status: res.status,
      success: false,
    }
  }

  const data: TransactionData[] = await res.json()

  const barChartData: BarChartData[] = Object.entries(
    data.reduce(
      (acc, tx) => {
        const month = new Date(tx.date).getMonth() + 1
        const key = `${month}月`
        acc[key] = (acc[key] || 0) + tx.amount
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({ name, value }))

  const categoryData: PieChartData[] = Object.entries(
    data.reduce(
      (acc, tx) => {
        const catName = tx.category?.name ?? ''
        if (catName === '') return acc
        acc[catName] = (acc[catName] || 0) + tx.amount
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value], index) => ({
    name,
    value,
    color: ['#D1E9F6', '#F6EACB', '#F1D3CE', '#EECAD5'][index % 4],
  }))

  const lineChartData: LineChartData[] = Object.entries(
    data.reduce(
      (acc, tx) => {
        const day = `Day ${new Date(tx.date).getDate()}`
        acc[day] = (acc[day] || 0) + tx.amount
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({ name, value }))

  console.log(barChartData, categoryData, lineChartData)

  return { barChartData, categoryData, lineChartData, success: true }
}
