'use client'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { getAllCategory } from '@/features/category/actions/categoryAction'
import CategoriesList from '@/features/category/components/CategoriesList'
import ModalForm from '@/features/category/components/ModalForm'
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

  const [selectedCategory, setSelectedCategory] = useState<CategoryRes>({
    income: [],
    expense: [],
  })
  const { data = { income: [], expense: [] }, isLoading } = useCategorySWR()

  useEffect(() => {
    const result = data
    if (keyword === '') {
      setSelectedCategory(result)
    } else {
      const filteredIncome = result.income.filter((cat) =>
        cat.name.includes(keyword),
      )
      const filteredExpense = result.expense.filter((cat) =>
        cat.name.includes(keyword),
      )
      setSelectedCategory({ income: filteredIncome, expense: filteredExpense })
    }
  }, [keyword, data])

  return (
    <>
      <div className="w-full container-fluid px-8 py-8 flex flex-col space-y-5">
        <div className="flex md:flex-row flex-col md:items-end md:justify-between items-end justify-end gap-4">
          <SearchBox setState={setKeyword} placeholder="カテゴリーを検索" />
          <div>
            <ModalForm />
          </div>
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
