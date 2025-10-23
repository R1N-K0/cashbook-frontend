'use client'

import { useHeaderTitle } from '@/hooks/useHeaderTitle'
import {
  useSidebarDispatch,
  useSidebarIsOpen,
} from '@/provider/SideBarProvider'

import { TiThMenu } from 'react-icons/ti'

export default function MainHeader() {
  const pageName = useHeaderTitle()
  const setIsOpen = useSidebarDispatch()
  const IsOpen = useSidebarIsOpen()

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 bg-white py-2 px-7 border-b-2 border-gray-100">
        <div className="w-full flex flex-row items-center justify-items-center">
          <div className="flex mr-auto gap-9">
            <TiThMenu
              onClick={() => setIsOpen(!IsOpen)}
              size={24}
              color="#364153"
            />

            <div className="text-xl font-extrabold text-gray-700">
              {pageName}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
