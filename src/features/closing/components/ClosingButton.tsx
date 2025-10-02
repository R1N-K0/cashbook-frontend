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
import { executeClosing } from '@/features/closing/action/closingAction'
import useTransactionSWR from '@/hooks/useTransactionSWR'
import { toast } from 'sonner'

type Props = {
  id: string
}

export default function ClosingButton() {
  const { mutate } = useTransactionSWR()
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const onClick = async () => {
    const res = await executeClosing({ year, month })

    if (!res.success) {
      if (res.status === 404) toast.info('対象のデータはありませんでした')
      else toast.error(res.message ?? '不明なエラーが発生しました')
    } else {
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
            <AlertDialogDescription className="text-normal">{`${year}年${month}月の締め処理を実行します。よろしいですか？`}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={() => onClick()}>
              実行
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
