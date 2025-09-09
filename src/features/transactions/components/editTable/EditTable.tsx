'use client'

import { editColumns } from '@/features/transactions/components/editTable/EditColumns'
import { toKVRows } from '@/features/transactions/components/utils/toKvRow'
import type { TransactionData } from '@/types'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type props = {
  data: TransactionData
}

export const EditTable = ({ data }: props) => {
  const KVData = toKVRows(data)

  const table = useReactTable({
    data: KVData,
    columns: editColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="w-full border rounded-lg overflow-hidden shadow-lg">
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b border-gray-200">
            {row.getVisibleCells().map((cell, i) => (
              <td
                key={cell.id}
                className={`p-3 ${i === 0 ? 'bg-gray-50 font-semibold w-32' : ''} border-r border-gray-200`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
