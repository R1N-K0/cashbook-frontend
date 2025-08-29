import CategoryCard from '@/features/category/components/CategoryCard'

type Props = {
  name: string
}

export default function CategoriesList(props: Props) {
  const { name } = props
  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="text-gray-500 font-semibold text-lg">{name}</div>
        <div className="flex flex-col space-y-2 justify-center items-start">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>
    </>
  )
}
