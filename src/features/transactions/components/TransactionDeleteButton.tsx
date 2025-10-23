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
                className="w-5 h-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M16.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11zM12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-.5 5.087c-.46-.21-.95-.37-1.46-.468l.453-4.619H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h2.42c.286.551.65 1.056 1.076 1.5H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75zm1.716 12.839l-.07.057l-.057.07a.5.5 0 0 0 0 .568l.057.07l2.147 2.146l-2.147 2.146l-.057.07a.5.5 0 0 0 0 .568l.057.07l.07.057a.5.5 0 0 0 .568 0l.07-.057l2.146-2.147l2.146 2.147l.07.057a.5.5 0 0 0 .568 0l.07-.057l.057-.07a.5.5 0 0 0 0-.568l-.057-.07l-2.147-2.146l2.147-2.146l.057-.07a.5.5 0 0 0 0-.568l-.057-.07l-.07-.057a.5.5 0 0 0-.568 0l-.07.057l-2.146 2.147l-2.146-2.147l-.07-.057a.5.5 0 0 0-.492-.044l-.076.044zM12 3.25a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25z"
                  fill="#000000"
                  fill-rule="nonzero"
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
