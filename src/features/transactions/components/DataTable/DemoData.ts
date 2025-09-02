import type { TransactionData } from '@/types'
import { CategoryType } from 'enums/category-type'

export const data: TransactionData[] = [
  {
    id: '1',
    date: '2023-09-28',
    user: { id: '1', name: '太郎' },
    description: '買い物',
    category: {
      id: '1',
      name: '日用品',
      type: CategoryType.expense,
      color: '#FFFFFF',
    },
    memo: 'スーパーで買い物',
    amount: 20000,
    editable: true,
  },
  {
    id: '2',
    date: '2023-09-29',
    user: { id: '2', name: '郎' },
    description: 'バイト',
    category: {
      id: '2',
      name: 'バイト',
      type: CategoryType.income,
      color: '#000000',
    },
    amount: 80000,
    editable: true,
  },
]

// {
//     id: '2b3c4d5e',
//     date: '2023-09-29',
//     user: '花子',
//     description: '外食',
//     type: CategoryType.expense,
//     memo: '友人とランチ',
//     amount: 1500,
//   },
