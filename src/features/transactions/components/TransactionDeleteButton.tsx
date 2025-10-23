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
  editable: boolean
}

export default function TransactionDeleteButton({ id, editable }: Props) {
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
      {editable ? (
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="group py-1 px-2 pe-3 flex flex-row items-center justify-items-center space-x-1   hover:bg-gray-200 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-auto"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000000"
                  d="M3.94 5L2.22 3.28a.75.75 0 1 1 1.06-1.06l18.5 18.5a.75.75 0 0 1-1.06 1.06l-2.19-2.19A3.751 3.751 0 0 1 15.025 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5h1.19Zm13.338 13.34L15 16.06v1.19a.75.75 0 0 1-1.5 0v-2.69l-3-3v5.69a.75.75 0 0 1-1.5 0v-7.19L5.59 6.652l1.144 11.816a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033l.012-.128ZM13.5 10.318l1.5 1.5V9.75a.75.75 0 0 0-1.5 0v.569ZM18.424 6.5l-.771 7.971l1.373 1.374l.905-9.345h1.319a.75.75 0 0 0 0-1.5H15.5a3.5 3.5 0 1 0-7 0h-.318l1.5 1.5h8.742ZM14 5h-4a2 2 0 1 1 4 0Z"
                />
              </svg>
              <span className="text-gray-500 opacity-0 group-hover:opacity-100  transition-opacity duration-300">
                削除
              </span>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
              <AlertDialogDescription>
                <span className="block font-semibold">
                  この操作は元に戻せません。
                </span>
                <span className="block">
                  この操作によって取引データはダッシュボードから削除されます。
                </span>
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
      ) : (
        <div className="p-2  rounded-sm text-gray-400 cursor-not-allowed">
          締め処理済み
        </div>
      )}
    </>
  )
}
