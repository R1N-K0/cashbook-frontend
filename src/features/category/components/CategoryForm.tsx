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
import type { CategoryFormValues } from '@/features/category/lib/schemas/categorySchema'
import { categorySchema } from '@/features/category/lib/schemas/categorySchema'
import ColorPicker from '@/features/components/ColorPicker'
import { CreateCategory } from '@/lib/categories'
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

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    try {
      console.log('フォームデータ:', data)
      const res = await CreateCategory(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
