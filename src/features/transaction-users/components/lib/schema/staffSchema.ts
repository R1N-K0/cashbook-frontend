import z from 'zod'

export const staffSchema = z.object({
  lastName: z.string().min(1, { message: '苗字を入力してください' }).max(50),

  firstName: z.string().min(1, { message: '名前を入力してください' }).max(50),

  limitAmount: z
    .number({ message: '数値を入力してください' })
    .min(0, { message: '有効な金額を入力してください' }),
})

export type StaffFormValues = z.infer<typeof staffSchema>
