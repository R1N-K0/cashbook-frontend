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
                <SelectValue placeholder="1" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="1">
                <CategoryTag />
              </SelectItem>
              <SelectItem value="2">
                <CategoryTag />
              </SelectItem>
              <SelectItem value="3">
                <CategoryTag />
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
