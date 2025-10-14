'use client'

import useTransactionSWR from '@/hooks/useTransactionSWR'

type Props = {
  transactionId: string
}

const Detail = ({ transactionId }: Props) => {
  const { data: transactionDatas } = useTransactionSWR()

  const transaction = transactionDatas.find((data) => data.id === transactionId)
  return (
    <div className="rounded-md shadow-xl  w-120">
      <div className="grid grid-cols-3  p-4  ">
        <div>
          <div className="justify-self-center font-semibold">取引ID</div>
          <div className="justify-self-center border-2 rounded-md px-4">
            {transaction?.id}
          </div>
        </div>
        <div>
          <div className="justify-self-center font-semibold">カテゴリー</div>
          <div
            className="border-2 rounded-md px-4 justify-self-center"
            style={{ color: transaction?.category.color }}
          >
            {transaction?.category.name}
          </div>
        </div>
        <div>
          <div className="justify-self-center font-semibold">申請許可</div>
          <div className="justify-self-center">
            {transaction?.status ? (
              <div className="bg-orange-200 text-orange-800 px-1">許可</div>
            ) : (
              <div className="bg-gray-200 text-gray-800 px-1 ">却下</div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 p-4">
        <div>
          <div className="justify-self-center font-semibold">申請者</div>
          <div className="border-2 rounded-md px-4 justify-self-center">
            {transaction?.createdUser}
          </div>
        </div>
        <div>
          <div className="justify-self-center font-semibold">編集者</div>
          <div className="border-2 rounded-md px-4 justify-self-center">
            {transaction?.updatedUser === ' '
              ? 'なし'
              : transaction?.updatedUser}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div>
          <div className="justify-self-center font-semibold">金額</div>
          <div className="border-2 rounded-md px-4 justify-self-center">
            {transaction?.amount}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-self-center p-4 gap-3">
          <div className="font-semibold">取引理由</div>
          <input
            value={transaction?.description}
            disabled
            className="border rounded-md px-1 cursor-not-allowed"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-self-center p-4 gap-3">
          <div className="font-semibold">却下理由</div>
          <textarea
            value={transaction?.memo}
            disabled
            className="px-1 border rounded-md cursor-not-allowed"
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default Detail
