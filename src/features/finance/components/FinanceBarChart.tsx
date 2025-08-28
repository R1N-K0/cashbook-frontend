'use client'

import SimpleBarChart from '@/features/components/SimpleBarChart'
import type { BarChartData } from '@/types'

type Props = {
  data: BarChartData[]
}

export default function FinanceBarChart(props: Props) {
  const { data } = props
  return (
    <div className="lg:container md:container-fluid py-3  px-8 rounded-lg shadow-sm bg-white border border-gray-200">
      <div className="text-gray-600 font-semibold text-2xl mb-3">
        月間収支の推移
      </div>
      <SimpleBarChart data={data} />
    </div>
  )
}
