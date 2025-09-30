'use client'

import { FormError } from '@/features/components/fields/FormError'
import { editColumns } from '@/features/transactions/components/editTable/EditColumns'
import { updateTransactionSchema } from '@/features/transactions/lib/schemas/transactionSchema.ts'
import type { TransactionData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type props = {
  data: TransactionData
}

export const EditTable = ({ data }: props) => {
  const [editValue, setEditValue] = useState()

  const method = useForm({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      description: data.description,
      amount: data.amount,
      categoryId: Number(data.category.id),
      memo: data.memo ?? '',
      createdUser: data.createdUser,
      date: new Date(data.date),
    },
  })

  const table = useReactTable({
    data,
    columns: editColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  console.log('render')

  return (
    <FormProvider {...method}>
      <form>
        <FormError />
        <table className="w-full border rounded-lg overflow-hidden shadow-lg">
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200">
                {row.getVisibleCells().map((cell, i) => (
                  <td
                    key={cell.id}
                    className={`p-3 ${i === 0 ? 'bg-gray-50 font-semibold w-32' : ''} border-r border-gray-200`}
                  >
                    {i === 0 ? (
                      <>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </>
                    ) : (
                      <>test</>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </FormProvider>
  )
}
