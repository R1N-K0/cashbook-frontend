import { getAllCategory } from '@/features/category/actions/categoryAction'
import CategoryTable from '@/features/category/components/CategoryTable'
import type { CategoryRes, FetchError } from '@/types'
import { redirect } from 'next/navigation'

const CategoryPage = async () => {
  try {
    const initialCategories: CategoryRes = await getAllCategory()

    return (
      <>
        <CategoryTable initialData={initialCategories} />
      </>
    )
  } catch (error) {
    const e = error as FetchError
    if (e.status === 401) {
      redirect('/auth')
    }
  }
}

export default CategoryPage
