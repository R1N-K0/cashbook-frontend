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
    <nav className="fixed inset-x-0 top-0 z-50 bg-white py-6 px-10 border-b-4">
      <div className="w-full flex flex-row items-center">
        <div className="flex mr-auto gap-15">
          <TiThMenu
            onClick={() => setIsOpen(!IsOpen)}
            size={40}
            color="#364153"
          />

          <div className="text-3xl font-extrabold text-gray-700">{pageName}</div>
        </div>

        <div className="flex ml-auto gap-10">
          <div className="text-gray-700">
            <svg
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M419.7 340.3V169.6C419.7 75.4 343.3-1 249-1S78.3 75.4 78.3 169.7v170.7c0 42.7-42.7 85.3-42.7 85.3h426.7s-42.6-42.7-42.6-85.4zM249 511c35.4 0 64-19.1 64-42.7H185c0 23.6 28.6 42.7 64 42.7z"
              />
            </svg>
          </div>
          <div className="text-gray-700">
            <svg
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeLinecap="round">
                <circle cx="12" cy="8" r="5" fill="currentColor" />
                <path d="M20 21a8 8 0 1 0-16 0" />
                <path
                  fill="currentColor"
                  d="M12 13a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  )
}
