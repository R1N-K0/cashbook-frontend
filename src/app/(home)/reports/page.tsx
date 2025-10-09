import ReportBox from '@/features/finance/components/ReportBox'

const ReportPage = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  return (
    <div className=" lg:container mx-auto w-full px-8 lg:px-12 py-4">
      <ReportBox />
    </div>
  )
}

export default ReportPage
