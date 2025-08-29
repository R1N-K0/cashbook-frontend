import z from 'zod'

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, { message: 'カテゴリー名を入力してください' })
    .max(50),

  type: z.enum(['income', 'expense'], {
    message: '正しいタイプを入力してください',
  }),
  color: z
    .string()
    .regex(/^#([\da-fA-F]{6}|[\da-fA-F]{3})$/, {
      message: '有効なカラーコードで入力してください',
    })
    .length(7, { message: '有効なカラーコードで入力してください' }),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
