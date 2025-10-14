'use client'

import SimplePieChart from '@/features/components/SimplePieChart'
import type { PieChartData } from '@/types'

type Props = {
  data: PieChartData[]
  title: string
}

export default function FinanceBarChart(props: Props) {
  const { data, title } = props
  return (
    <div className="container-fluid py-3  px-8 rounded-lg shadow-sm bg-white border border-gray-200">
      <div className="lg:container md:container-fluid text-gray-600 font-semibold text-2xl mb-3">
        {title}
      </div>
      <SimplePieChart data={data} />
    </div>
  )
}
