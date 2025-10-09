import { Input } from '@/components/ui/input'
import { useEnterConfirm } from '@/hooks/use-enter-confirm'

type Props = {
  placeholder: string
  setState: (newValue: string) => void
}

export default function SearchBox({ placeholder, setState }: Props) {
  const { text, setText, handleKeyDown } = useEnterConfirm('', setState)

  return (
    <Input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={placeholder}
      className="w-64"
    />
  )
}
