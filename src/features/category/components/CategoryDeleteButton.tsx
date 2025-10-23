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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
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
            <HoverCard>
              <HoverCardTrigger>
                <svg
                  className="w-7 h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11zM12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-.5 5.087c-.46-.21-.95-.37-1.46-.468l.453-4.619H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h2.42c.286.551.65 1.056 1.076 1.5H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75zm1.716 12.839l-.07.057l-.057.07a.5.5 0 0 0 0 .568l.057.07l2.147 2.146l-2.147 2.146l-.057.07a.5.5 0 0 0 0 .568l.057.07l.07.057a.5.5 0 0 0 .568 0l.07-.057l2.146-2.147l2.146 2.147l.07.057a.5.5 0 0 0 .568 0l.07-.057l.057-.07a.5.5 0 0 0 0-.568l-.057-.07l-2.147-2.146l2.147-2.146l.057-.07a.5.5 0 0 0 0-.568l-.057-.07l-.07-.057a.5.5 0 0 0-.568 0l-.07.057l-2.146 2.147l-2.146-2.147l-.07-.057a.5.5 0 0 0-.492-.044l-.076.044zM12 3.25a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25z"
                    fill="#000000"
                    fillRule="nonzero"
                  />
                </svg>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm text-gray-700 w-fit py-1 px-2 opacity-70">
                削除
              </HoverCardContent>
            </HoverCard>
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
