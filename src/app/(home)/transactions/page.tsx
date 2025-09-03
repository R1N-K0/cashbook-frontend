import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getAllTransaction } from '@/features/transactions/actions/transactionAction'
import TransactionTable from '@/features/transactions/components/TransactionTable'

const TransactionPage = async () => {
  const initialRes = await getAllTransaction()
  if (!initialRes.success) {
    return (
      <div className="container-fluid h-full">
        <Alert variant="destructive">
          <AlertTitle>エラーが発生しました</AlertTitle>
          <AlertDescription>{initialRes.message}</AlertDescription>
        </Alert>
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
