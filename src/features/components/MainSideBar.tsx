import Link from 'next/link'

const MainSidebar = () => {
  const items = [
    { title: 'ホーム', url: '/' },
    { title: '取引一覧', url: '/transactions' },
    { title: '取引レポート', url: '/reports' },
    { title: '取引ログ', url: '/logs' },
    { title: 'カテゴリ一覧', url: '/categories' },
  ]

  return (
    <div className="flex flex-col p-8 gap-6 border-r-4 h-full">
      {items.map((item) => (
        <div key={item.title}>
          <Link href={item.url}>
            <span>{item.title}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default MainSidebar
