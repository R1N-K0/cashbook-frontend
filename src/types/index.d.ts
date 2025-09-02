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
