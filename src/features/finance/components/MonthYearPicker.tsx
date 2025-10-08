import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  year: number
  month: number
  onChange: (year: number, month: number) => void
}

export default function YearMonthPicker({ year, month, onChange }: Props) {
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i,
  ).sort((a, b) => b - a)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <div className="flex gap-4">
      <Select
        value={String(year)}
        onValueChange={(val) => onChange(Number(val), month)}
      >
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={String(month)}
        onValueChange={(val) => onChange(year, Number(val))}
      >
        <SelectTrigger className="w-16">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((m) => (
            <SelectItem key={m} value={String(m)}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
