import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const { id } = await context.params
  try {
    const res = await fetch(`http://localhost:3001/transactions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => {})
      console.error(errorData)
      return NextResponse.json(
        {
          message: errorData.message ?? '不明なエラーが発生しました',
        },
        { status: res.status },
      )
    }

    return NextResponse.json(await res.json())
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message ?? '不明なエラーが発生しました',
      },
      { status: 500 },
    )
  }
}
