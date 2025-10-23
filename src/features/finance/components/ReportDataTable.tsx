import FinanceCard from '@/features/finance/components/FinanceCard'
import FinancePieChart from '@/features/finance/components/FinancePieChart'
import UserReportsCard from '@/features/finance/components/UserReportsCard'
import { DataTable } from '@/features/transactions/components/listTable/ListTable'
import type { ReportRes } from '@/types'

type Props = {
  data: ReportRes
  year: number
  month: number
}

export default function ReportDataTable({ data, year, month }: Props) {
  return (
    <div className="w-full pt-5">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="w-full">
          <FinanceCard
            title="収支"
            amount={data.balance}
            change={data.balanceChange}
          />
        </div>
        <div className="w-full">
          <FinanceCard
            title="収入"
            amount={data.income}
            change={data.incomeChange}
          />
        </div>
        <div className="w-full">
          <FinanceCard
            title="支出"
            amount={data.expense}
            change={data.expenseChange}
          />
        </div>
        <div className="w-full">
          <FinanceCard
            title="取引件数"
            amount={data.count}
            change={data.countChange}
          />
        </div>

        <div className="w-full">
          <FinanceCard
            title="却下"
            amount={data.cancelCount}
            change={data.cancelCountChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <FinancePieChart
          data={data.incomeByCategory}
          title="カテゴリー別収入(月間)"
        />
        <FinancePieChart
          data={data.expenseByCategory}
          title="カテゴリー別支出(月間)"
        />
      </div>

      <div className="">
        <UserReportsCard
          incomeData={data.incomeByUser}
          expenseData={data.expenseByUser}
        />
      </div>
      <div className="-mt-2">
        <DataTable data={data.transactions} />
      </div>
    </div>
  )
}
