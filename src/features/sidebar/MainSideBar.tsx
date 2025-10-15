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
    <div className="flex">
      {isOpen && (
        <div className="flex flex-col p-8 gap-6 border-r-4 h-full ">
          {items.map((item) => (
            <div key={item.title}>
              <Link href={item.url}>
                <span>{item.title}</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MainSidebar
