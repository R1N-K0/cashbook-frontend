import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import CategoryTag from '@/features/transactions/components/CategoryTag'
import useCategorySWR from '@/hooks/useCategorySWR'

import type { FieldValues, UseControllerProps } from 'react-hook-form'

type SelectProps = React.ComponentProps<typeof Select>

export type Props<T extends FieldValues> = SelectProps &
  UseControllerProps<T> & {
    label: string
  }

export default function CategorySelectField<S extends FieldValues>({
  name,
  control,
  label,
  ...selectProps
}: Props<S>) {
  const { data, isLoading, error } = useCategorySWR({})
  const datas = [...data?.expense, ...data?.income]

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            {...selectProps}
            onValueChange={(val: string) => field.onChange(Number(val))}
            defaultValue={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={datas[0]?.id} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {datas.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  <CategoryTag category={cat} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
