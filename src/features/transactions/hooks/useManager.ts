import type { TransactionData, TransactionUsers } from '@/types'

export const useManager = (
  transaction: TransactionData | undefined,
  userData: TransactionUsers[],
) => {
  const managerName =
    transaction?.updatedUser !== ' '
      ? transaction?.updatedUser
      : transaction?.createdUser

  const managerId = userData.find(
    (user) => `${user.lastName} ${user.firstName}` === managerName,
  )?.id

  return managerId
}
