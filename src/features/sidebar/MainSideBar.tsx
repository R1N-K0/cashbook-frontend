'use client'
import { useSidebarIsOpen } from '@/provider/SideBarProvider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MainSidebar = () => {
  const isOpen = useSidebarIsOpen()
  const currentPath = usePathname()
  const items = [
    { title: 'ホーム', url: '/' },
    { title: '取引一覧', url: '/transactions' },
    { title: 'カテゴリ一覧', url: '/categories' },
    { title: '取引レポート', url: '/reports' },
    { title: 'スタッフ一覧', url: '/staff' },
  ]

  return (
    <aside className="sticky top-0 self-start h-[calc(100vh)] pt-9 bg-white border-r border-gray-100">
      {isOpen && (
        <div className="flex flex-col py-8 gap-6 border-r-1 border-gray-100 h-full ">
          {items.map((item) => (
            <div key={item.title} className="w-full px-8 hover:bg-gray-100">
              <Link href={item.url}>
                {currentPath === item.url ? (
                  <span className="whitespace-nowrap text-blue-500 font-bold">
                    {item.title}
                  </span>
                ) : (
                  <span className="whitespace-nowrap">{item.title}</span>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

export default MainSidebar
