import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getAllCategory } from '@/features/category/actions/categoryAction'
import ConfigWrapper from '@/features/components/ConfigWrapper'
import MainHeader from '@/features/components/MainHeader'
import MainSidebar from '@/features/components/MainSideBar'
import { getTransactionUsers } from '@/features/transaction-users/transactionUserAction'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const CategoriesRes = await getAllCategory()
  const UsersRes = await getTransactionUsers()

  if (!CategoriesRes.success)
    if (!CategoriesRes.success) {
      return (
        <div className="grid grid-rows-[auto_1fr] h-full">
          <MainHeader />
          <div className="flex gird-cols-[auto_1fr] ">
            <MainSidebar />
            <Toaster richColors position="top-center" />
            <div className="container-fluid h-full">
              <Alert variant="destructive">
                <AlertTitle>エラーが発生しました</AlertTitle>
                <AlertDescription>{CategoriesRes.message}</AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      )
    }

  if (!UsersRes.success)
    if (!UsersRes.success) {
      return (
        <div className="grid grid-rows-[auto_1fr] h-full">
          <MainHeader />
          <div className="flex gird-cols-[auto_1fr] ">
            <MainSidebar />
            <Toaster richColors position="top-center" />
            <div className="container-fluid h-full">
              <Alert variant="destructive">
                <AlertTitle>エラーが発生しました</AlertTitle>
                <AlertDescription>{UsersRes.message}</AlertDescription>
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
        <ConfigWrapper
          initialCategoriesData={CategoriesRes.data}
          initialUsersData={UsersRes.data}
        >
          <div className="w-full">{children}</div>
        </ConfigWrapper>
      </div>
    </div>
  )
}

export default HomeLayout
