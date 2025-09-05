import type { TransactionData } from '@/types'

type props = {
  date: TransactionData
}

const TransactionDetail = ({ date }: props) => {
  return (
    <div className="w-full h-full p-5">
      <div className="text-3xl font-bold text-gray-700 py-5">取引詳細</div>
      <div className=" border-gray-200 border-4 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="w-32 bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700 border border-gray-300">
                日付
              </th>
              <td className="px-4 py-2 border border-gray-300">{date.date}</td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700 border border-gray-300">
                作成者
              </th>
              <td className="px-4 py-2 border border-gray-300">
                {date.createdUser}
              </td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700 border border-gray-300">
                説明
              </th>
              <td className="px-4 py-2 border border-gray-300">
                {date.description}
              </td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700 border border-gray-300">
                カテゴリ
              </th>
              <td className="px-4 py-2 border border-gray-300">
                {date.category?.type === 'income' ? <>収入</> : <>支出</>}
              </td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700 border border-gray-300">
                メモ
              </th>
              <td className="px-4 py-2 border border-gray-300">{date.memo}</td>
            </tr>
            <tr>
              <th className="bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700 border border-gray-300">
                金額
              </th>
              <td className="px-4 py-2 border border-gray-300">
                {date.amount.toLocaleString()}円
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default TransactionDetail
