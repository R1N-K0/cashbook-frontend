'use server'

import type {
  TransactionData,
  TransactionReq,
  TransactionUpdateReq,
} from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createTransaction(data: TransactionReq) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
      body: JSON.stringify(data),
      credentials: 'include',
    },
  )
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

export async function updateTransaction(
  data: TransactionUpdateReq,
  id: string,
): Promise<
  | { data: TransactionUpdateReq; success: true }
  | { message: string; status: number; success: false }
> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions/${id}`,

    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
        credentials: 'include',
      },

      body: JSON.stringify(data),
    },
  )

  if (!res.ok) {
    if (res.status === 401) redirect('/auth')
    const errorData = await res.json().catch(() => ({}))
    console.log(errorData, res.status)
    return { message: errorData.message, status: res.status, success: false }
  }

  const response = await res.json()
  return { data: response, success: true }
}

export async function getAllTransaction(): Promise<
  | { data: TransactionData[]; success: true }
  | { message: string; status: number; success: false }
> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },

      credentials: 'include',
    },
  )

  if (!res.ok) {
    if (res.status === 401) redirect('/auth')
    else {
      const errorData = await res.json().catch(() => {})

      return {
        message: errorData.message ?? '不明なエラーが発生しました',
        status: res.status,
        success: false,
      }
    }
  }
  const response: TransactionData[] = await res.json().catch(() => [])
  // ここだけ担当ユーザーのフォーマットはバック側で対応した
  return { data: response, success: true }
}

export async function getTransaction(
  id: string,
): Promise<
  | { data: TransactionData; success: true }
  | { message: string; status: number; success: false }
> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
      },
      credentials: 'include',
    },
  )
  if (!res.ok) {
    if (res.status === 401) redirect('/auth')
    const errorData = await res.json().catch(() => {})
    return {
      message: errorData.message ?? '不明なエラーが発生しました',
      success: false,
      status: res.status,
    }
  }
  const data = await res.json().catch(() => ({}))
  const resData: TransactionData = {
    ...data,
    createdUser: `${data.createdUser.lastName} ${data.createdUser.firstName}`,
  }

  return { data: resData, success: true }
}

export async function softDeleteTransaction(id: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Cookie: `access_token=${accessToken}` } : {}),
        credentials: 'include',
      },
    },
  )

  if (!res.ok) {
    if (res.status === 401) redirect('/auth')
    const errorData = await res.json().catch(() => {})
    return { message: errorData.message, status: res.status, success: false }
  }
  const response = await res.json()
  return { message: response.message, success: true }
}
