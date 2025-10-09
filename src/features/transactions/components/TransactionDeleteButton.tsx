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
import { softDeleteTransaction } from '@/features/transactions/actions/transactionAction'
import useTransactionSWR from '@/hooks/useTransactionSWR'
import useUsersSWR from '@/hooks/useUsersSWR'
import { toast } from 'sonner'

type Props = {
  id: string
}

export default function TransactionDeleteButton({ id }: Props) {
  const { mutate: mutateTransaction } = useTransactionSWR()
  const { mutate: mutateUsers } = useUsersSWR()

  const onClick = async (id: string) => {
    const res = await softDeleteTransaction(id)
    if (!res.success) {
      toast.error(res.message ?? '不明なエラーが発生しました')
      return
    }
    mutateTransaction()
    mutateUsers()
    toast.success('取引を削除しました')
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="p-2  rounded-sm hover:bg-gray-100 text-gray-500 cursor-pointer">
            削除
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="font-semibold">この操作は元に戻せません。</div>
              <div>
                この操作によって取引データはダッシュボードから削除されます。
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={() => onClick(id)}>
              続行
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
