'use client'

import type { TransactionUsers } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const columns: ColumnDef<TransactionUsers>[] = [
  {
    accessorKey: 'id',
    meta: { label: 'ID' },
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
    cell: ({ row }) => {
      return <div className="pl-3">{'# ' + (row.original?.id || '不明')}</div>
    },
  },

  {
    accessorKey: 'name',
    meta: { label: '名前' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => (
      <div className="capitalize ">
        {row.original?.lastName + ' ' + row.original?.firstName || '不明'}
      </div>
    ),
  },

  {
    accessorKey: 'limitAmount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          利用上限
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const limit = row.original?.limitAmount || 0
      return <div className="pl-3">{limit.toLocaleString()}</div>
    },
  },

  {
    accessorKey: 'remainingAmount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          今月の残高
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const remaining = row.original?.remainingAmount || 0
      return (
        <div className={Number(remaining) === 0 ? 'text-red-500 pl-3' : 'pl-3'}>
          {remaining.toLocaleString()}
        </div>
      )
    },
  },

  {
    accessorKey: 'status',
    meta: { label: 'ステータス' },
    header: ({ column }) => {
      return <>{column.columnDef.meta?.label}</>
    },
    cell: ({ row }) => {
      const remaining = Number(row.original?.remainingAmount) || 0
      const isLimit = remaining <= 0

      return (
        <div className="flex justify-start">
          <span
            className={`
            px-2 py-1 rounded-xs text-xs font-semibold
            ${isLimit ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}
          `}
          >
            {isLimit ? '上限到達' : '利用可能'}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'created_at',
    meta: { label: '作成日' },
    id: 'created_at',
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
    cell: ({ row }) => {
      const dateString = row.original?.created_at || ''
      const date = new Date(dateString)
      const formatted = date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      const formattedWithSlashes = formatted.replace(/\//g, '-')
      return <div className="lowercase pl-3">{formattedWithSlashes}</div>
    },
  },
]
