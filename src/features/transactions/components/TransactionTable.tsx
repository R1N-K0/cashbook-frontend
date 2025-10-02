'use client'

import Calendar22 from '@/features/components/DateOfBirthPicker'
import FilterBox from '@/features/components/FilterBox'
import SearchBox from '@/features/components/SearchBox'
import { DataTable } from '@/features/transactions/components/listTable/ListTable'
import {
  categoryFilter,
  dateFilter,
  incomeExpenseFilter,
} from '@/features/transactions/components/utils/filteies'
import useCategorySWR from '@/hooks/useCategorySWR'
import useTransactionSWR from '@/hooks/useTransactionSWR'
import type { TransactionData } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'

const TransactionTable = () => {
  const [keyword, setKeyWord] = useState<string>('')
  const [incomeExpenseFilte, setIncomeExpenseFilte] = useState<string>('')
  const [categoryFilte, setCategoryFilter] = useState<string>('')
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>(undefined)
  const {
    data: transactionData,
    isLoading: transactionIsLoading,
    error: transactionError,
  } = useTransactionSWR()
  const [datas, setDatas] = useState<TransactionData[]>(transactionData)
  const {
    data: categoryData,
    isLoading: categoryIsLoading,
    error: categoryError,
  } = useCategorySWR()

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

    setDatas(result)
  }, [rangeDate, incomeExpenseFilte, transactionData, categoryFilte])

  return (
    <div className="grid grid-rows-[auto_1fr] h-full p-8">
      <div>
        <div className="text-3xl font-bold text-gray-700">取引一覧</div>
        <div className="flex flex-row items-center gap-5 p-4">
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
          <SearchBox setState={setKeyWord} placeholder="検索" />
          <Link href="/transactions/create">
            <button className="bg-gray-900 text-white font-bold rounded-md text-sm px-5 py-2 hover:bg-gray-700 focus:outline-none focus:ring-4">
              + 新規取引作成
            </button>
          </Link>
        </div>
      </div>
      <DataTable data={datas} />
    </div>
  )
}

export default TransactionTable
