import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CategoryForm from '@/features/category/components/CategoryForm'
import type { CategoryType } from '@/types'

import { FormProvider, useForm } from 'react-hook-form'

type CategoryFormValues = {
  name: string
  type: CategoryType
}

export default function ModalForm() {
  const methods = useForm<CategoryFormValues>()
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:cursor-pointer"
          >
            + 新規カテゴリー作成
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新規カテゴリーの作成</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <CategoryForm />
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}
