import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import TransactionDeleteButton from '@/features/transactions/components/TransactionDeleteButton'
import type { TransactionData } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'
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
        {row.original.updatedUser !== ' ' ? (
          <div>{row.original?.updatedUser}</div>
        ) : (
          <div>{row.original?.createdUser ?? '不明'}</div>
        )}
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
            ${row.original.status ? 'bg-gray-200 text-gray-800' : 'bg-orange-200 text-orange-800'}
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
        <Link href={`/transactions/detail/${row.getValue('id')}`}>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-auto"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
              />
            </svg>
          </button>
        </Link>
      </>
    ),
  },

  {
    accessorKey: 'editable',
    meta: { label: '編集' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <>
        <Link href={`/transactions/edit/${row.getValue('id')}`}>
          <button
            className={clsx(
              'rounded-lg',
              'hover:bg-gray-100',
              row.getValue('editable')
                ? 'text-blue-500 hover:cursor-pointer'
                : 'text-gray-500 bg-gray-200 cursor-not-allowed',
            )}
          >
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
        editable={row.getValue('editable')}
      />
    ),
  },
]
