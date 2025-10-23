import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getTransaction } from '@/features/transactions/actions/transactionAction'
import TransactionEditTable from '@/features/transactions/components/TransactionEditTable'

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

  return (
    <>
      <TransactionEditTable transactionId={id} />
    </>
  )
}

export default TransactionEditPage
