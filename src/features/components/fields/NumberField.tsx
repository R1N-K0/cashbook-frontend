import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { FieldValues, UseControllerProps } from 'react-hook-form'

type InputProps = React.ComponentProps<typeof Input>

export type Props<T extends FieldValues> = InputProps &
  UseControllerProps<T> & {
    label: string
  }

export default function NumberField<S extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  ...inputProps
}: Props<S>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type="number"
              onChange={(e) => {
                const val = e.target.value === '' ? '' : Number(e.target.value)
                field.onChange(val)
              }}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
