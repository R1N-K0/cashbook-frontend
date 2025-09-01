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

export type CategoryType = {
  type: 'income' | 'expense'
}

export type CategoryRes = {
  id: number
  name: string
  type: CategoryType
  color: string
}
