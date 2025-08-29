'use client'
import { Button } from '@/components/ui/button'
import CategoriesList from '@/features/category/components/CategoriesList'
import FilterBox from '@/features/components/FilterBox'
import SearchBox from '@/features/components/SearchBox'
import { useState } from 'react'

const CategoryPage = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [filter, setFilter] = useState<string>('')

  return (
    <>
      <div className="container-fluid px-8 py-8 flex flex-col space-y-5">
        <div className="flex flex-row items-center justify-between">
          <div className="text-3xl font-bold text-gray-700">カテゴリー管理</div>
          <div>
            <Button variant="outline" size="lg">
              + カテゴリーの追加
            </Button>
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

        <div className="grid lg:gap-12 gap-5 lg:grid-cols-2 grid-cols-1">
          <CategoriesList name="支出カテゴリ" />
          <CategoriesList name="収入カテゴリ" />
        </div>
      </div>
    </>
  )
}

export default CategoryPage
