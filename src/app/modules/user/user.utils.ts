import { findLastUser } from './user.service'

export const generateUserId = async (): Promise<string> => {
  const currentId = (await findLastUser()) || (0).toString().padStart(5, '0')
  // increement id by 1
  const increementalId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return increementalId
}
