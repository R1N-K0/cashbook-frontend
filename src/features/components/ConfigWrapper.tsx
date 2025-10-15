'use client'

import type { CategoryRes, TransactionData, TransactionUsers } from '@/types'
import type { ReactNode } from 'react'
import { SWRConfig } from 'swr'

type Props = {
  initialCategoriesData: CategoryRes
  initialUsersData: TransactionUsers[]
  initialTransactionsData: TransactionData[]
  children: ReactNode
}

export default function ConfigWrapper({
  initialCategoriesData,
  initialUsersData,
  initialTransactionsData,
  children,
}: Props) {
  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/categories': initialCategoriesData,
          '/api/transaction-users': initialUsersData,
          '/api/transactions': initialTransactionsData,
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
