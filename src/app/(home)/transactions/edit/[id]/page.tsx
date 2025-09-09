import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getTransaction } from '@/features/transactions/actions/transactionAction'
import TransactionEdit from '@/features/transactions/components/transactionEdit'

const TransactionEditPage = async ({
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

  return <TransactionEdit date={initialRes.data} />
}

export default TransactionEditPage
