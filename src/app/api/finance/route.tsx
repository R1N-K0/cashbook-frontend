import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  try {
    const res = await fetch('http://localhost:3001/finance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
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
    console.error('createTransaction failed:', (error as Error).message)
    return NextResponse.json(
      { message: (error as Error).message ?? '不明なエラーが発生しました' },
      { status: 500 },
    )
  }
}
