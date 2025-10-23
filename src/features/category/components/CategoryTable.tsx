'use client'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { getAllCategory } from '@/features/category/actions/categoryAction'
import CategoriesList from '@/features/category/components/CategoriesList'
import ModalForm from '@/features/category/components/ModalForm'
import FilterBox from '@/features/components/FilterBox'
import SearchBox from '@/features/components/SearchBox'
import useCategorySWR from '@/hooks/useCategorySWR'
import type { CategoryRes } from '@/types'
import { useEffect, useState } from 'react'

type Props = {
  initialData: CategoryRes
}

const fetcher = async () => {
  return await getAllCategory()
}

export default function CategoryTable() {
  const [keyword, setKeyword] = useState<string>('')
  const [filter, setFilter] = useState<string>('')

  const [selectedCategory, setSelectedCategory] = useState<CategoryRes>({
    income: [],
    expense: [],
  })
  const {
    data = { income: [], expense: [] },
    isLoading,
    isValidating,
  } = useCategorySWR()

  useEffect(() => {
    let filteredIncome = data.income
    let filteredExpense = data.expense

    if (keyword !== '') {
      filteredIncome = filteredIncome.filter((cat) =>
        cat.name.includes(keyword),
      )
      filteredExpense = filteredExpense.filter((cat) =>
        cat.name.includes(keyword),
      )
    }

    if (filter === '収入') {
      setSelectedCategory({ income: filteredIncome, expense: [] })
    } else if (filter === '支出') {
      setSelectedCategory({ income: [], expense: filteredExpense })
    } else {
      setSelectedCategory({ income: filteredIncome, expense: filteredExpense })
    }
  }, [keyword, filter, data])

  return (
    <>
      <div className="w-full container-fluid px-8 py-8 flex flex-col space-y-5">
        <div className="flex md:flex-row flex-col-reverse md:items-end md:justify-between items-end justify-end gap-4">
          <div className="flex flex-row items-center justify-center gap-4">
            <SearchBox setState={setKeyword} placeholder="カテゴリーを検索" />
            <FilterBox
              setFilter={setFilter}
              placeholder="フィルター"
              values={['収入', '支出']}
            />
          </div>
          <div>
            <ModalForm />
          </div>
        </div>

        {isLoading || isValidating ? (
          <div className="w-full h-full flex flex-col justify-center items-center gap-4 pt-20">
            <Spinner size={64} />
            <div className="text-gray-500 text-lg font-medium">
              読み込み中...
            </div>
          </div>
        ) : (
          <div className="grid lg:gap-12 gap-5 lg:grid-cols-2 grid-cols-1">
            <CategoriesList
              name="支出カテゴリ"
              categories={selectedCategory.expense}
            />
            <CategoriesList
              name="収入カテゴリ"
              categories={selectedCategory.income}
            />
          </div>
        )}
      </div>
    </>
  )
}
