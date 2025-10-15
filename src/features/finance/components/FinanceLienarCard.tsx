'use client'

import SimpleLineChart from '@/features/components/SimpleLineChart'
import type { LineChartData } from '@/types'

type Props = {
  data: LineChartData[]
}
export default function FinanceLinearCard({ data }: Props) {
  return (
    <div className="container-fluid bg-white w-full flex flex-col border border-gray-200 items-start py-4 justify-center space-y-2 shadow-sm rounded-lg px-4 h-full">
      <div className="text-lg font-semibold text-gray-400">総残高の推移</div>
      <SimpleLineChart data={data} />
    </div>
  )
}
