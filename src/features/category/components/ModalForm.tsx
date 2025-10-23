import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import CategoryForm from '@/features/category/components/CategoryForm'
import type { CategoryType } from 'enums/category-type'
import { useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

type CategoryFormValues = {
  name: string
  type: CategoryType
}

export default function ModalForm() {
  const methods = useForm<CategoryFormValues>()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>+ カテゴリーの追加</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新規カテゴリーの作成</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <CategoryForm closeDialog={() => setOpen(false)} />
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}
