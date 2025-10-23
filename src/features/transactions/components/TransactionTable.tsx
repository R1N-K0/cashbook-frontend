'use client'

import ClosingButton from '@/features/closing/components/ClosingButton'
import Calendar22 from '@/features/components/DateOfBirthPicker'
import FilterBox from '@/features/components/FilterBox'
import Loading from '@/features/components/Loading'
import { DataTable } from '@/features/transactions/components/listTable/ListTable'
import {
  categoryFilter,
  dateFilter,
  incomeExpenseFilter,
  staffFilter,
} from '@/features/transactions/components/utils/filteies'
import useCategorySWR from '@/hooks/useCategorySWR'
import useTransactionSWR from '@/hooks/useTransactionSWR'
import useUsersSWR from '@/hooks/useUsersSWR'
import type { TransactionData } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'

const TransactionTable = () => {
  const [incomeExpenseFilte, setIncomeExpenseFilte] = useState<string>('')
  const [categoryFilte, setCategoryFilter] = useState<string>('')
  const [staffFilte, setStaffFilter] = useState<string>('')
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>(undefined)
  const {
    data: transactionData,
    isValidating: transactionIsValidating,
    error: transactionError,
  } = useTransactionSWR()
  const [datas, setDatas] = useState<TransactionData[]>(transactionData)
  const {
    data: categoryData,
    isValidating: categoryIsValidating,
    error: categoryError,
  } = useCategorySWR()

  const {
    data: staffData,
    isValidating: staffIsValidating,
    error: staffError,
  } = useUsersSWR()

  const categoryNames = [
    ...categoryData.expense.map((cat) => cat.name),
    ...categoryData.income.map((cat) => cat.name),
  ]

  useEffect(() => {
    let result = dateFilter(rangeDate, transactionData)
    result = incomeExpenseFilter({
      filte: incomeExpenseFilte,
      data: result,
    })
    result = categoryFilter({ filte: categoryFilte, data: result })
    result = staffFilter({ filte: staffFilte, data: result })

    setDatas(result)
  }, [
    rangeDate,
    incomeExpenseFilte,
    transactionData,
    categoryFilte,
    staffFilte,
  ])

  return (
    <div className="container mx-auto">
      {transactionIsValidating || categoryIsValidating || staffIsValidating ? (
        <Loading />
      ) : (
        <div className="grid grid-rows-[auto_1fr] h-full px-8 pt-6">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center justify-center gap-5 ">
                <Calendar22 rangeDate={rangeDate} setRangeDate={setRangeDate} />
                <FilterBox
                  placeholder="収支"
                  values={['収入', '支出']}
                  setFilter={setIncomeExpenseFilte}
                />
                <FilterBox
                  placeholder="カテゴリ"
                  values={categoryNames}
                  setFilter={setCategoryFilter}
                />

                <FilterBox
                  placeholder="申請者"
                  values={
                    staffData?.map(
                      (user) => user.lastName + ' ' + user.firstName,
                    ) || []
                  }
                  setFilter={setStaffFilter}
                />
              </div>
              <div className="flex flex-row items-center gap-3">
                <Link href="/transactions/create">
                  <button className="bg-gray-900 text-white font-bold rounded-md text-sm px-5 py-2 hover:bg-gray-700 focus:outline-none focus:ring-4">
                    + 取引作成
                  </button>
                </Link>

                <ClosingButton />
              </div>
            </div>
          </div>
          <DataTable data={datas} />
        </div>
      )}
    </div>
  )
}

export default TransactionTable
