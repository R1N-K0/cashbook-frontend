import MainHeader from '@/features/components/MainHeader'
import FinanceBarChart from '@/features/finance/components/FinanceBarChart'
import FinanceCardList from '@/features/finance/components/FinanceCardList'
import type { BarChartData } from '@/types'

export default function Home() {
  const data: BarChartData[] = [
    { name: '1月', value: 10000 },
    { name: '2月', value: 12000 },
    { name: '3月', value: 9000 },
    { name: '4月', value: 15000 },
    { name: '5月', value: 13000 },
    { name: '6月', value: 8000 },
    { name: '7月', value: 14000 },
    { name: '8月', value: 11000 },
    { name: '9月', value: 16000 },
    { name: '10月', value: 17000 },
    { name: '11月', value: 9000 },
    { name: '12月', value: 20000 },
  ]
  return (
    <div className="container-fluid bg-white">
      <MainHeader />
      <div className="container-fluid px-8 mt-5">
        <FinanceCardList />
        <div className="grid grid-flow-row gap-8 grid-cols-1 md:grid-cols-2">
          <FinanceBarChart data={data} />
        </div>
      </div>
    </div>
  )
}
