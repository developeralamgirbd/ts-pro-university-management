import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { generateAdminId } from './user.utils';
import { IUser } from './user.interface';
import User from './user.model';

// export const findLastUser = async (): Promise<string | undefined> => {
//   const user = await User.findOne({}, { id: 1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean()
//   return user?.id
// }
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty?.id?.substring(2) : undefined;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastAdmin?.id ? lastAdmin?.id?.substring(2) : undefined;
};

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated increemental id
  // const semester = {
  //   year: '2023',
  //   code: '01',
  // };
  // const id = await generateStudentId(semester);
  // const id = await generateFacultyId();
  const id = await generateAdminId();
  user.id = id;
  //default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

export const userService = {
  createUser,
};
