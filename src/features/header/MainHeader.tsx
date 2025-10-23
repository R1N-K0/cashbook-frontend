'use client'

import { useHeaderTitle } from '@/hooks/useHeaderTitle'
import {
  useSidebarDispatch,
  useSidebarIsOpen,
} from '@/provider/SideBarProvider'

export default function MainHeader() {
  const pageName = useHeaderTitle()
  const setIsOpen = useSidebarDispatch()
  const IsOpen = useSidebarIsOpen()

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 bg-white py-2 px-7 border-b-2 border-gray-100">
        <div className="w-full flex flex-row items-center justify-items-center">
          <div className="flex mr-auto gap-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setIsOpen(!IsOpen)}
              className="w-7 h-auto hover:cursor-pointer"
              viewBox="0 0 512 512"
            >
              <path
                fill="#000000"
                d="M80 96h352v32H80zm0 144h352v32H80zm0 144h352v32H80z"
              />
            </svg>

            <div className="text-xl font-extrabold text-gray-700">
              {pageName}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
