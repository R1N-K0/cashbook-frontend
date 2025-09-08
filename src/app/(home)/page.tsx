import FinanceBarChart from '@/features/finance/components/FinanceBarChart'
import FinanceCardList from '@/features/finance/components/FinanceCardList'
import FinancePieChart from '@/features/finance/components/FinancePieChart'
import type { BarChartData, LineChartData, PieChartData } from '@/types'

const Home = async () => {
  // const res = await getFinanceData()
  // if (!res.success)
  //   if (!res.success) {
  //     return (
  //       <div className="container-fluid h-full">
  //         <Alert variant="destructive">
  //           <AlertTitle>エラーが発生しました</AlertTitle>
  //           <AlertDescription>{res.message}</AlertDescription>
  //         </Alert>
  //       </div>
  //     )
  //   }

  const barChartData: BarChartData[] = [
    { name: '1月', value: 13000 },
    { name: '2月', value: 13000 },
    { name: '3月', value: 13000 },
    { name: '4月', value: 13000 },
    { name: '5月', value: 13000 },
    { name: '6月', value: 8000 },
    { name: '7月', value: 14000 },
    { name: '8月', value: 11000 },
    { name: '9月', value: 16000 },
    { name: '10月', value: 17000 },
    { name: '11月', value: 9000 },
    { name: '12月', value: 20000 },
  ]

  const categoryData: PieChartData[] = [
    { name: 'Group A', value: 400, color: '#D1E9F6' },
    { name: 'Group B', value: 300, color: '#F6EACB' },
    { name: 'Group C', value: 300, color: '#F1D3CE' },
    { name: 'Group D', value: 200, color: '#EECAD5' },
  ]

  const lineChartData: LineChartData[] = [
    { name: 'Day 7', value: 5000 },
    { name: 'Day 8', value: 8100 },
    { name: 'Day 9', value: 19000 },
    { name: 'Day 10', value: 23000 },
    { name: 'Day 11', value: 5500 },
    { name: 'Day 12', value: 10400 },
  ]
  return (
    <div className="container-fluid h-full">
      <div className="container-fluid px-10 mt-3">
        <FinanceCardList balanceData={lineChartData} />
        <div className="grid grid-flow-row gap-8 grid-cols-1 lg:grid-cols-2">
          <FinanceBarChart data={barChartData} />
          <FinancePieChart data={categoryData} />
        </div>
      </div>
    </div>
  )
}

export default Home
