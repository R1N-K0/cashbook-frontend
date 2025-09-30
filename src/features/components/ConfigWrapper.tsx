'use client'

import type { CategoryRes, TransactionUsers } from '@/types'
import type { ReactNode } from 'react'
import { SWRConfig } from 'swr'

type Props = {
  initialCategoriesData: CategoryRes
  initialUsersData: TransactionUsers[]
  children: ReactNode
}

export default function ConfigWrapper({
  initialCategoriesData,
  initialUsersData,
  children,
}: Props) {
  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/categories': initialCategoriesData,
          '/api/transaction-users': initialUsersData,
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
