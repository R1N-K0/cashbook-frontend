'use server'

import type { TransactionData, TransactionReq } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createTransaction(data: TransactionReq) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
        },
        body: JSON.stringify(data),
        credentials: 'include',
      },
    )
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw Object.assign(new Error(errorData || '不明なデータです'), {
        status: res.status,
      })
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('ネットワークエラー、または不明なエラーが発生しました')
  }
}

export async function getAllTransaction() {
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
    if (res.status === 401) {
      redirect('/auth')
    } else {
      const errorData = await res.json()
      throw Object.assign(new Error(errorData.message || '不明なデータです'), {
        status: res.status,
      })
    }
  }
  const response: TransactionData[] = await res.json()
  return response
}
