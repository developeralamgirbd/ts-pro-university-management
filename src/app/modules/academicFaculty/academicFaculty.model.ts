import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true, versionKey: false }
);

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({
    title: this.title.toLowerCase(),
  });

  if (isExist) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Academic faculty is already exist !'
    );
  }
  next();
});

const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);

export default AcademicFaculty;
