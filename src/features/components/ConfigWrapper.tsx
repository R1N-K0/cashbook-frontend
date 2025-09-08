'use client'

import type { CategoryRes } from '@/types'
import type { ReactNode } from 'react'
import { SWRConfig } from 'swr'

type Props = {
  initialData: CategoryRes
  children: ReactNode
}

export default function ConfigWrapper({ initialData, children }: Props) {
  return (
    <SWRConfig value={{ fallback: { '/api/categories': initialData } }}>
      {children}
    </SWRConfig>
  )
}
