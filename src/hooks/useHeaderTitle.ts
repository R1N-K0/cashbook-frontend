import { usePathname } from 'next/navigation'

const routes: { pattern: RegExp; label: string }[] = [
  { pattern: /^\/$/, label: 'ホーム' },
  { pattern: /^\/categories$/, label: 'カテゴリ' },
  { pattern: /^\/reports$/, label: '取引レポート' },
  { pattern: /^\/transactions/, label: '取引' },
  { pattern: /^\/staff$/, label: 'スタッフ' },
]

export const useHeaderTitle = () => {
  const pathName = usePathname()
  const matched = routes.find((r) => r.pattern.test(pathName))

  return matched?.label || ''
}
