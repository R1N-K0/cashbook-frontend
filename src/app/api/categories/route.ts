import type { CategoryFormValues } from '@/features/category/lib/schemas/categorySchema'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

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
  })

  if (!res.ok) {
    const errorData = await res.json()
    return NextResponse.json(errorData, { status: res.status })
  }

  const response = NextResponse.json({ message: 'create category' })
  return response
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const res = await fetch('http://localhost:3001/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
    },
  })

  if (!res.ok) {
    const errorData = await res.json()
    return NextResponse.json(errorData, { status: res.status })
  }
  const data = await res.json()
  return NextResponse.json(data)
}
