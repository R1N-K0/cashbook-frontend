import type { CategoryFormValues } from '@/features/category/lib/schemas/categorySchema'

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
