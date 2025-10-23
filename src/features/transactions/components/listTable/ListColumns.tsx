import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import TransactionDeleteButton from '@/features/transactions/components/TransactionDeleteButton'
import type { TransactionData } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

export const listColumns: ColumnDef<TransactionData>[] = [
  {
    id: 'checkBox',
    meta: { label: 'CheckBox' },
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    meta: { label: '日付' },
    id: 'date',
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
      <div className="lowercase pl-3">{row.original?.date || '不明'}</div>
    ),
  },
  {
    accessorKey: 'createdUser',
    meta: { label: '申請者' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <div className="capitalize">
        <div>{row.original?.createdUser ?? '不明'}</div>
      </div>
    ),
  },
  {
    accessorKey: 'title',
    meta: { label: '取引内容' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original?.title || '不明'}</div>
    ),
  },
  {
    accessorKey: 'description',
    meta: { label: '取引理由' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original?.description || '不明'}</div>
    ),
  },
  {
    id: 'category',
    meta: { label: 'カテゴリ' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => {
      return (
        <div
          className="capitalize"
          style={{ color: row.original.category?.color }}
        >
          {row.original.category?.name || '不明'}
        </div>
      )
    },
  },
  {
    id: 'type',
    meta: { label: '収支' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => {
      const value = row.original.category?.type
      if (value === 'income') {
        return <div className="text-green-500">収入</div>
      } else if (value === 'expense') {
        return <div className="text-gray-500">支出</div>
      }

      return <div className="text-gray-400">不明</div>
    },
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
      const amount = parseFloat(row.original?.amount.toString() || '不明')

      const formatted = new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
      }).format(amount)

      if (row.original.category?.type === 'income') {
        return (
          <div className="text-green-500 font-medium">{`+${formatted}`}</div>
        )
      } else if (row.original.category?.type === 'expense') {
        return (
          <div className="text-gray-600 font-medium">{`-${formatted}`}</div>
        )
      }

      return <div className="capitalize">{formatted}</div>
    },
  },
  {
    accessorKey: 'status',
    meta: { label: '申請許可' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-start">
          <span
            className={`
            px-2 py-1 rounded-xs text-xs font-semibold 
            ${row.original.status ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}
          `}
          >
            {row.original.status ? '許可' : '却下'}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: 'id',
    meta: { label: '詳細' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <>
        <Link
          href={`/transactions/edit/${row.getValue('id')}`}
          className="group"
        >
          <div className="flex flex-row items-center space-x-1 text-gray-500 hover:text-gray-900 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-auto"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000000"
                d="m18 12l.354-.354l.353.354l-.353.354zm-12 .5a.5.5 0 0 1 0-1zm8.354-4.854l4 4l-.708.708l-4-4zm4 4.708l-4 4l-.708-.708l4-4zM18 12.5H6v-1h12z"
              />
            </svg>
            <span className="text-gray-500 opacity-0 group-hover:opacity-100  transition-opacity duration-300">
              詳細
            </span>
          </div>
        </Link>
      </>
    ),
  },

  {
    accessorKey: 'deletable',
    meta: { label: '削除' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <TransactionDeleteButton
        id={row.getValue('id')}
        editable={row.original.editable}
      />
    ),
  },
]
