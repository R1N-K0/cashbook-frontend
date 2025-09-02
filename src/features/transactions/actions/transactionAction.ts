'use server'

import type { TransactionFormValue } from '@/features/transactions/lib/schemas/transactionSchema.ts'
import type { Transaction } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createTransaction(data: TransactionFormValue) {
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
      const errorData = await res.json()
      throw Object.assign(new Error(errorData.message || '不明なデータです'), {
        status: res.status,
      })
    }
  } catch (error) {
    throw new Error('不明なエラーです')
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
  const response: Transaction[] = await res.json()
  return response
}
