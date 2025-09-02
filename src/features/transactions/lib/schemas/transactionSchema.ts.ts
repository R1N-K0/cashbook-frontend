import z from 'zod'

export const transactionSchema = z.object({
  categoryId: z.number({ message: 'カテゴリーを選択してください' }).min(0),
  date: z.date({ message: '取引日を指定してください' }),
  description: z
    .string({ message: '取引内容を入力してください' })
    .max(255)
    .nonempty(),
  memo: z.string().nullable(),
  amount: z
    .number({ message: '金額を指定してください' })
    .min(1, { message: '金額を指定してください' }),
  createdUser: z
    .string({ message: '担当者を入力してください' })
    .nonempty({ message: '担当者を入力してください' })
    .max(255),
})

export type TransactionFormValue = z.infer<typeof transactionSchema>
