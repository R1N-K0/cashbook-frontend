'use server'

import type { TransactionUsersReq } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createStaff(data: TransactionUsersReq) {
  const cookie = await cookies()
  const accessToken = cookie.get('access_token')?.value

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction-users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
        },
        body: JSON.stringify(data),
      },
    )

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      if (res.status === 401) redirect('/auth')
      return {
        message: errorData.message ?? '不明なエラーが発生しました',
        status: res.status,
        success: false,
      }
    }
    return { message: '登録完了しました', success: true }
  } catch (error) {
    console.error('createStaff failed:', (error as Error).message)
    return {
      message:
        'サーバーに接続できませんでした。しばらくしてから再度お試しください',
      status: 500,
      success: false,
    }
  }
}
