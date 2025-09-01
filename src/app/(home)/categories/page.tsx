import { getAllCategory } from '@/features/category/actions/categoryAction'
import CategoryTable from '@/features/category/components/CategoryTable'
import type { CategoryRes } from '@/types'

const CategoryPage = async () => {
  const initialCategories: CategoryRes[] = await getAllCategory()

  return (
    <>
      <CategoryTable />
    </>
  )
}

export default CategoryPage
