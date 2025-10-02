import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const { year, month } = await req.json()

  try {
    const res = await fetch('http://localhost:3001/closing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
      body: JSON.stringify({ year, month }),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return NextResponse.json(errorData ?? '不明なエラーが発生しました', {
        status: res.status,
      })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('failed:', (error as Error).message)
    return NextResponse.json(
      { message: (error as Error).message ?? '不明なエラーが発生しました' },
      { status: 500 },
    )
  }
}
