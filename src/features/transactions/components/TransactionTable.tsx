'use client'

import Calendar22 from '@/features/components/DateOfBirthPicker'
import FilterBox from '@/features/components/FilterBox'
import SearchBox from '@/features/components/SearchBox'
import { DataTable } from '@/features/transactions/components/DataTable/DataTable'
import {
  categoryFilter,
  dateFilter,
} from '@/features/transactions/components/utils/filteies'
import useTransactionSWR from '@/hooks/useTransactionSWR'
import type { TransactionData } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'

type Props = {
  initialData: TransactionData[]
}

export default function TransactionTable({ initialData }: Props) {
  const [keyword, setKeyWord] = useState<string>('')
  const [filte, setFilter] = useState<string>('')
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>(undefined)
  const { data, isLoading, error } = useTransactionSWR({ initialData })
  const [datas, setDatas] = useState<TransactionData[]>(data)

  useEffect(() => {
    let result = dateFilter(rangeDate, data)
    result = categoryFilter({ filte, data: result })

    setDatas(result)
  }, [rangeDate, filte, data])

  return (
    <div className="grid grid-rows-[auto_1fr] h-full p-8">
      <div>
        <div className="text-3xl font-bold text-gray-700">取引一覧</div>
        <div className="flex flex-row items-center gap-5 p-4">
          <Calendar22 rangeDate={rangeDate} setRangeDate={setRangeDate} />
          <FilterBox
            placeholder="カテゴリー"
            values={['収入', '支出']}
            setFilter={setFilter}
          />
          <FilterBox
            placeholder="フィルター"
            values={['食費', '学費', '治療費']}
            setFilter={setFilter}
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
