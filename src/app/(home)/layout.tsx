import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getAllCategory } from '@/features/category/actions/categoryAction'
import ConfigWrapper from '@/features/components/ConfigWrapper'
import MainHeader from '@/features/components/MainHeader'
import MainSidebar from '@/features/components/MainSideBar'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const initialRes = await getAllCategory()

  if (!initialRes.success)
    if (!initialRes.success) {
      return (
        <div className="grid grid-rows-[auto_1fr] h-full">
          <MainHeader />
          <div className="flex gird-cols-[auto_1fr] ">
            <MainSidebar />
            <Toaster richColors position="top-center" />
            <div className="container-fluid h-full">
              <Alert variant="destructive">
                <AlertTitle>エラーが発生しました</AlertTitle>
                <AlertDescription>{initialRes.message}</AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      )
    }

  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <MainHeader />
      <div className="flex gird-cols-[auto_1fr] ">
        <MainSidebar />
        <Toaster richColors position="top-center" />
        <ConfigWrapper initialData={initialRes.data}>
          <div className="w-full">{children}</div>
        </ConfigWrapper>
      </div>
    </div>
  )
}

export default HomeLayout
