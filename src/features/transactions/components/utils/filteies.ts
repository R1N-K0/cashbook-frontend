import utsToJst from '@/features/transactions/components/utils/ustToJst'
import type { TransactionData } from '@/types'
import type { DateRange } from 'react-day-picker'

type Props = {
  filte: string
  data: TransactionData[]
}

export const incomeExpenseFilter = ({
  filte,
  data,
}: Props): TransactionData[] => {
  if (filte === '収入') {
    return data.filter((item) => item?.category?.type == 'income')
  } else if (filte === '支出') {
    return data.filter((item) => item?.category?.type == 'expense')
  }

  return data
}

export const dateFilter = (
  rangedate: DateRange | undefined,
  data: TransactionData[],
): TransactionData[] => {
  let filteredDate: TransactionData[] = data

  if (rangedate && rangedate.from && rangedate.to) {
    const fromDate = utsToJst(rangedate.from).toISOString().split('T')[0]
    const toDate = utsToJst(rangedate.to).toISOString().split('T')[0]

    filteredDate = data.filter((item) => item.date >= fromDate)
    filteredDate = filteredDate.filter((item) => item.date <= toDate)
  }

  return filteredDate
}

export const categoryFilter = ({ filte, data }: Props): TransactionData[] => {
  return filte === ''
    ? data
    : data.filter((Item) => Item.category?.name === filte)
}
