'use client'

import { getFinanceReportData } from '@/features/finance/action/financeAction'
import MonthYearPicker from '@/features/finance/components/MonthYearPicker'
import { useState } from 'react'
import useSWR from 'swr'

const fetcher = async (year: number, month: number) => {
  return await getFinanceReportData(year, month)
}

export default function ReportBox() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)

  const { data, error, mutate } = useSWR([year, month], () =>
    fetcher(year, month),
  )

  const handleMonthChange = (y: number, m: number) => {
    setYear(y)
    setMonth(m)
  }

  return (
    <div>
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
      {!data && !error && <div>Loading...</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
