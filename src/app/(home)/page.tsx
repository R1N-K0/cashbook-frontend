import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { getFinanceData } from '@/features/finance/action/financeAction'
import FinanceBarChart from '@/features/finance/components/FinanceBarChart'
import FinanceCardList from '@/features/finance/components/FinanceCardList'
import FinanceLinearCard from '@/features/finance/components/FinanceLienarCard'
import FinancePieChart from '@/features/finance/components/FinancePieChart'
import type {
  BarChartData,
  FinanceReq,
  LineChartData,
  linerCardData,
  PieChartData,
  SimpleCardData,
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

  const cardData: SimpleCardData[] = [
    { name: '総残高', amount: data.balance },
    {
      name: '今月の収入',
      amount: data.income,
    },
    {
      name: '今月の支出',
      amount: data.expense,
    },
    { name: '月間収支', amount: data.profitLoss },
    { name: '取引件数', amount: data.count },
    { name: '却下', amount: data.cancelCount },
  ]

  const barChartData: BarChartData[] = data.profitLossByMonth.map((val) => ({
    name: `${parseInt(val.month.split('-')[1], 10)}月`,
    value: val.profitLoss,
  }))

  const cumulativeBalanceData: LineChartData[] = data.profitLossByMonth.map(
    (val) => ({
      name: `${parseInt(val.month.split('-')[1], 10)}月`,
      value: val.cumulativeBalance,
    }),
  )

  const categoryExpenseData: PieChartData[] = data.expenseByCategory
  const categoryIncomeData: PieChartData[] = data.incomeByCategory

  const lineChartData: LineChartData[] = [
    { name: 'Day 7', value: 5000 },
    { name: 'Day 8', value: 8100 },
    { name: 'Day 9', value: 19000 },
    { name: 'Day 10', value: 23000 },
    { name: 'Day 11', value: 5500 },
    { name: 'Day 12', value: 10400 },
  ]

  const balanceData: linerCardData = {
    name: '総残高',
    amount: data.balance,
    lineChartData,
  }
  return (
    <div className="container-fluid h-full">
      <div className="container-fluid px-10 mt-3">
        <FinanceCardList simpleCardData={cardData} />
        <div className="grid grid-flow-row gap-8 grid-cols-1 lg:grid-cols-2 ">
          <div className="flex flex-col space-y-2  w-full h-full">
            <FinanceLinearCard data={cumulativeBalanceData} />
            <FinanceBarChart data={barChartData} />
          </div>
          <div className="flex lg:flex-col md:flex-row flex-col  lg:space-y-2 md:space-x-2 space-y-2 w-full h-full">
            <FinancePieChart data={categoryExpenseData} />
            <FinancePieChart data={categoryIncomeData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
