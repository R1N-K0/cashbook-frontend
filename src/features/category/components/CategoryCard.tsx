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
        <button className="p-2 rounded-sm hover:bg-gray-100 text-gray-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-auto"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 21h16M5.666 13.187A2.278 2.278 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.278 2.278 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001l-9.507 9.52Z"
            />
          </svg>
        </button>

        <CategoryDeleteButton id={data.id} />
      </div>
    </div>
  )
}
