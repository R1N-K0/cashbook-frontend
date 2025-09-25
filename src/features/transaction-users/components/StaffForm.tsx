import { Button } from '@/components/ui/button'
import InputField from '@/features/components/fields/InputFiled'
import NumberField from '@/features/components/fields/NumberField'
import { createStaff } from '@/features/transaction-users/action/usersAction'
import type { StaffFormValues } from '@/features/transaction-users/components/lib/schema/staffSchema'
import { staffSchema } from '@/features/transaction-users/components/lib/schema/staffSchema'
import useUsersSWR from '@/hooks/useUsersSWR'

import { zodResolver } from '@hookform/resolvers/zod'

import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  closeDialog: () => void
}

export default function StaffForm({ closeDialog }: Props) {
  const methods = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      limitAmount: 0,
    },
  })
  const { mutate } = useUsersSWR()

  const onSubmit: SubmitHandler<StaffFormValues> = async (val) => {
    const res = await createStaff(val)

    if (!res.success) {
      toast.error(`status: ${res.status} message:${res.message}`)
      return
    }
    toast.success(res.message)
    mutate()
    closeDialog()
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto px-8 lg:container-fluid container lg:max-w-5xl"
      >
        <div className="grid grid-cols-2 gap-x-4 mt-4 items-start">
          <div>
            <InputField
              control={methods.control}
              name="lastName"
              label="苗字"
              placeholder="田中"
            />
          </div>

          <div>
            <InputField
              control={methods.control}
              name="firstName"
              label="名前"
              placeholder="太郎"
            />
          </div>
        </div>

        <NumberField
          control={methods.control}
          name="limitAmount"
          placeholder="上限金額を設定"
          label="上限金額"
        />

        <Button type="submit" className="w-full">
          スタッフ登録
        </Button>
      </form>
    </FormProvider>
  )
}
