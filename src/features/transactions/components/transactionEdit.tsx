import { EditTable } from '@/features/transactions/components/editTable/EditTable'
import type { TransactionData } from '@/types'

type props = {
  date: TransactionData
}

const TransactionEdit = ({ date }: props) => {
  return (
    <div className="h-full w-full p-8">
      <EditTable data={date} />
    </div>
  )
}

export default TransactionEdit
