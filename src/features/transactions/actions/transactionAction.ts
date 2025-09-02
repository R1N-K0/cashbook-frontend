import type { Transaction } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function getAllTransaction() {
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
    }
    const errorData = await res.json()
    throw Object.assign(new Error(errorData.message || '不明なデータです'), {
      status: res.status,
    })
  }
  const response: Transaction[] = await res.json()
  return response
}
