import MainHeader from '@/features/components/MainHeader'
import MainSidebar from '@/features/components/MainSideBar'
import type { ReactNode } from 'react'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <MainHeader />
      <div className="flex gird-cols-[auto_1fr] ">
        <MainSidebar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}

export default HomeLayout
