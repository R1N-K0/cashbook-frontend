import { usePathname } from 'next/navigation'

const routes: { pattern: RegExp; label: string }[] = [
  { pattern: /^\/$/, label: 'ホーム' },
  { pattern: /^\/categories$/, label: 'カテゴリ' },
  { pattern: /^\/logs$/, label: '取引ログ' },
  { pattern: /^\/reports$/, label: '取引レポート' },
  { pattern: /^\/transactions$/, label: '取引' },
  { pattern: /^\/transactions\/create$/, label: '取引作成' },
  { pattern: /^\/transactions\/detail\/[a-zA-Z0-9-]+$/, label: '取引詳細' },
  { pattern: /^\/transactions\/edit\/[a-zA-Z0-9-]+$/, label: '取引編集' },
]

export const useHeaderTitle = () => {
  const pathName = usePathname()
  const matched = routes.find((r) => r.pattern.test(pathName))

  return matched?.label || ''
}
