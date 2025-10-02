import type { TransactionData } from '@/types'

export const toKVRows = (data: TransactionData) => {
  return [
    { label: 'ID', value: data.id },
    { label: '日付', value: data.date },
    { label: '作成者', value: data.createdUser },
    { label: '説明', value: data.description },
    {
      label: 'カテゴリ',
      value: data.category?.name ?? '未分類',
    },
    { label: 'メモ', value: data.memo ?? '' },
    { label: '金額', value: `${data?.amount?.toLocaleString()} 円` },
  ]
}
