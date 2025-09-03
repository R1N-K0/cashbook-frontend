import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getAllCategory } from '@/features/category/actions/categoryAction'
import CategoryTable from '@/features/category/components/CategoryTable'

const CategoryPage = async () => {
  const initialRes = await getAllCategory()
  if (!initialRes.success)
    if (!initialRes.success) {
      return (
        <div className="container-fluid h-full">
          <Alert variant="destructive">
            <AlertTitle>エラーが発生しました</AlertTitle>
            <AlertDescription>{initialRes.message}</AlertDescription>
          </Alert>
        </div>
      )
    }

  return (
    <>
      <CategoryTable initialData={initialRes.data} />
    </>
  )
}

export default CategoryPage
