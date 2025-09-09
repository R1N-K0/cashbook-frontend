import type { ColumnDef } from '@tanstack/react-table'

export const editColumns: ColumnDef<{ label: string; value: string }>[] = [
  {
    accessorKey: 'label',
    header: '項目',
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: 'value',
    header: '値',
    cell: (info) => info.getValue() as string,
  },
]
