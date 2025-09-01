import type { CategoryFormValues } from '@/features/category/lib/schemas/categorySchema'
import type { CategoryRes } from '@/types'

export async function CreateCategory(data: CategoryFormValues) {
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Error creating category')
  }
  return res.json()
}

export async function GetAllCategories(): Promise<CategoryRes[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`)
  }
  return res.json()
}
