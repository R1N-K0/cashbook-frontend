import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import type { FieldValues, UseControllerProps } from 'react-hook-form'

export type TextFieldProps<T extends FieldValues> = {
  label: string
  placeholder?: string
  style?: React.CSSProperties
} & UseControllerProps<T>

export default function TextField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  style,
}: TextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              style={style}
              rows={4}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
