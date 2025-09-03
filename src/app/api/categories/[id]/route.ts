import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = Number(params)
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  try {
    const res = await fetch(`http://localhost:3001/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => {})
      return NextResponse.json(
        {
          message: errorData.message ?? '不明なエラーが発生しました',
        },
        { status: res.status },
      )
    }
    const data = await res.json()
    return NextResponse.json({ message: 'データを削除しました' })
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message ?? '不明なエラーが発生しました',
      },
      { status: 500 },
    )
  }
}
