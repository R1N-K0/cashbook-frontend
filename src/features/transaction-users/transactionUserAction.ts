'use server'

import type { TransactionUsers } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getTransactionUsers(): Promise<
  | { data: TransactionUsers[]; success: true }
  | { message: string; status: number; success: false }
> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  try {
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

    const data: TransactionUsers[] = await res.json().catch(() => [])
    return { data, success: true }
  } catch (error) {
    console.error('createTransaction failed:', (error as Error).message)
    return {
      message: (error as Error).message ?? '不明なエラーが発生しました',
      status: 500,
      success: false,
    }
  }
}
