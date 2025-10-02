import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getTransaction } from '@/features/transactions/actions/transactionAction'
import TransactionForm from '@/features/transactions/components/TransactionForm'
import Link from 'next/link'

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

  return (
    <>
      <div className="container-fluid px-8 py-8">
        <div className=" mx-auto px-8 lg:container-fluid container lg:max-w-5xl mb-8">
          <h1 className="text-2xl font-bold">取引の詳細</h1>
          <div className="mt-2 text-sm text-gray-500 hover:underline hover:cursor-pointer hover:text-gray-700">
            <Link href="/transactions">← 取引一覧に戻る</Link>
          </div>
        </div>
        <TransactionForm formPageType="detail" transactionId={id} />
      </div>
    </>
  )
}

export default TransactionDetailPage
