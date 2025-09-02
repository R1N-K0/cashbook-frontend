'use client'
import Calendar22 from '@/features/components/DateOfBirthPicker'
import FilterBox from '@/features/components/FilterBox'
import SearchBox from '@/features/components/SearchBox'
import { DataTableDemo } from '@/features/transactions/components/DataTable/DataTable'
import { useState } from 'react'

const TarnsactionPage = () => {
  const [keyword, setKeyWord] = useState<string>('')
  const [filte, setFilter] = useState<string>('')
  return (
    <div className="grid grid-rows-[auto_1fr] h-full p-8">
      <div>
        <div className="text-3xl font-bold text-gray-700">取引一覧</div>
        <div className="flex flex-row items-center gap-5 p-4">
          <Calendar22 />
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
        </div>
      </div>
      <DataTableDemo />
    </div>
  )
}

export default TarnsactionPage
