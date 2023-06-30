import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { generateUserId } from './user.utils'
import { IUser } from './user.interface'
import User from './user.model'

export const findLastUser = async (): Promise<string | undefined> => {
  const user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return user?.id
}

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated increemental id
  const id = await generateUserId()
  user.id = id
  //default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user')
  }
  return createdUser
}

export const userService = {
  createUser,
}
