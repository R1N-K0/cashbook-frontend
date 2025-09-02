import { getAllTransaction } from '@/features/transactions/actions/transactionAction'
import TransactionTable from '@/features/transactions/components/TransactionTable'

const TransactionPage = async () => {
  const initialData = await getAllTransaction()

  return (
    <>
      <TransactionTable initialData={initialData} />
    </>
  )
}

export default TransactionPage
