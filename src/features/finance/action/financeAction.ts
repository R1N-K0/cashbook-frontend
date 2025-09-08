'use server'

import type { FinanceReq } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getFinanceData(): Promise<
  | {
      data: FinanceReq
      success: true
    }
  | { message: string; status: number; success: false }
> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/finance`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
    },
    credentials: 'include',
  })

  if (!res.ok) {
    if (res.status === 401) redirect('/auth')
    const errorData = await res.json().catch(() => ({}))
    return {
      message: errorData.message ?? '不明なエラーが発生しました',
      status: res.status,
      success: false,
    }
  }

  const data: FinanceReq = await res.json()

  console.log(data)

  return { data, success: true }
}
