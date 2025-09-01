'use server'

import type { CategoryRes } from '@/types'
import { cookies } from 'next/headers'

export async function getAllCategory() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },

      credentials: 'include',
    },
  )
  const data: CategoryRes[] = await res.json()
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`)
  }
  return data
}
