import CategoryCard from '@/features/category/components/CategoryCard'
import type { Category } from '@/types'

type Props = {
  name: string
  categories: Category[]
}

export default function CategoriesList({ name, categories }: Props) {
  return (
    <>
      <div className="flex flex-col space-y-3 w-full h-full max-h-full">
        <div className="text-gray-500 font-semibold text-lg">{name}</div>
        <div className="flex flex-col space-y-2 justify-center items-start overflow-y-auto">
          {categories && categories.length > 0 ? (
            categories.map((val) => <CategoryCard data={val} key={val.id} />)
          ) : (
            <div>データが存在しません</div>
          )}
        </div>
      </div>
    </>
  )
}
