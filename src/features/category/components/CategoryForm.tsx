import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createCategory } from '@/features/category/actions/categoryAction'
import type { CategoryFormValues } from '@/features/category/lib/schemas/categorySchema'
import { categorySchema } from '@/features/category/lib/schemas/categorySchema'
import ColorPicker from '@/features/components/ColorPicker'
import { FormError } from '@/features/components/fields/FormError'
import useCategorySWR from '@/hooks/useCategorySWR'

import { zodResolver } from '@hookform/resolvers/zod'

import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

export default function CategoryForm() {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      type: 'income',
      color: '#33A1E0',
    },
  })
  const { mutate } = useCategorySWR({})

  const onSubmit: SubmitHandler<CategoryFormValues> = async (val) => {
    console.log('フォームデータ:', val)
    const res = await createCategory(val)

    if (!res.success) {
      form.setError('root', {
        type: 'server',
        message: JSON.stringify(res.message),
      })
      return
    }
    alert('カテゴリーを追加しました')
    mutate()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormError />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>カテゴリー名</FormLabel>
              <FormControl>
                <Input placeholder="カテゴリー名" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field: { ref, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>タイプ</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={onChange}>
                  <SelectTrigger className="w-[180px]" ref={ref}>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">収入</SelectItem>
                    <SelectItem value="expense">支出</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>カラー</FormLabel>
              <FormControl>
                <ColorPicker
                  inputRef={field.ref}
                  handleChange={(newColor) => {
                    field.onChange(`#${newColor.hex}`)
                  }}
                  default_value="#33A1E0"
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
