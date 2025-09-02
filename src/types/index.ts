import type { CategoryType } from 'enums/category-type'

export type BarChartData = {
  name: string
  value: number
}

export type PieChartData = {
  name: string
  value: number
  color: string
}

export type LineChartData = {
  name: string
  value: number
}

export type Category = {
  id: string
  name: string
  type: CategoryType
  color: string
  //backend側にcountが追加されたら?を外す
  count?: number
}

export type CategoryRes = {
  income: Category[]
  expense: Category[]
}

interface FetchError extends Error {
  status?: number
}

export type TransactionData = {
  id: string
  user: { id: string; name: string }
  date: string
  description: string
  memo?: string | undefined
  amount: number
  editable: boolean
  category: Category
}

export type TransactionReq = {
  date: string
  description: string
  memo?: string
  amount: number
  categoryId: number
  createdUser: string
}
