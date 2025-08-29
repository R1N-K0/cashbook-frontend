import { useState } from 'react'

export function useEnterConfirm(
  initial: string,
  onConfirm: (value: string) => void,
) {
  const [text, setText] = useState<string>(initial)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onConfirm(text)
  }
  return { text, setText, handleKeyDown }
}
