import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  try {
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return NextResponse.json(
        { message: errorData.message ?? '不明なエラーが発生しました' },
        { status: res.status },
      )
    }

    const cookie = res.headers.get('set-cookie')
    const data = await res.json()

    const response = NextResponse.json({ message: 'Login success', ...data })
    if (cookie) response.headers.append('Set-Cookie', cookie)

    return response
  } catch (error) {
    console.error('login failed:', (error as Error).message)
    return NextResponse.json(
      { message: (error as Error).message ?? '不明なエラーが発生しました' },
      { status: 500 },
    )
  }
}
