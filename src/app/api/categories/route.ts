import type { CategoryFormValues } from '@/features/category/lib/schemas/categorySchema'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest): Promise<Response> {
  const cookie = req.headers.get('cookie')

  const body: CategoryFormValues = await req.json()

  const res = await fetch('http://localhost:3001/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookie || '',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  })

  if (!res.ok) {
    const errorData = await res.json()
    return NextResponse.json(errorData, { status: res.status })
  }

  const response = NextResponse.json({ message: 'create category' })
  return response
}
