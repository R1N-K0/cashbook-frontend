import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getFinanceData } from '@/features/finance/action/financeAction'
import FinanceBarChart from '@/features/finance/components/FinanceBarChart'
import FinanceCardList from '@/features/finance/components/FinanceCardList'
import FinancePieChart from '@/features/finance/components/FinancePieChart'
import type {
  BarChartData,
  FinanceReq,
  LineChartData,
  PieChartData,
} from '@/types'

const Home = async () => {
  const res = await getFinanceData()
  if (!res.success)
    if (!res.success) {
      return (
        <div className="container-fluid h-full">
          <Alert variant="destructive">
            <AlertTitle>エラーが発生しました</AlertTitle>
            <AlertDescription>{res.message}</AlertDescription>
          </Alert>
        </div>
      )
    }
  const data: FinanceReq = res.data
  const balance = data.balance
  const currentExpense = data.expense
  const currentIncome = data.income

  const barChartData: BarChartData[] = data.profitLossByMonth.map((val) => ({
    name: `${val.month.split('-')[1]}月`,
    value: val.profitLoss,
  }))

  const categoryData: PieChartData[] = data.expenseByCategory

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
