import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true } }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: this.title.toLowerCase(),
  });

  if (isExist) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Academic Department is already exist !'
    );
  }
  next();
});

const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>(
  'AcademicDepartment',
  academicDepartmentSchema
);

export default AcademicDepartment;
