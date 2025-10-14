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
  updatedUser: string
  date: string
  title: string
  description: string
  amount: number
  memo?: string
  status: boolean
  editable: boolean
  category: Category
}

export type TransactionReq = {
  date: string
  description: string
  memo?: string
  amount: number
  categoryId: number
  createdUserId: number
}

export type TransactionUpdateReq = Omit<TransactionReq, 'createdUserId'> & {
  updatedUserId: number
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
  cumulativeBalance: number
}

export type FinanceReq = {
  balance: number
  expense: number
  count: number
  cancelCount: number
  expenseByCategory: PieChartData[]
  incomeByCategory: PieChartData[]
  income: number
  profitLoss: number
  profitLossByMonth: ProfitLossByMonth[]
  monthExpenseChange: number
  monthIncomeChange: number
}

export type SimpleCardData = {
  name: string
  amount: number
}

export type linerCardData = SimpleCardData & {
  lineChartData: LineChartData[]
}

export type TransactionUsers = {
  id: string
  firstName: string
  lastName: string
  limitAmount: number
  transactionCount: number
  remainingAmount: number
  created_at: string
}

export type TransactionUsersReq = {
  firstName: string
  lastName: string
  limitAmount: number
}

export type formPageType = 'create' | 'edit' | 'detail'

export type AmountByUser = {
  name: string
  value: number
}

export type ReportRes = {
  balance: number
  count: number
  cancelCount: number
  expense: number
  expenseByCategory: PieChartData[]
  incomeByCategory: PieChartData[]
  income: number
  profitLoss: number
  incomeByUser: BarChartData[]
  expenseByUser: BarChartData[]
  transactions: TransactionData[]
}
