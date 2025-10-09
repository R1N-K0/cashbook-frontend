type Props = {
  title: string
  amount: number
  unit: string
}

export default function FinanceCard(props: Props) {
  const { title, amount, unit } = props
  return (
    <div className="container max-w-xs bg-white w-full flex flex-col border border-gray-200 items-start py-4 justify-center space-y-2 shadow-sm rounded-lg px-4">
      <div className="text-lg font-semibold text-gray-400">{title}</div>
      <div className="lg:text-4xl md:text-3xl text-4xl font-bold mt-1">
        {amount.toLocaleString()}
        <span className="lg:text-xl md:text-lg text-xl text-gray-600 font-bold mt-1">
          {' '}
          {unit}
        </span>
      </div>
    </div>
  )
}
