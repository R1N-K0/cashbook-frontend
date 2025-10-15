'use client'

import SimpleBarChart from '@/features/components/SimpleBarChart'
import type { BarChartData } from '@/types'

type Props = {
  incomeData: BarChartData[]
  expenseData: BarChartData[]
}

export default function UserReportsCard(props: Props) {
  const { incomeData, expenseData } = props
  return (
    <div className="w-full container grid md:grid-cols-2 gap-4 mt-3 mb-3">
      <div className="lg:container md:container-fluid py-3  px-8 rounded-lg shadow-sm bg-white border border-gray-200">
        <div className="text-gray-600 font-semibold text-2xl mb-3">
          ユーザー別収入
        </div>
        <SimpleBarChart data={incomeData} />
      </div>
      <div className="lg:container md:container-fluid py-3  px-8 rounded-lg shadow-sm bg-white border border-gray-200">
        <div className="text-gray-600 font-semibold text-2xl mb-3">
          ユーザー別支出
        </div>
        <SimpleBarChart data={expenseData} />
      </div>
    </div>
  )
}
