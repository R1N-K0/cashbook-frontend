import z from 'zod'

export const transactionSchema = z.object({
  categoryId: z.number().min(0),
  date: z.iso.date(),
  description: z.string().length(255),
  memo: z.string().nullable(),
  amount: z.number().min(1, { message: '正しい金額を指定してください' }),
})

export type TransactionFormValue = z.infer<typeof transactionSchema>
