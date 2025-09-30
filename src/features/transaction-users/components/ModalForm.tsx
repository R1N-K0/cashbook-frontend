import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import StaffForm from '@/features/transaction-users/components/StaffForm'
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
          <Button variant="outline">+ スタッフの追加</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>スタッフ登録</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <StaffForm closeDialog={() => setOpen(false)} />
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}
