'use client'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { getAllCategory } from '@/features/category/actions/categoryAction'
import CategoriesList from '@/features/category/components/CategoriesList'
import ModalForm from '@/features/category/components/ModalForm'
import FilterBox from '@/features/components/FilterBox'
import SearchBox from '@/features/components/SearchBox'
import useCategorySWR from '@/hooks/useCategorySWR'
import type { CategoryRes } from '@/types'
import { useState } from 'react'

type Props = {
  initialData: CategoryRes
}

const fetcher = async () => {
  return await getAllCategory()
}

export default function CategoryTable({ initialData }: Props) {
  const [keyword, setKeyword] = useState<string>('')
  const [filter, setFilter] = useState<string>('')

  const {
    data = { income: [], expense: [] },
    error,
    isLoading,
  } = useCategorySWR({
    initialData,
  })

  return (
    <>
      <div className="w-full container-fluid px-8 py-8 flex flex-col space-y-5">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-bold text-gray-700">カテゴリー管理</div>
          <div>
            <ModalForm />
          </div>
        </div>

        <div className="flex flex-row items-center justify-end gap-5">
          <FilterBox
            placeholder="フィルター"
            values={['食費', '学費', '治療費']}
            setFilter={setFilter}
          />

          <SearchBox setState={setKeyword} placeholder="カテゴリーを検索" />
        </div>

        {isLoading ? (
          <div className="w-full h-full flex flex-col justify-center items-center gap-4 pt-20">
            <Spinner size={64} />
            <div className="text-gray-500 text-lg font-medium">
              読み込み中...
            </div>
          </div>
        ) : (
          <div className="grid lg:gap-12 gap-5 lg:grid-cols-2 grid-cols-1">
            <CategoriesList name="支出カテゴリ" categories={data.expense} />
            <CategoriesList name="収入カテゴリ" categories={data.income} />
          </div>
        )}
      </div>
    </>
  )
}
