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
import type { TransactionUsers } from '@/types'

import type { FieldValues, UseControllerProps } from 'react-hook-form'

type SelectProps = React.ComponentProps<typeof Select>

export type Props<T extends FieldValues> = SelectProps &
  UseControllerProps<T> & {
    label: string
    data: TransactionUsers[]
    style?: React.CSSProperties
  }

export default function UserSelectField<S extends FieldValues>({
  name,
  control,
  label,
  data,
  style,
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
              <SelectTrigger style={style}>
                <SelectValue placeholder={data[0]?.id} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.lastName} {user.firstName}
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
