import { usePathname } from 'next/navigation'

export const useGetPageName = () => {
  const pathName = usePathname()

  const pageName =
    pathName === '/'
      ? 'ホーム'
      : pathName === '/categories'
        ? 'カテゴリ'
        : pathName === '/logs'
          ? 'ログ'
          : pathName === '/reports'
            ? 'レポート'
            : pathName === '/transactions'
              ? '取引'
              : ''
  return pageName
}
