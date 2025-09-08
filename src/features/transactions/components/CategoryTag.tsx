import type { Category } from '@/types'

type props = {
  category: Category
}

export default function CategoryTag({ category }: props) {
  return (
    <>
      <div className="flex flex-row items-center justify-start space-x-3">
        <div>
          <div className="p-1 rounded-xl bg-gray-100">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke={category.color}
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
        </div>
        <div style={{ color: category.color }}>{category.name}</div>
      </div>
    </>
  )
}
