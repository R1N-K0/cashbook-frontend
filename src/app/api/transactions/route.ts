import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const body = await req.json()
  try {
    const res = await fetch('http://localhost:3001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      if (res.status === 401) redirect('/auth')
      const errorData = await res.json().catch(() => ({}))

      return NextResponse.json(errorData.message, { status: res.status })
    }

    return NextResponse.json(res.json())
  } catch (error) {
    console.error('createTransaction failed:', (error as Error).message)
    return NextResponse.json(
      { message: (error as Error).message || '不明なエラーが発生しました' },
      { status: 500 },
    )
  }
}

export async function GET(req: NextRequest) {
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
      const errorData = await res.json().catch(() => ({}))
      return NextResponse.json(errorData, { status: res.status })
    }

    const data = await res.json().catch(() => [])
    return NextResponse.json(data)
  } catch (error) {
    console.error('createTransaction failed:', (error as Error).message)

    return NextResponse.json(
      { message: (error as Error).message || '不明なエラーが発生しました' },
      { status: 500 },
    )
  }
}
