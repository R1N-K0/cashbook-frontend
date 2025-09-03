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
  const { mutate } = useCategorySWR({})
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
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer">
            <svg
              className="w-7 h-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.442 3.5H12.5A1.5 1.5 0 0 1 14 5v6a1.5 1.5 0 0 1-1.5 1.5H5.442a1.5 1.5 0 0 1-1.171-.563L1.796 8.844a1.35 1.35 0 0 1 0-1.688l2.475-3.093A1.5 1.5 0 0 1 5.44 3.5Zm-2.343-.374A3 3 0 0 1 5.442 2H12.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.442a3 3 0 0 1-2.343-1.126L.625 9.781a2.85 2.85 0 0 1 0-3.562zM7.28 5.47a.75.75 0 0 0-1.06 1.06L7.69 8L6.22 9.47a.75.75 0 1 0 1.06 1.06l1.47-1.47l1.47 1.47a.75.75 0 1 0 1.06-1.06L9.81 8l1.47-1.47a.75.75 0 0 0-1.06-1.06L8.75 6.94z"
                clipRule="evenodd"
              />
            </svg>
          </button>
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
