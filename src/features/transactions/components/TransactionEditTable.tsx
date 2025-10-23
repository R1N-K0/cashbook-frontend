'use client'

import TransactionForm from '@/features/transactions/components/TransactionForm'
import Link from 'next/link'

type Props = {
  transactionId: string
}

const TransactionEditTable = ({ transactionId }: Props) => {
  return (
    <div className="container-fluid px-8 py-8">
      <div className="flex justify-between">
        <div className=" mx-auto px-8 lg:container-fluid container lg:max-w-5xl mb-8">
          <h1 className="text-2xl font-bold">取引の編集</h1>
          <div className="mt-2 text-sm text-gray-500 hover:underline hover:cursor-pointer hover:text-gray-700">
            <Link href="/transactions">← 取引一覧に戻る</Link>
          </div>
        </div>
      </div>

      <TransactionForm formPageType="edit" transactionId={transactionId} />
    </div>
  )
}

export default TransactionEditTable
