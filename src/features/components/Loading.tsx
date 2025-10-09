import { Spinner } from '@/components/ui/shadcn-io/spinner'

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 h-150 font-size-2xl">
      <Spinner variant="bars" />
      <div>
        <span>取得中です...</span>
      </div>
    </div>
  )
}
