import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getAllCategory } from '@/features/category/actions/categoryAction'
import { getAllTransaction } from '@/features/transactions/actions/transactionAction'
import TransactionTable from '@/features/transactions/components/TransactionTable'

const TransactionPage = async () => {
  const initialTransactionRes = await getAllTransaction()
  const initialCategoryRes = await getAllCategory()

  if (!initialTransactionRes.success) {
    return (
      <div className="container-fluid h-full">
        <Alert variant="destructive">
          <AlertTitle>エラーが発生しました</AlertTitle>
          <AlertDescription>{initialTransactionRes.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!initialCategoryRes.success) {
    return (
      <div className="container-fluid h-full">
        <Alert variant="destructive">
          <AlertTitle>エラーが発生しました</AlertTitle>
          <AlertDescription>{initialCategoryRes.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <>
      <TransactionTable
        initialTransactionData={initialTransactionRes.data}
        initialCategoryData={initialCategoryRes.data}
      />
    </>
  )
}

export default TransactionPage
