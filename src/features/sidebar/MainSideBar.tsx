'use client'
import { useSidebarIsOpen } from '@/provider/SideBarProvider'
import Link from 'next/link'

const MainSidebar = () => {
  const isOpen = useSidebarIsOpen()
  const items = [
    { title: 'ホーム', url: '/' },
    { title: '取引一覧', url: '/transactions' },
    { title: 'カテゴリ一覧', url: '/categories' },
    { title: '取引レポート', url: '/reports' },
    { title: 'スタッフ一覧', url: '/staff' },
  ]

  return (
    <aside className="sticky top-0 self-start h-[calc(100vh)] pt-8 bg-white border-r border-gray-100">
      {isOpen && (
        <div className="flex h-full flex-col gap-6 overflow-y-auto px-8 py-10">
          {items.map((item) => (
            <div key={item.title}>
              <Link href={item.url}>
                <span className="whitespace-nowrap">{item.title}</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

export default MainSidebar
