import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  placeholder: string
  values: string[]
  setFilter: (filter: string) => void
}

export default function FilterBox(props: Props) {
  const { placeholder, values, setFilter } = props

  const onChangeSelect = (val: string) => {
    if (val === '__all__') {
      setFilter('')
    } else {
      setFilter(val)
    }
  }

  return (
    <>
      <Select onValueChange={onChangeSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">全て</SelectItem>
          {values.map((value, key) => (
            <SelectItem key={key} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
