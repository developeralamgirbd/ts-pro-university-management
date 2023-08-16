import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from "bcryptjs";
import config from "../../../config";

const userSchema = new Schema<IUser>(
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
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
);

userSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(Number(config.bcrypt_salt));
    this.password = bcrypt.hashSync(this.password, salt);
    next()
})

const User = model<IUser, UserModel>('User', userSchema);

export default User;
