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
import { softDeleteCategory } from '@/features/category/actions/categoryAction'
import useCategorySWR from '@/hooks/useCategorySWR'
import { toast } from 'sonner'

type Props = {
  id: string
}

export default function CategoryDeleteButton({ id }: Props) {
  const { mutate } = useCategorySWR()
  const onClick = async (id: string) => {
    const res = await softDeleteCategory(id)

    if (!res.success) toast.error(res.message ?? '不明なエラーが発生しました')
    else {
      mutate()
      toast.success('削除しました')
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-auto"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000000"
                d="M3.94 5L2.22 3.28a.75.75 0 1 1 1.06-1.06l18.5 18.5a.75.75 0 0 1-1.06 1.06l-2.19-2.19A3.751 3.751 0 0 1 15.025 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5h1.19Zm13.338 13.34L15 16.06v1.19a.75.75 0 0 1-1.5 0v-2.69l-3-3v5.69a.75.75 0 0 1-1.5 0v-7.19L5.59 6.652l1.144 11.816a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033l.012-.128ZM13.5 10.318l1.5 1.5V9.75a.75.75 0 0 0-1.5 0v.569ZM18.424 6.5l-.771 7.971l1.373 1.374l.905-9.345h1.319a.75.75 0 0 0 0-1.5H15.5a3.5 3.5 0 1 0-7 0h-.318l1.5 1.5h8.742ZM14 5h-4a2 2 0 1 1 4 0Z"
              />
            </svg>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>カテゴリーの削除</AlertDialogTitle>
            <AlertDialogDescription>
              このカテゴリーを削除しますか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={() => onClick(id)}>
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
