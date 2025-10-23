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
    label?: string
  }

export default function InputField<S extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  ...inputProps
}: Props<S>) {
  return (
    <>
      <FormField
        control={control}
        name={name}
        disabled={inputProps.disabled}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                {...inputProps}
                placeholder={placeholder}
                onChange={field.onChange}
                value={field.value ?? ''}
                onBlur={field.onBlur}
                disabled={field.disabled}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
