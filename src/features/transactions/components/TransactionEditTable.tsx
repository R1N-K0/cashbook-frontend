'use client'

import TransactionForm from '@/features/transactions/components/TransactionForm'
import Link from 'next/link'

type Props = {
  transactionId: string
}

const TransactionEditTable = ({ transactionId }: Props) => {
  return (
    <div className="container-fluid px-8 pt-8">
      <div className="flex justify-between">
        <div className=" mx-auto px-8 lg:container-fluid container lg:max-w-5xl">
          <h1 className="text-2xl font-bold">詳細データ</h1>
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
