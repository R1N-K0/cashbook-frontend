import z from 'zod'

export const transactionSchema = z.object({
  categoryId: z.number({ message: 'カテゴリーを選択してください' }).min(1),
  date: z.date({ message: '取引日を指定してください' }),
  description: z
    .string({ message: '取引内容を入力してください' })
    .max(255)
    .nonempty({ message: '取引内容を入力してください' }),
  memo: z.string().nullable(),
  amount: z
    .number({ message: '金額を指定してください' })
    .min(1, { message: '金額を指定してください' }),
  createdUserId: z
    .number({ message: '担当者を選択してください' })
    .min(1, { message: '担当者を選択してください' }),
})

export type TransactionFormValue = z.infer<typeof transactionSchema>

export const updateTransactionSchema = transactionSchema.extend({
  id: z.string({ message: 'IDを指定してください' }),
})

export type UpdateTransactionValue = z.infer<typeof updateTransactionSchema>
