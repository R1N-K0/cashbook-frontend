import CategoryDeleteButton from '@/features/category/components/CategoryDeleteButton'
import type { Category } from '@/types'

type Props = {
  data: Category
}

export default function CategoryCard({ data }: Props) {
  return (
    <div className="flex flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-4 mb-3  w-full">
      <div className="flex flex-row items-center space-x-4">
        <div
          style={{ color: data.color }}
          className="p-3 rounded-xl bg-blue-50"
        >
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            >
              <path d="M31 34L43 34" />
              <path d="M38 39L43 34L38.0004 29" />
              <path d="M43 26V10C43 8.34315 41.6569 7 40 7H8C6.34315 7 5 8.34315 5 10V38C5 39.6569 6.34315 41 8 41H28.4706" />
              <path d="M15 15L20 21L25 15" />
              <path d="M14 27H26" />
              <path d="M14 21H26" />
              <path d="M20 21V33" />
            </g>
          </svg>
        </div>

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">
            {data.name}
          </span>
          <span className="text-sm text-gray-500">{data.count}件の取引</span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-end space-x-0">
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <svg
            className="w-7 h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1025 1023"
          >
            <path
              fill="currentColor"
              d="M896.428 1023h-768q-53 0-90.5-37.5T.428 895V127q0-53 37.5-90t90.5-37h576l-128 127h-384q-27 0-45.5 19t-18.5 45v640q0 27 19 45.5t45 18.5h640q27 0 45.5-18.5t18.5-45.5V447l128-128v576q0 53-37.5 90.5t-90.5 37.5zm-576-464l144 144l-208 64zm208 96l-160-159l479-480q17-16 40.5-16t40.5 16l79 80q16 16 16.5 39.5t-16.5 40.5z"
            />
          </svg>
        </button>

        <CategoryDeleteButton id={data.id} />
      </div>
    </div>
  )
}
