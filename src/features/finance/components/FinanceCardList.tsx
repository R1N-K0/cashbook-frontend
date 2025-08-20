import FinanceCard from '@/features/finance/components/FinanceCard'

export default function FinanceCardList() {
  return (
    <div className="grid grid-flow-row gap-8 text-neutral-600 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 py-3">
      <FinanceCard title="総残高" amount={1250000} color="bg-blue-100" />
      <FinanceCard title="今月の収入" amount={350000} color="bg-green-100" />
      <FinanceCard title="今月の支出" amount={210000} color="bg-orange-100" />
      <FinanceCard title="月間収支" amount={140000} color="bg-purple-100" />
    </div>
  )
}
