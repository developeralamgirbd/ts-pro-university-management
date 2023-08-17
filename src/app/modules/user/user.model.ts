import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../../config';

const userSchema = new Schema<IUser, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
);

userSchema.methods.isUserExit = async function (
  id: string
): Promise<Partial<IUser> | null> {
  return User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1, role: 1 }
  );
};

userSchema.methods.isPasswordMatch = async function (
  // eslint-disable-next-line no-unused-vars
  planePassword: string,
  // eslint-disable-next-line no-unused-vars
  hashPassword: string
): Promise<boolean> {
  return bcrypt.compareSync(planePassword, hashPassword);
};

userSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(Number(config.bcrypt_salt));
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
