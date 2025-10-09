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
    <div className="w-full container pt-5">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <FinanceCard title="収入" amount={data.income} unit="円" />
        </div>
        <div>
          <FinanceCard title="支出" amount={data.expense} unit="円" />
        </div>
        <div>
          <FinanceCard title="収支" amount={data.balance} unit="円" />
        </div>
        <div>
          <FinanceCard title="取引件数" amount={data.count} unit="件" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <FinancePieChart data={data.incomeByCategory} />
        <FinancePieChart data={data.expenseByCategory} />
      </div>

      <div className="">
        <UserReportsCard
          incomeData={data.incomeByUser}
          expenseData={data.expenseByUser}
        />
      </div>

      <div>
        <DataTable data={data.transactions} />
      </div>
    </div>
  )
}
