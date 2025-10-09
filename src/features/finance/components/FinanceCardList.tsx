import FinanceCard from '@/features/finance/components/FinanceCard'
import type { SimpleCardData } from '@/types'

type Props = {
  simpleCardData: SimpleCardData[]
}

export default function FinanceCardList(props: Props) {
  const { simpleCardData } = props

  return (
    <div className="grid grid-flow-row gap-3 md:gap-3 text-neutral-600 grid-cols-2 md:grid-cols-6 py-3 ">
      {simpleCardData.map((val, i) => (
        <FinanceCard title={val.name} amount={val.amount} key={i} unit="円" />
      ))}
    </div>
  )
}
