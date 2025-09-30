import { Textarea } from '@/components/ui/textarea'
import type { TransactionData } from '@/types'

type props = {
  data: TransactionData
}

const EditForm = ({ data }: props) => {
  return <Textarea />
}

export default EditForm
