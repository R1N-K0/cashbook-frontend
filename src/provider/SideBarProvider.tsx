'use client'

import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

type Props = {
  children: ReactNode
}

const SidebarIsOpenContext = createContext<boolean>(false)
const SidebarDispatchContext = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {},
)

const SidebarProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <SidebarIsOpenContext.Provider value={isOpen}>
      <SidebarDispatchContext.Provider value={setIsOpen}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarIsOpenContext.Provider>
  )
}

const useSidebarIsOpen = () => useContext(SidebarIsOpenContext)
const useSidebarDispatch = () => useContext(SidebarDispatchContext)

export { SidebarProvider, useSidebarDispatch, useSidebarIsOpen }
