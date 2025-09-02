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

export enum CategoryType {
  income = 'income',
  expense = 'expense',
}

export type Category = {
  id: number
  name: string
  type: CategoryType
  color: string
}

export type CategoryRes = {
  income: Category[]
  expense: Category[]
}

interface FetchError extends Error {
  status?: number
}

export type transactionData = CategoryType & {
  id: string
  date: string
  user: string
  description: string
  memo: string
  amount: number
}

export type Transaction = {
  id: number
  date: string
  description: string
  memo?: string | undefined
  amount: number
  editable: number
  createdUser: string
  category: Category
}
