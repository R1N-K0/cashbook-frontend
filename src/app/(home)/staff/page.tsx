import StaffTable from '@/features/transaction-users/components/StaffTable'

export default function StaffPage() {
  return (
    <div className="container-fluid mx-auto px-8 py-8">
      <div className="flex flex-col space-y-5 w-full">
        <div className="text-3xl font-bold">スタッフ管理</div>
        <StaffTable />
      </div>
    </div>
  )
}
