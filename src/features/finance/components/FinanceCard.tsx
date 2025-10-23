type Props = {
  title: string
  amount: number
}

export default function FinanceCard(props: Props) {
  const { title, amount } = props
  return (
    <div className="container  sm:max-w-xs min-w-3  bg-white w-full flex flex-col border border-gray-200 items-start py-4 justify-center space-y-2 shadow-sm rounded-lg px-4">
      <div className="text-lg font-semibold text-gray-400">{title}</div>
      <div className="lg:text-3xl md:text-3xl text-3xl font-bold mt-1">
        {amount.toLocaleString()}
      </div>
    </div>
  )
}
