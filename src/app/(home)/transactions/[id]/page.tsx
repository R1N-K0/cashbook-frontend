import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getTransaction } from '@/features/transactions/actions/transactionAction'

const TransactionDetailPage = async ({
  params,
}: {
  params: { id: string }
}) => {
  //修正したい
  const { id } = (await params) as { id: string }
  console.log('params', params, id)

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

  console.log('取引詳細', initialRes)

  return <div>取引詳細</div>
}

export default TransactionDetailPage
