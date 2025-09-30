'use client'

import { DataTable } from '@/features/transaction-users/components/DataTable/DataTable'
import { columns } from '@/features/transaction-users/components/DataTable/columns'
import useUsersSWR from '@/hooks/useUsersSWR'

export default function StaffTable() {
  const staff = useUsersSWR()
  return <DataTable data={staff.data} columns={columns} />
}
