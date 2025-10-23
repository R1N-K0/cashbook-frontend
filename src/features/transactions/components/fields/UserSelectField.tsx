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
    managerId?: string
  }

export default function UserSelectField<S extends FieldValues>({
  name,
  control,
  label,
  data,
  style,
  managerId,
  disabled,
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
            defaultValue={managerId ? managerId : undefined}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger style={style}>
                <SelectValue
                  placeholder="担当者を選択
                "
                />
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
