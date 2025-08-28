import FinanceCard from '@/features/finance/components/FinanceCard'
import TotalBalanceCard from '@/features/finance/components/TotalBalanceCard'
import type { LineChartData } from '@/types'

type Props = {
  balanceData: LineChartData[]
}

export default function FinanceCardList(props: Props) {
  const { balanceData } = props
  return (
    <div className="grid grid-flow-row gap-3 md:gap-3 text-neutral-600 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 py-3">
      <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1">
        <TotalBalanceCard data={balanceData} amount={450000} />
      </div>
      <FinanceCard title="今月の収入" amount={350000} />
      <FinanceCard title="今月の支出" amount={210000} />
      <FinanceCard title="月間収支" amount={140000} />
    </div>
  )
}
