'use client'

import Loading from '@/features/components/Loading'
import { getFinanceReportData } from '@/features/finance/action/financeAction'
import MonthYearPicker from '@/features/finance/components/MonthYearPicker'
import ReportDataTable from '@/features/finance/components/ReportDataTable'
import useReportSWR from '@/hooks/useReportSWR'
import type { ReportRes } from '@/types'
import { useState } from 'react'

const fetcher = async (year: number, month: number) => {
  return await getFinanceReportData(year, month)
}

export default function ReportBox() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const { data, error, isLoading, isValidating } = useReportSWR({
    year,
    month,
  })

  const handleMonthChange = (y: number, m: number) => {
    setYear(y)
    setMonth(m)
  }

  return (
    <div className="w-full pt-3">
      <div className="flex flex-row items-center justify-start space-x-2">
        <MonthYearPicker
          year={year}
          month={month}
          onChange={(y, m) => {
            setYear(y)
            setMonth(m)
          }}
        />
      </div>
      {error && <div>Failed to load</div>}
      {isValidating ? (
        <Loading />
      ) : (
        <ReportDataTable
          data={data ?? ({} as ReportRes)}
          year={year}
          month={month}
        />
      )}
    </div>
  )
}
