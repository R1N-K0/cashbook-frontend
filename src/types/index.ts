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
  count?: number
}

export type CategoryRes = {
  income: Category[]
  expense: Category[]
}

export interface FetchError extends Error {
  status?: number
}

export type TransactionData = {
  id: string
  createdUser: string
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

export type ExpenseByCategory = {
  name: string
  value: number
  color: string
}

export type ProfitLossByMonth = {
  expense: number
  income: number
  month: string
  profitLoss: number
}

export type FinanceReq = {
  balance: number
  expense: number
  expenseByCategory: ExpenseByCategory[]
  income: number
  profitLoss: number
  profitLossByMonth: ProfitLossByMonth[]
}

export type SimpleCardData = {
  name: string
  amount: number
}

export type linerCardData = SimpleCardData & {
  lineChartData: LineChartData[]
}

export type UpdateTransactionRes = TransactionData & {
  updatedUser: string
  created_at: string
  updated_at: string
}
