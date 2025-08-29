import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const res = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    return NextResponse.json(errorData, { status: res.status })
  }
  const cookie = res.headers.get('set-cookie')
  const response = NextResponse.json({ message: 'Login success' })

  if (cookie) {
    response.headers.append('Set-Cookie', cookie)
  }
  return response
}
