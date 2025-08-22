'use client'

import SimplePieChart from '@/features/components/SimplePieChart'
import type { PieChartData } from '@/types'

type Props = {
  data: PieChartData[]
}

export default function FinanceBarChart(props: Props) {
  const { data } = props
  return (
    <div className="container-fluid py-3  px-8 rounded-lg shadow-lg">
      <div className="lg:container md:container-fluid text-gray-600 font-semibold text-2xl mb-3">
        カテゴリー別支出
      </div>
      <SimplePieChart data={data} />
    </div>
  )
}
