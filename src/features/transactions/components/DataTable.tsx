'use client'

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const data: Payment[] = [
  {
    id: '1a2b3c4d',
    date: '2023-09-28',
    user: '太郎',
    description: '買い物',
    category: '食費',
    memo: '週末の買い出し',
    amount: 20000,
  },
  {
    id: '2b3c4d5e',
    date: '2023-09-29',
    user: '花子',
    description: '外食',
    category: '食費',
    memo: '友人とランチ',
    amount: 1500,
  },
  {
    id: '3c4d5e6f',
    date: '2023-09-30',
    user: '次郎',
    description: '交通費',
    category: '交通',
    memo: '出張の交通費',
    amount: 5000,
  },
  {
    id: '4d5e6f7g',
    date: '2023-10-01',
    user: '四郎',
    description: '光熱費',
    category: '生活費',
    memo: '10月分の電気代',
    amount: 8000,
  },
  {
    id: '5e6f7g8h',
    date: '2023-10-02',
    user: '五郎',
    description: '通信費',
    category: '生活費',
    memo: '10月分の携帯電話代',
    amount: 3000,
  },
]

export type Payment = {
  id: string
  date: string
  user: string
  description: string
  category: string
  memo: string
  amount: number
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          日付
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
    header: 'ユーザー',
    cell: ({ row }) => <div className="capitalize">{row.getValue('user')}</div>,
  },
  {
    accessorKey: 'description',
    header: '説明',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'カテゴリ',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('category')}</div>
    ),
  },
  {
    accessorKey: 'memo',
    header: 'メモ',
    cell: ({ row }) => <div className="capitalize">{row.getValue('memo')}</div>,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0"
        >
          金額
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

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    id: 'edit',
    header: '編集',
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

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          表示: {table.getFilteredSelectedRowModel().rows.length} / 全
          {table.getFilteredRowModel().rows.length}件
        </div>
      </div>
    </div>
  )
}
