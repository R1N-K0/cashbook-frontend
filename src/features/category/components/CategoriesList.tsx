import CategoryCard from '@/features/category/components/CategoryCard'

type Props = {
  name: string
}

export default function CategoriesList(props: Props) {
  const { name } = props
  return (
    <>
      <div className="flex flex-col space-y-3 w-full h-full max-h-full">
        <div className="text-gray-500 font-semibold text-lg">{name}</div>
        <div className="flex flex-col space-y-2 justify-center items-start overflow-y-auto">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>
    </>
  )
}
