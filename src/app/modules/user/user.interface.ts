import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id?: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
  needsPasswordChange?: true | false;
};

export type IUserMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExit(id: string): Promise<Partial<IUser> | null>;
  // eslint-disable-next-line no-unused-vars
  isPasswordMatch(
    // eslint-disable-next-line no-unused-vars
    planePassword: string,
    // eslint-disable-next-line no-unused-vars
    hashPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
