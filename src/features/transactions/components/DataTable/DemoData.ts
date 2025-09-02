import type { transactionData } from '@/types'
import { CategoryType } from 'enums/category-type'

export const data: transactionData[] = [
  {
    id: '1a2b3c4d',
    date: '2023-09-28',
    user: '太郎',
    description: '買い物',
    type: CategoryType.expense,
    memo: '週末の買い出し',
    amount: 20000,
  },
  {
    id: '2b3c4d5e',
    date: '2023-09-29',
    user: '花子',
    description: '外食',
    type: CategoryType.expense,
    memo: '友人とランチ',
    amount: 1500,
  },
  {
    id: '3c4d5e6f',
    date: '2023-09-30',
    user: '次郎',
    description: '交通費',
    type: CategoryType.expense,
    memo: '出張の交通費',
    amount: 5000,
  },
  {
    id: '4d5e6f7g',
    date: '2023-10-01',
    user: '四郎',
    description: '光熱費',
    type: CategoryType.expense,
    memo: '10月分の電気代',
    amount: 8000,
  },
  {
    id: '5e6f7g8h',
    date: '2023-10-02',
    user: '五郎',
    description: '通信費',
    type: CategoryType.expense,
    memo: '10月分の携帯電話代',
    amount: 3000,
  },
  {
    id: '6f7g8h9i',
    date: '2023-10-03',
    user: '六郎',
    description: 'バイト代',
    type: CategoryType.income,
    memo: '10月分のバイト代',
    amount: 80000,
  },
]
