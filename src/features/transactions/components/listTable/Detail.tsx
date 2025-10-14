'use client'

import useTransactionSWR from '@/hooks/useTransactionSWR'

type Props = {
  transactionId: string
}

const Detail = ({ transactionId }: Props) => {
  const { data: transactionDatas } = useTransactionSWR()

  const transaction = transactionDatas.find((data) => data.id === transactionId)
  return (
    <div className="rounded-md shadow-xl p-8  font-semibold border-2">
      <div className="grid grid-cols-3  p-4 border-b-2 ">
        <div className="flex justify-self-center  gap-3 ">
          <div>取引ID</div>
          <div>{transaction?.id}</div>
        </div>
        <div className="flex justify-self-center  gap-3">
          <div>カテゴリー</div>
          <div style={{ color: transaction?.category.color }}>
            {transaction?.category.name}
          </div>
        </div>
        <div className="flex justify-self-center gap-3">
          <div>申請許可</div>
          <div>
            {transaction?.status ? (
              <div className="bg-orange-200 text-orange-800 px-1">許可</div>
            ) : (
              <div className="bg-gray-200 text-gray-800 px-1 ">却下</div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 p-4 border-b-2">
        <div className="flex justify-self-center gap-3">
          <div>申請者</div>
          <div>{transaction?.createdUser}</div>
        </div>
        <div className="flex justify-self-center gap-3">
          <div>編集者</div>
          <div>{transaction?.updatedUser}</div>
        </div>
      </div>
      <div className=" p-4 border-b-2">
        <div className="flex justify-self-center gap-3">
          <div>金額</div>
          <div>{transaction?.amount}</div>
        </div>
      </div>

      <div className="border-b-2">
        <div className="flex justify-self-center p-4 gap-3">
          <div>取引理由</div>
          <input
            value={transaction?.description}
            disabled
            className="border rounded-md px-1 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="border-b-2">
        <div className="flex justify-self-center p-4 gap-3">
          <div>却下理由</div>
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
