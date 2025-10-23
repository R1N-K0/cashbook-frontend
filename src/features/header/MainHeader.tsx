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
      <nav className="py-2 px-7 border-b-4">
        <div className="w-full flex flex-row items-center">
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
