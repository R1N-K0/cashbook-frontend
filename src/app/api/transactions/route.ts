import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export default async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  try {
    const res = await fetch('http://localhost:3001/transactions', {
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
  } catch (error) {
    console.error('GET /api/categories failed:', error)
    return NextResponse.json(
      { message: (error as Error).message || '不明なエラーが発生しました' },
      { status: 500 },
    )
  }
}
