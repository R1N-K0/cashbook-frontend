'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function executeClosing({
  year,
  month,
}: {
  year: number
  month: number
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/closing`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
    },
    body: JSON.stringify({ year, month }),
    credentials: 'include',
  })
  if (!res.ok) {
    if (res.status === 401) redirect('/auth')
    const errorData = await res.json().catch(() => ({}))
    console.log(errorData, res.status)
    return {
      message: errorData.message ?? '不明なエラーが発生しました',
      status: res.status,
      success: false,
    }
  }
  const response = await res.json().catch(() => ({}))
  return { data: response, success: true }
}
