import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getTransaction } from '@/features/transactions/actions/transactionAction'
import TransactionDetail from '@/features/transactions/components/TransactionDetail'

const TransactionDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const initialRes = await getTransaction(id)

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

  return <TransactionDetail date={initialRes.data} />
}

export default TransactionDetailPage
