'use server'
import type { CategoryFormValues } from '@/features/category/lib/schemas/categorySchema'
import type { CategoryRes } from '@/types'
import { type Category } from '@/types'
import { CategoryType } from 'enums/category-type'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
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
    if (res.status === 401) redirect('/auth')
    const errorData = await res.json().catch(() => {})
    return { message: errorData.message, status: res.status, success: false }
  }
  const response = await res.json()
  return { data: response, success: true }
}

export async function getAllCategory(): Promise<
  | { data: CategoryRes; success: true }
  | { message: string; status: number; success: false }
> {
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
  if (!res.ok) {
    if (res.status === 401) redirect('/auth')
    const errorData = await res.json().catch(() => {})
    return {
      message: errorData.message ?? '不明なエラーが発生しました',
      success: false,
      status: res.status,
    }
  }
  const data: Category[] = await res.json()
  const response: CategoryRes = data.reduce(
    (acc, val) => {
      if (val.type === CategoryType.income) {
        acc.income.push(val)
      } else if (val.type === CategoryType.expense) {
        acc.expense.push(val)
      }
      return acc
    },
    { income: [] as Category[], expense: [] as Category[] },
  )

  return { data: response, success: true }
}

export async function softDeleteCategory(id: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
        credentials: 'include',
      },
    },
  )

  if (!res.ok) {
    if (res.status === 401) redirect('/auth')
    const errorData = await res.json().catch(() => {})
    return { message: errorData.message, status: res.status, success: false }
  }
  const response = await res.json()
  return { message: response.message, success: true }
}
