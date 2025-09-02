'use server'

import type { CategoryFormValues } from '@/features/category/lib/schemas/categorySchema'
import type { CategoryRes } from '@/types'
import { type Category } from '@/types'
import { cookies } from 'next/headers'
export async function createCategory(data: CategoryFormValues) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
        credentials: 'include',
      },
      body: JSON.stringify(data),
    },
  )

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Error creating category')
  }
  return res.json()
}

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
  const data: Category[] = await res.json()
  const response: CategoryRes = data.reduce(
    (acc, val) => {
      if (val.type === 'income') {
        acc.income.push(val)
      } else if (val.type === 'expense') {
        acc.expense.push(val)
      }
      return acc
    },
    { income: [] as Category[], expense: [] as Category[] },
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`)
  }
  return response
}
