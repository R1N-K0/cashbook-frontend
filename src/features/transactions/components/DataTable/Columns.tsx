import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { TransactionData } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<TransactionData>[] = [
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
    meta: { label: '作成者' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original?.createdUser || '不明'}</div>
    ),
  },
  {
    accessorKey: 'description',
    meta: { label: '説明' },
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
        return <div className="text-blue-500">支出</div>
      }

      return <div className="text-gray-400">不明</div>
    },
  },
  {
    accessorKey: 'memo',
    meta: { label: 'メモ' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original?.memo || '_'}</div>
    ),
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
          <div className="text-blue-500 font-medium">{`-${formatted}`}</div>
        )
      }

      return <div className="capitalize">不明</div>
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
        <Link href={`/transactions/${row.getValue('id')}`}>
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
        <button
          className={clsx(
            'rounded-lg',
            'hover:bg-gray-100',
            row.getValue('editable') ? 'text-blue-500' : 'text-gray-500',
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
      <button className=" rounded-lg hover:bg-gray-100 text-red-500">
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
    ),
  },
]
