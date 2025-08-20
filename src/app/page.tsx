import MainHeader from '@/features/components/MainHeader'
import FinanceCardList from '@/features/finance/components/FinanceCardList'

export default function Home() {
  return (
    <div className="container-fluid bg-white">
      <MainHeader />
      <div className="container-fluid px-8 mt-5">
        <FinanceCardList />
      </div>
    </div>
  )
}
