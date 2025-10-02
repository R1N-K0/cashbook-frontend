'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { softDeleteCategory } from '@/features/category/actions/categoryAction'
import useTransactionSWR from '@/hooks/useTransactionSWR'
import { toast } from 'sonner'

type Props = {
  id: string
}

export default function CategoryDeleteButton({ id }: Props) {
  const { mutate } = useTransactionSWR()
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const onClick = async (id: string) => {
    const res = await softDeleteCategory(id)

    if (!res.success) toast.error(res.message ?? '不明なエラーが発生しました')
    else {
      mutate()
      toast.success('月末締めを実行しました')
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline" className="text-gray-500">
            月末締めを行う
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>月末締め</AlertDialogTitle>
            <AlertDialogDescription className="text-normal">{`${year}年${month}月の月末締めを実行します。よろしいですか？`}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={() => onClick(id)}>
              実行
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
