import { cookies } from 'next/headers'
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
      const errorData = await res.json().catch(() => ({}))

      return NextResponse.json(
        { message: errorData.message },
        { status: res.status },
      )
    }
    const response = await res.json().catch(() => ({}))
    return NextResponse.json(response)
  } catch (error) {
    console.error('createTransaction failed:', (error as Error).message)
    return NextResponse.json(
      {
        message:
          'サーバーに接続できませんでした。しばらくしてから再度お試しください',
      },
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
      return NextResponse.json(
        'サーバーに接続できませんでした。しばらくしてから再度お試しください',
        {
          status: res.status,
        },
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('createTransaction failed:', (error as Error).message)
    return NextResponse.json(
      {
        message:
          'サーバーに接続できませんでした。しばらくしてから再度お試しください',
      },
      { status: 500 },
    )
  }
}
