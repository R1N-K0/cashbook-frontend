import utsToJst from '@/features/transactions/components/utils/ustToJst'
import type { TransactionData } from '@/types'
import type { DateRange } from 'react-day-picker'

const dateFilter = (
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

export default dateFilter
