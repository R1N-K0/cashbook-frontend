type Props = {
  title: string
  amount: number
  change?: number
}

export default function FinanceCard(props: Props) {
  const { title, amount, change } = props
  return (
    <div className="container  sm:max-w-xs min-w-3  bg-white w-full flex flex-col border border-gray-200 items-start py-4 justify-center space-y-2 shadow-sm rounded-lg px-4">
      <div className="flex flex-row items-center justify-start md:space-x-2 space-x-1">
        <div className=" font-semibold text-gray-400">{title}</div>
        {change !== undefined && change !== 0 ? (
          <span
            className={`text-xs font-medium px-1 rounded-sm ${
              title === '却下'
                ? change > 0
                  ? 'text-red-500 bg-red-100'
                  : 'text-green-500 bg-green-100'
                : change > 0
                  ? 'text-green-500 bg-green-100'
                  : 'text-red-500 bg-red-100'
            }`}
          >
            {change > 0 ? '+' : '-'}
            {Math.abs(change).toLocaleString()}%
          </span>
        ) : (
          <span className="text-xs font-medium px-1 rounded-sm text-gray-300 bg-gray-100">
            先月0
          </span>
        )}
      </div>
      <div className="lg:text-3xl md:text-3xl text-3xl font-bold mt-1">
        {amount.toLocaleString()}
      </div>
    </div>
  )
}
