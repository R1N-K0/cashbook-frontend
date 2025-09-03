import { getAllTransaction } from '@/features/transactions/actions/transactionAction'
import TransactionTable from '@/features/transactions/components/TransactionTable'

const TransactionPage = async () => {
  const initialRes = await getAllTransaction()
  if (!initialRes.success) {
    return (
      <div className="container-fluid h-full">
        <span>{initialRes.message}</span>
      </div>
    )
  }

  return (
    <>
      <TransactionTable initialData={initialRes.data} />
    </>
  )
}

export default TransactionPage
