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

import type { FieldValues, UseControllerProps } from 'react-hook-form'

type SelectProps = React.ComponentProps<typeof Select>

export type BoolSelectFieldProps<T extends FieldValues> = SelectProps &
  UseControllerProps<T> & {
    label: string
    style?: React.CSSProperties
  }

export default function BoolSelectField<S extends FieldValues>({
  name,
  control,
  label,
  style,
  ...selectProps
}: BoolSelectFieldProps<S>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            {...selectProps}
            onValueChange={(val: string) => field.onChange(val === 'true')}
            defaultValue={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger style={style}>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="true">許可</SelectItem>
              <SelectItem value="false">却下</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
