import type { CategoryFormValues } from '@/features/category/lib/schemas/categorySchema'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<Response> {
  const cookie = req.headers.get('cookie')
  const body: CategoryFormValues = await req.json()

  try {
    const res = await fetch('http://localhost:3001/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookie || '',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return NextResponse.json(errorData.message, { status: res.status })
    }

    const response = NextResponse.json({ message: 'create category' })
    return response
  } catch (error) {
    console.error('createTransaction failed:', (error as Error).message)
    return NextResponse.json(
      { message: (error as Error).message ?? '不明なエラーが発生しました' },
      { status: 500 },
    )
  }
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  try {
    const res = await fetch('http://localhost:3001/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => {})
      return NextResponse.json(
        { message: errorData.message ?? '不明なエラーが発生しました' },
        { status: res.status },
      )
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /api/categories failed:', error)
    return NextResponse.json(
      { message: (error as Error).message ?? '不明なエラーが発生しました' },
      { status: 500 },
    )
  }
}
