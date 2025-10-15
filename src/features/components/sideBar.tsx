import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const AppSidebar = () => {
  const items = [
    { title: 'ホーム', url: '/' },
    { title: '取引一覧', url: '/transactions' },
    { title: '取引レポート', url: '/reports' },
    { title: '取引ログ', url: '/logs' },
    { title: 'カテゴリ一覧', url: '/categories' },
    { title: '新規登録', url: '/signUp' },
    { title: 'ログイン', url: '/login' },
  ]

  return (
    <Sidebar>
      <SidebarHeader>hogeさん</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>各ページ</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>ログアウト</SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
