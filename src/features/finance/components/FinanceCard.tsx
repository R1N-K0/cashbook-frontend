type Props = {
  title: string
  amount: number
  color: string
}

export default function FinanceCard(props: Props) {
  const { title, amount, color } = props
  return (
    <div
      className={`container w-full flex flex-col items-center py-4 justify-center space-y-2 -5 shadow-md rounded-2xl ${color}`}
    >
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-3xl font-bold">{amount}</div>
      <div className="text-lg -mt-2 mb-1 flex items-center">
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m10 4l.707-.707L10 2.586l-.707.707zm8 17a1 1 0 1 0 0-2zM15.707 8.293l-5-5l-1.414 1.414l5 5zm-6.414-5l-5 5l1.414 1.414l5-5zM9 4v10h2V4zm7 17h2v-2h-2zm-7-7a7 7 0 0 0 7 7v-2a5 5 0 0 1-5-5z"
          />
        </svg>
        <div>3.2%</div>
      </div>
    </div>
  )
}
