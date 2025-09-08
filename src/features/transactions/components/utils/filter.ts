import type { TransactionData } from '@/types'

type Props = {
  filte: string
  data: TransactionData[]
}

export const categoryFilter = ({ filte, data }: Props): TransactionData[] => {
  if (filte === '収入') {
    return data.filter((item) => item?.category?.type == 'income')
  } else if (filte === '支出') {
    return data.filter((item) => item?.category?.type == 'expense')
  }

  return data
}
