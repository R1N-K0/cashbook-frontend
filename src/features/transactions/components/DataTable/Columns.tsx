import { Button } from '@/components/ui/button'
import type { transactionData } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export const columns: ColumnDef<transactionData>[] = [
  {
    accessorKey: 'date',
    meta: { label: '日付' },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {column.columnDef.meta?.label}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase pl-3">{row.getValue('date')}</div>
    ),
  },
  {
    accessorKey: 'user',
    meta: { label: 'ユーザー' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('user')}</div>,
  },
  {
    accessorKey: 'description',
    meta: { label: '説明' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'type',
    meta: { label: 'カテゴリ' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue('type') === 'income' ? (
          <div className="text-green-500">収入</div>
        ) : (
          <div className="text-blue-500">支出</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'memo',
    meta: { label: 'メモ' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('memo')}</div>,
  },
  {
    accessorKey: 'amount',
    meta: { label: '金額' },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0"
        >
          {column.columnDef.meta?.label}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
      }).format(amount)

      return (
        <div className="font-medium">
          {row.getValue('type') === 'income' ? (
            <div className="text-green-500">{`+${formatted}`}</div>
          ) : (
            <div className="text-blue-500">{`-${formatted}`}</div>
          )}
        </div>
      )
    },
  },
  {
    id: 'edit',
    meta: { label: '編集' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-blue-500">
          <svg
            className="w-7 h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1025 1023"
          >
            <path
              fill="currentColor"
              d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z"
            />
          </svg>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-red-500">
          <svg
            className="w-7 h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M5.442 3.5H12.5A1.5 1.5 0 0 1 14 5v6a1.5 1.5 0 0 1-1.5 1.5H5.442a1.5 1.5 0 0 1-1.171-.563L1.796 8.844a1.35 1.35 0 0 1 0-1.688l2.475-3.093A1.5 1.5 0 0 1 5.44 3.5Zm-2.343-.374A3 3 0 0 1 5.442 2H12.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.442a3 3 0 0 1-2.343-1.126L.625 9.781a2.85 2.85 0 0 1 0-3.562zM7.28 5.47a.75.75 0 0 0-1.06 1.06L7.69 8L6.22 9.47a.75.75 0 1 0 1.06 1.06l1.47-1.47l1.47 1.47a.75.75 0 1 0 1.06-1.06L9.81 8l1.47-1.47a.75.75 0 0 0-1.06-1.06L8.75 6.94z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </>
    ),
  },
]
